const express = require('express')
const Order = require('../models/Order')
const Product = require('../models/Product')
const protectAdmin = require('../middleware/authMiddleware')

const router = express.Router()

/*
==================================================
DELIVERY DISTANCE CONFIGURATION
==================================================
*/

const BORIVALI_COORDINATES = {
  latitude: 19.2306,
  longitude: 72.8636,
}

// OpenStreetMap Nominatim
const GEOCODING_URL =
  'https://nominatim.openstreetmap.org/search'

// OSRM routing service
const ROUTING_URL =
  'https://router.project-osrm.org/route/v1/driving'

// Identify our application to Nominatim
const APP_USER_AGENT =
  'DwijasKalaRekha/1.0 (ecommerce delivery distance calculation)'

/*
==================================================
GEOCODE DELIVERY DESTINATION
==================================================

We intentionally use:

City + State + Pincode

instead of the customer's house/street address.

This gives us a delivery-area coordinate without
sending the customer's complete address to the
geocoding service.
==================================================
*/

async function geocodeDestination(
  city,
  state,
  pincode
) {
  const query =
    `${city}, ${state}, ${pincode}, India`

  const url =
    `${GEOCODING_URL}?format=jsonv2` +
    `&limit=1` +
    `&countrycodes=in` +
    `&q=${encodeURIComponent(query)}`

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'User-Agent': APP_USER_AGENT,
      'Accept-Language': 'en',
    },
  })

  if (!response.ok) {
    throw new Error(
      `Geocoding service returned ${response.status}`
    )
  }

  const results = await response.json()

  if (
    !Array.isArray(results) ||
    results.length === 0
  ) {
    throw new Error(
      'Could not find the delivery destination'
    )
  }

  const latitude = Number(results[0].lat)
  const longitude = Number(results[0].lon)

  if (
    !Number.isFinite(latitude) ||
    !Number.isFinite(longitude)
  ) {
    throw new Error(
      'Invalid destination coordinates received'
    )
  }

  return {
    latitude,
    longitude,
  }
}

/*
==================================================
CALCULATE ROAD DISTANCE
==================================================

OSRM returns route distance in meters.

We convert it to kilometers.
==================================================
*/

async function calculateRoadDistance(
  destination
) {
  const origin =
    `${BORIVALI_COORDINATES.longitude},` +
    `${BORIVALI_COORDINATES.latitude}`

  const destinationCoordinates =
    `${destination.longitude},` +
    `${destination.latitude}`

  const url =
    `${ROUTING_URL}/` +
    `${origin};${destinationCoordinates}` +
    `?overview=false`

  const response = await fetch(url)

  if (!response.ok) {
    throw new Error(
      `Routing service returned ${response.status}`
    )
  }

  const data = await response.json()

  if (
    data.code !== 'Ok' ||
    !data.routes ||
    data.routes.length === 0
  ) {
    throw new Error(
      'Could not calculate delivery route'
    )
  }

  const distanceMeters =
    Number(data.routes[0].distance)

  if (!Number.isFinite(distanceMeters)) {
    throw new Error(
      'Invalid route distance received'
    )
  }

  const distanceKm =
    distanceMeters / 1000

  return Number(
    distanceKm.toFixed(2)
  )
}

/*
==================================================
CALCULATE DELIVERY DISTANCE
==================================================
*/

async function getDeliveryDistance(
  customer
) {
  const destination =
    await geocodeDestination(
      customer.city,
      customer.state,
      customer.pincode
    )

  const distanceKm =
    await calculateRoadDistance(
      destination
    )

  return {
    distanceKm,
    source:
      'OpenStreetMap Nominatim + OSRM',
  }
}

/*
==================================================
CREATE TRUSTED ORDER ITEMS
==================================================

Important:

The browser is NOT trusted for:

- product name
- price
- image
- category
- stock

The browser only provides:

- productId
- quantity

The backend gets the actual product from MongoDB.
==================================================
*/

async function buildTrustedOrderItems(
  items
) {
  const productIds = [
    ...new Set(
      items.map((item) =>
        String(item.productId || '').trim()
      )
    ),
  ]

  if (productIds.some((productId) => !productId)) {
    throw new Error(
      'Every order item must have a product ID'
    )
  }

  const products = await Product.find({
    productId: {
      $in: productIds,
    },
  })

  const productMap = new Map(
    products.map((product) => [
      product.productId,
      product,
    ])
  )

  const trustedItems = []

  for (const item of items) {
    const productId =
      String(item.productId || '').trim()

    const product =
      productMap.get(productId)

    if (!product) {
      throw new Error(
        `Product ${productId} was not found`
      )
    }

    const quantity = Number(item.quantity)

    if (
      !Number.isInteger(quantity) ||
      quantity <= 0
    ) {
      throw new Error(
        `Invalid quantity for ${product.name}`
      )
    }

    if (quantity > product.stock) {
      throw new Error(
        `${product.name} has only ${product.stock} item(s) available`
      )
    }

    trustedItems.push({
      productId: product.productId,
      name: product.name,
      price: product.price,
      quantity,
      image: product.image,
    })
  }

  return trustedItems
}

/*
==================================================
CALCULATE TRUSTED SUBTOTAL
==================================================
*/

function calculateSubtotal(items) {
  return Number(
    items
      .reduce(
        (total, item) =>
          total +
          item.price * item.quantity,
        0
      )
      .toFixed(2)
  )
}

/*
==================================================
CREATE ORDER
POST /api/orders
==================================================
*/

router.post('/', async (req, res) => {
  try {
    const {
      customer,
      items,
    } = req.body

    /*
    ----------------------------------------------
    VALIDATE CUSTOMER
    ----------------------------------------------
    */

    if (
      !customer ||
      !customer.fullName ||
      !customer.mobile ||
      !customer.address ||
      !customer.city ||
      !customer.state ||
      !customer.pincode
    ) {
      return res.status(400).json({
        message:
          'Customer details are incomplete',
      })
    }

    /*
    ----------------------------------------------
    VALIDATE MOBILE
    ----------------------------------------------
    */

    const mobile =
      String(customer.mobile).trim()

    if (!/^[6-9]\d{9}$/.test(mobile)) {
      return res.status(400).json({
        message:
          'Invalid 10-digit mobile number',
      })
    }

    /*
    ----------------------------------------------
    VALIDATE PINCODE
    ----------------------------------------------
    */

    const pincode =
      String(customer.pincode).trim()

    if (!/^\d{6}$/.test(pincode)) {
      return res.status(400).json({
        message:
          'Invalid 6-digit pincode',
      })
    }

    /*
    ----------------------------------------------
    VALIDATE ITEMS
    ----------------------------------------------
    */

    if (
      !Array.isArray(items) ||
      items.length === 0
    ) {
      return res.status(400).json({
        message:
          'Order must contain at least one product',
      })
    }

    /*
    ----------------------------------------------
    BUILD TRUSTED PRODUCTS
    ----------------------------------------------
    */

    let trustedItems

    try {
      trustedItems =
        await buildTrustedOrderItems(items)
    } catch (productError) {
      return res.status(400).json({
        message: productError.message,
      })
    }

    /*
    ----------------------------------------------
    CALCULATE TRUSTED SUBTOTAL
    ----------------------------------------------
    */

    const subtotal =
      calculateSubtotal(trustedItems)

    /*
    ----------------------------------------------
    DELIVERY CHARGE
    ----------------------------------------------

    Delivery is currently FREE.

    Keep this on the backend so the customer
    cannot change it.
    ----------------------------------------------
    */

    const deliveryCharge = 0

    /*
    ----------------------------------------------
    CALCULATE FINAL TOTAL
    ----------------------------------------------
    */

    const total = Number(
      (
        subtotal +
        deliveryCharge
      ).toFixed(2)
    )

    /*
    ----------------------------------------------
    CALCULATE DELIVERY DISTANCE
    ----------------------------------------------
    */

    let deliveryDistanceKm = 0
    let deliveryDistanceSource = ''

    try {
      const distance =
        await getDeliveryDistance(
          customer
        )

      deliveryDistanceKm =
        distance.distanceKm

      deliveryDistanceSource =
        distance.source

      console.log(
        `Delivery distance: ` +
          `${deliveryDistanceKm} km`
      )
    } catch (distanceError) {
      console.error(
        'Delivery distance calculation failed:',
        distanceError.message
      )

      return res.status(400).json({
        message:
          'Unable to calculate delivery distance for this destination. Please check the city, state and pincode.',
      })
    }

    /*
    ----------------------------------------------
    CREATE UNIQUE ORDER ID
    ----------------------------------------------
    */

    const orderId =
      `DKR-${Date.now()}`

    /*
    ----------------------------------------------
    CREATE ORDER
    ----------------------------------------------
    */

    const order = await Order.create({
      orderId,

      customer: {
        fullName:
          String(customer.fullName).trim(),

        mobile,

        email:
          customer.email
            ? String(customer.email).trim()
            : '',

        address:
          String(customer.address).trim(),

        city:
          String(customer.city).trim(),

        state:
          String(customer.state).trim(),

        pincode,
      },

      items: trustedItems,

      subtotal,

      deliveryCharge,

      deliveryDistanceKm,

      deliveryDistanceSource,

      total,

      paymentStatus: 'Pending',

      orderStatus: 'Pending',
    })

    /*
    ----------------------------------------------
    RESPONSE
    ----------------------------------------------
    */

    res.status(201).json({
      message:
        'Order created successfully',

      order,
    })
  } catch (error) {
    console.error(
      'Create order failed:',
      error
    )

    res.status(500).json({
      message:
        'Failed to create order',

      error: error.message,
    })
  }
})

/*
==================================================
CUSTOMER ORDER STATUS
GET /api/orders/status/:orderId?mobile=XXXXXXXXXX
==================================================
*/

router.get(
  '/status/:orderId',
  async (req, res) => {
    try {
      const { orderId } = req.params

      const mobile =
        req.query.mobile?.trim() || ''

      if (!mobile) {
        return res.status(400).json({
          message:
            'Mobile number is required',
        })
      }

      const order =
        await Order.findOne({
          orderId,
          'customer.mobile': mobile,
        })

      if (!order) {
        return res.status(404).json({
          message:
            'Order not found. Check your Order ID and mobile number.',
        })
      }

      res.status(200).json({
        order: {
          orderId:
            order.orderId,

          paymentStatus:
            order.paymentStatus,

          orderStatus:
            order.orderStatus,

          total:
            order.total,

          deliveryDistanceKm:
            order.deliveryDistanceKm,

          createdAt:
            order.createdAt,
        },
      })
    } catch (error) {
      console.error(
        'Check order status failed:',
        error
      )

      res.status(500).json({
        message:
          'Failed to check order status',
      })
    }
  }
)

/*
==================================================
GET ALL ORDERS
GET /api/orders
ADMIN ONLY
==================================================
*/

router.get(
  '/',
  protectAdmin,
  async (req, res) => {
    try {
      const orders =
        await Order.find().sort({
          createdAt: -1,
        })

      res.status(200).json({
        orders,
      })
    } catch (error) {
      console.error(
        'Get orders failed:',
        error
      )

      res.status(500).json({
        message:
          'Failed to fetch orders',
      })
    }
  }
)

/*
==================================================
SEARCH ORDERS
GET /api/orders/search?q=
ADMIN ONLY
==================================================
*/

router.get(
  '/search',
  protectAdmin,
  async (req, res) => {
    try {
      const search =
        req.query.q?.trim() || ''

      if (!search) {
        return res.status(400).json({
          message:
            'Search query is required',
        })
      }

      const orders =
        await Order.find({
          $or: [
            {
              orderId: {
                $regex: search,
                $options: 'i',
              },
            },

            {
              'customer.fullName': {
                $regex: search,
                $options: 'i',
              },
            },

            {
              'customer.mobile': {
                $regex: search,
                $options: 'i',
              },
            },

            {
              'items.productId': {
                $regex: search,
                $options: 'i',
              },
            },
          ],
        }).sort({
          createdAt: -1,
        })

      res.status(200).json({
        orders,
      })
    } catch (error) {
      console.error(
        'Search orders failed:',
        error
      )

      res.status(500).json({
        message:
          'Failed to search orders',
      })
    }
  }
)

/*
==================================================
GET SINGLE ORDER
GET /api/orders/:orderId
ADMIN ONLY
==================================================
*/

router.get(
  '/:orderId',
  protectAdmin,
  async (req, res) => {
    try {
      const order =
        await Order.findOne({
          orderId: req.params.orderId,
        })

      if (!order) {
        return res.status(404).json({
          message:
            'Order not found',
        })
      }

      res.status(200).json({
        order,
      })
    } catch (error) {
      console.error(
        'Get order failed:',
        error
      )

      res.status(500).json({
        message:
          'Failed to fetch order',
      })
    }
  }
)

/*
==================================================
CONFIRM PAYMENT
PUT /api/orders/:orderId/payment
ADMIN ONLY
==================================================
*/

router.put(
  '/:orderId/payment',
  protectAdmin,
  async (req, res) => {
    try {
      const order =
        await Order.findOne({
          orderId: req.params.orderId,
        })

      if (!order) {
        return res.status(404).json({
          message:
            'Order not found',
        })
      }

      /*
      ----------------------------------------------
      PREVENT DOUBLE PAYMENT CONFIRMATION
      ----------------------------------------------
      */

      if (
        order.paymentStatus === 'Paid'
      ) {
        return res.status(400).json({
          message:
            'Payment is already confirmed',
        })
      }

      /*
      ----------------------------------------------
      VERIFY AND DEDUCT STOCK
      ----------------------------------------------

      MongoDB will only deduct stock when:

      current stock >= ordered quantity

      This prevents stock from becoming negative.
      ----------------------------------------------
      */

      const updatedProducts = []

      for (const item of order.items) {
        const quantity =
          Number(item.quantity)

        const product =
          await Product.findOneAndUpdate(
            {
              productId: item.productId,
              stock: {
                $gte: quantity,
              },
            },
            {
              $inc: {
                stock: -quantity,
              },
            },
            {
              new: true,
            }
          )

        /*
        --------------------------------------------
        PRODUCT NOT FOUND OR NOT ENOUGH STOCK
        --------------------------------------------
        */

        if (!product) {
          /*
          If earlier products in this same order
          were already deducted, restore them.
          */

          for (
            const updatedProduct
            of updatedProducts
          ) {
            await Product.updateOne(
              {
                productId:
                  updatedProduct.productId,
              },
              {
                $inc: {
                  stock:
                    updatedProduct.quantity,
                },
              }
            )
          }

          return res.status(400).json({
            message:
              `Insufficient stock for ${item.name}. Payment was not confirmed.`,
          })
        }

        updatedProducts.push({
          productId:
            product.productId,

          quantity,
        })
      }

      /*
      ----------------------------------------------
      CONFIRM PAYMENT
      ----------------------------------------------
      */

      order.paymentStatus = 'Paid'

      order.orderStatus =
        'Confirmed'

      await order.save()

      res.status(200).json({
        message:
          'Payment confirmed successfully',

        order,
      })
    } catch (error) {
      console.error(
        'Confirm payment failed:',
        error
      )

      res.status(500).json({
        message:
          'Failed to confirm payment',
      })
    }
  }
)

module.exports = router