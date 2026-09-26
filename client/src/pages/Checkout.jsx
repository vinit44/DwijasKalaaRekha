import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import API_URL from '../config/api'
const WHATSAPP_NUMBER = '919321510370'

const INDIAN_STATES = [
  'Andhra Pradesh',
  'Arunachal Pradesh',
  'Assam',
  'Bihar',
  'Chhattisgarh',
  'Goa',
  'Gujarat',
  'Haryana',
  'Himachal Pradesh',
  'Jharkhand',
  'Karnataka',
  'Kerala',
  'Madhya Pradesh',
  'Maharashtra',
  'Manipur',
  'Meghalaya',
  'Mizoram',
  'Nagaland',
  'Odisha',
  'Punjab',
  'Rajasthan',
  'Sikkim',
  'Tamil Nadu',
  'Telangana',
  'Tripura',
  'Uttar Pradesh',
  'Uttarakhand',
  'West Bengal',
  'Andaman and Nicobar Islands',
  'Chandigarh',
  'Dadra and Nagar Haveli and Daman and Diu',
  'Delhi',
  'Jammu and Kashmir',
  'Ladakh',
  'Lakshadweep',
  'Puducherry',
]

function InputField({
  label,
  name,
  type = 'text',
  placeholder,
  required = false,
  value,
  error,
  onChange,
  maxLength,
  inputMode,
}) {
  return (
    <div>
      <label
        htmlFor={name}
        className="mb-2 block text-[13px] font-semibold tracking-wide text-[#4b2930]"
      >
        {label}
        {required && (
          <span className="ml-1 text-[#a33a32]">
            *
          </span>
        )}
      </label>

      <input
        id={name}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        maxLength={maxLength}
        inputMode={inputMode}
        className={`w-full border bg-[#fffdf9] px-4 py-3.5 text-sm text-[#35251d] outline-none transition-all duration-200 placeholder:text-[#b4a79d] ${
          error
            ? 'border-[#c65d55] focus:ring-4 focus:ring-[#f7dfdc]'
            : 'border-[#ded2c5] hover:border-[#c7b5a4] focus:border-[#7a2525] focus:ring-4 focus:ring-[#f2e6dc]'
        }`}
      />

      {error && (
        <p className="mt-1.5 text-xs text-[#b43b35]">
          {error}
        </p>
      )}
    </div>
  )
}

function SelectField({
  label,
  name,
  value,
  options,
  placeholder,
  required = false,
  error,
  onChange,
  disabled = false,
  loading = false,
}) {
  return (
    <div>
      <label
        htmlFor={name}
        className="mb-2 block text-[13px] font-semibold tracking-wide text-[#4b2930]"
      >
        {label}
        {required && (
          <span className="ml-1 text-[#a33a32]">
            *
          </span>
        )}
      </label>

      <select
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className={`w-full appearance-none border bg-[#fffdf9] px-4 py-3.5 text-sm text-[#35251d] outline-none transition-all duration-200 ${
          error
            ? 'border-[#c65d55] focus:ring-4 focus:ring-[#f7dfdc]'
            : 'border-[#ded2c5] hover:border-[#c7b5a4] focus:border-[#7a2525] focus:ring-4 focus:ring-[#f2e6dc]'
        } ${
          disabled
            ? 'cursor-not-allowed bg-[#f5f0e9] text-[#a59a91]'
            : 'cursor-pointer'
        }`}
      >
        <option value="">
          {loading
            ? 'Loading cities...'
            : placeholder}
        </option>

        {options.map((option) => (
          <option
            key={option}
            value={option}
          >
            {option}
          </option>
        ))}
      </select>

      {error && (
        <p className="mt-1.5 text-xs text-[#b43b35]">
          {error}
        </p>
      )}
    </div>
  )
}

function Checkout() {
  const { cartItems, clearCart } = useCart()
  const navigate = useNavigate()

  const [customerData, setCustomerData] =
    useState({
      fullName: '',
      mobile: '',
      email: '',
      address: '',
      city: '',
      state: '',
      pincode: '',
    })

  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] =
    useState(false)
  const [submitError, setSubmitError] =
    useState('')

  const deliveryCharge = 0

  const subtotal = cartItems.reduce(
    (total, item) =>
      total +
      Number(item.price) *
        Number(item.quantity),
    0
  )

  const total =
    subtotal + deliveryCharge

  /*
  ==================================================
  HANDLE INPUT
  ==================================================
  */

  function handleChange(event) {
    const {
      name,
      value,
    } = event.target

    if (name === 'mobile') {
      const numericValue =
        value
          .replace(/\D/g, '')
          .slice(0, 10)

      setCustomerData(
        (currentData) => ({
          ...currentData,
          mobile: numericValue,
        })
      )

      setErrors(
        (currentErrors) => ({
          ...currentErrors,
          mobile: '',
        })
      )

      return
    }

    if (name === 'pincode') {
      const numericValue =
        value
          .replace(/\D/g, '')
          .slice(0, 6)

      setCustomerData(
        (currentData) => ({
          ...currentData,
          pincode: numericValue,
        })
      )

      setErrors(
        (currentErrors) => ({
          ...currentErrors,
          pincode: '',
        })
      )

      return
    }

    if (name === 'state') {
      setCustomerData(
        (currentData) => ({
          ...currentData,
          state: value,
          city: '',
        })
      )


      setErrors(
        (currentErrors) => ({
          ...currentErrors,
          state: '',
          city: '',
        })
      )

      return
    }

    setCustomerData(
      (currentData) => ({
        ...currentData,
        [name]: value,
      })
    )

    setErrors(
      (currentErrors) => ({
        ...currentErrors,
        [name]: '',
      })
    )
  }

  /*
  ==================================================
  VALIDATION
  ==================================================
  */

  function validateForm() {
    const newErrors = {}

    if (!customerData.fullName.trim()) {
      newErrors.fullName =
        'Full name is required'
    }

    if (!customerData.mobile.trim()) {
      newErrors.mobile =
        'Mobile number is required'
    } else if (
      !/^[6-9]\d{9}$/.test(
        customerData.mobile.trim()
      )
    ) {
      newErrors.mobile =
        'Enter a valid 10-digit mobile number'
    }

    if (
      customerData.email.trim() &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
        customerData.email.trim()
      )
    ) {
      newErrors.email =
        'Enter a valid email address'
    }

    if (!customerData.address.trim()) {
      newErrors.address =
        'Address is required'
    }

    if (!customerData.state.trim()) {
      newErrors.state =
        'Please select a state'
    }

    if (!customerData.city.trim()) {
      newErrors.city =
        'City is required'
    }

    if (!customerData.pincode.trim()) {
      newErrors.pincode =
        'Pincode is required'
    } else if (
      !/^\d{6}$/.test(
        customerData.pincode.trim()
      )
    ) {
      newErrors.pincode =
        'Enter a valid 6-digit pincode'
    }

    setErrors(newErrors)

    return (
      Object.keys(newErrors).length === 0
    )
  }

  /*
  ==================================================
  WHATSAPP MESSAGE
  ==================================================
  */

  function buildWhatsAppMessage(order) {
    const itemsText =
      order.items
        .map((item) => {
          const imageText =
            item.image
              ? `\nProduct Image: ${item.image}`
              : ''

          return `- ${item.name}
  Product ID: ${item.productId}
  Quantity: ${item.quantity}
  Price: Rs. ${item.price}
  Total: ${
    Number(item.price) *
    Number(item.quantity)
  }${imageText}`
        })
        .join('\n\n')

    const deliveryText =
      order.deliveryCharge === 0
        ? 'FREE'
        : `Rs. ${order.deliveryCharge}`

    const emailText =
      order.customer.email
        ? `\nEmail: ${order.customer.email}`
        : ''

    const distanceText =
      Number.isFinite(
        Number(
          order.deliveryDistanceKm
        )
      )
        ? `\nDelivery Distance: ${order.deliveryDistanceKm} km`
        : ''

    return `DWIJASKALAREKHA
====================
NEW ORDER RECEIVED
====================

ORDER ID
${order.orderId}

ORDER DETAILS

${itemsText}

====================
PAYMENT SUMMARY

Subtotal: Rs. ${order.subtotal}
Delivery: ${deliveryText}
Total: Rs. ${order.total}

====================
CUSTOMER DETAILS

Name: ${order.customer.fullName}
Mobile: ${order.customer.mobile}${emailText}

====================
DELIVERY ADDRESS

${order.customer.address}
${order.customer.city}, ${order.customer.state}
Pincode: ${order.customer.pincode}${distanceText}

====================
PAYMENT

Payment will be completed through WhatsApp.

Order Status: Pending

====================

Please share the payment details / QR code
for completing the payment.

Thank you for choosing DwijasKalaRekha.`
  }

  /*
  ==================================================
  PLACE ORDER
  ==================================================
  */

  async function handlePlaceOrder(event) {
    event.preventDefault()

    setSubmitError('')

    if (!validateForm()) {
      return
    }

    if (cartItems.length === 0) {
      setSubmitError(
        'Your cart is empty.'
      )
      return
    }

    try {
      setIsSubmitting(true)

      const orderData = {
        customer: {
          fullName:
            customerData.fullName.trim(),
          mobile:
            customerData.mobile.trim(),
          email:
            customerData.email.trim(),
          address:
            customerData.address.trim(),
          city:
            customerData.city.trim(),
          state:
            customerData.state.trim(),
          pincode:
            customerData.pincode.trim(),
        },

        items: cartItems.map(
          (item) => ({
            productId:
              item.productId,
            name:
              item.name,
            price:
              Number(item.price),
            quantity:
              Number(item.quantity),
            image:
              item.image || '',
          })
        ),

        subtotal,
        deliveryCharge,
        total,
      }

      const response =
        await fetch(
          `${API_URL}/api/orders`,
          {
            method: 'POST',
            headers: {
              'Content-Type':
                'application/json',
            },
            body:
              JSON.stringify(
                orderData
              ),
          }
        )

      const data =
        await response.json()

      if (!response.ok) {
        throw new Error(
          data.message ||
            'Failed to create order'
        )
      }

      const order =
        data.order

      localStorage.setItem(
        'dwijasPendingOrder',
        JSON.stringify(order)
      )

      const whatsappMessage =
        buildWhatsAppMessage(
          order
        )

      const whatsappUrl =
        `https://wa.me/${WHATSAPP_NUMBER}` +
        `?text=${encodeURIComponent(
          whatsappMessage
        )}`

      window.open(
        whatsappUrl,
        '_blank'
      )

      clearCart()

      navigate(
        '/order-pending',
        {
          state: {
            order,
          },
        }
      )
    } catch (error) {
      console.error(
        'Create order failed:',
        error
      )

      setSubmitError(
        error.message ||
          'Something went wrong. Please try again.'
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  /*
  ==================================================
  EMPTY CART
  ==================================================
  */

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-[#f8f3ea] flex items-center justify-center px-4">

        <div className="w-full max-w-md border border-[#e8ddd0] bg-[#fffdf9] p-10 text-center shadow-[0_20px_60px_rgba(70,35,25,0.08)]">

          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[#f4e7dc] text-2xl text-[#7a2525]">
            🛍
          </div>

          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#a06d32]">
            DwijasKalaRekha
          </p>

          <h1 className="mt-3 font-serif text-3xl font-semibold text-[#54244f]">
            Your cart is empty
          </h1>

          <p className="mt-3 text-sm leading-6 text-[#766960]">
            Add a beautiful rangoli design
            before continuing to checkout.
          </p>

          <Link
            to="/shop"
            className="mt-7 inline-flex items-center justify-center bg-[#7a2525] px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-[#641c1c]"
          >
            Continue Shopping
          </Link>

        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#f8f3ea]">

      {/* TOP BRAND LINE */}

      <div className="h-1 bg-[#7a2525]" />

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">

        {/* HEADER */}

        <header className="mb-9">

          <Link
            to="/cart"
            className="group inline-flex items-center gap-2 text-sm font-medium text-[#6d554b] transition hover:text-[#7a2525]"
          >
            <span className="text-lg transition-transform group-hover:-translate-x-1">
              ←
            </span>

            Back to cart
          </Link>

          <div className="mt-8 max-w-2xl">

            <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#a06d32]">
              DwijasKalaRekha
            </p>

            <h1 className="mt-2 font-serif text-4xl font-semibold tracking-tight text-[#54244f] sm:text-5xl">
              Complete your order
            </h1>

            <p className="mt-4 max-w-xl text-sm leading-6 text-[#766960] sm:text-base">
              Add your delivery details below.
              Your order will then continue
              through WhatsApp for payment
              and confirmation.
            </p>

          </div>

        </header>

        {/* PROGRESS */}

        <div className="mb-8 hidden items-center gap-3 text-xs font-semibold uppercase tracking-wider text-[#8b776c] sm:flex">

          <div className="flex items-center gap-2 text-[#7a2525]">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#7a2525] text-white">
              1
            </span>
            Details
          </div>

          <div className="h-px w-12 bg-[#d9c9bb]" />

          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-full border border-[#cdbcae] bg-[#fffdf9]">
              2
            </span>
            WhatsApp
          </div>

        </div>

        <form
          onSubmit={handlePlaceOrder}
          className="grid gap-7 lg:grid-cols-[minmax(0,1fr)_380px]"
        >

          {/* LEFT COLUMN */}

          <div className="space-y-6">

            {/* CUSTOMER DETAILS */}

            <section className="border border-[#e6dace] bg-[#fffdf9] shadow-[0_12px_35px_rgba(70,35,25,0.045)]">

              <div className="border-b border-[#eee3da] px-6 py-5 sm:px-8">

                <div className="flex items-center gap-4">

                  <div className="flex h-9 w-9 shrink-0 items-center justify-center bg-[#7a2525] text-sm font-bold text-white">
                    1
                  </div>

                  <div>

                    <h2 className="font-serif text-xl font-semibold text-[#54244f]">
                      Delivery details
                    </h2>

                    <p className="mt-0.5 text-xs text-[#897970]">
                      Where should we deliver your rangoli?
                    </p>

                  </div>

                </div>

              </div>

              <div className="p-6 sm:p-8">

                <div className="grid gap-5 md:grid-cols-2">

                  <div className="md:col-span-2">

                    <InputField
                      label="Full Name"
                      name="fullName"
                      value={
                        customerData.fullName
                      }
                      error={
                        errors.fullName
                      }
                      onChange={
                        handleChange
                      }
                      placeholder="Your full name"
                      required
                    />

                  </div>

                  <InputField
                    label="Mobile Number"
                    name="mobile"
                    type="tel"
                    value={
                      customerData.mobile
                    }
                    error={
                      errors.mobile
                    }
                    onChange={
                      handleChange
                    }
                    placeholder="10-digit mobile number"
                    maxLength={10}
                    inputMode="numeric"
                    required
                  />

                  <InputField
                    label="Email Address"
                    name="email"
                    type="email"
                    value={
                      customerData.email
                    }
                    error={
                      errors.email
                    }
                    onChange={
                      handleChange
                    }
                    placeholder="Email address (optional)"
                  />

                  <div className="md:col-span-2">

                    <InputField
                      label="House / Building / Area"
                      name="address"
                      value={
                        customerData.address
                      }
                      error={
                        errors.address
                      }
                      onChange={
                        handleChange
                      }
                      placeholder="Flat / house number, building, street, area"
                      required
                    />

                  </div>

                  <SelectField
                    label="State / Union Territory"
                    name="state"
                    value={
                      customerData.state
                    }
                    options={
                      INDIAN_STATES
                    }
                    error={
                      errors.state
                    }
                    onChange={
                      handleChange
                    }
                    placeholder="Select state"
                    required
                  />

                  <InputField
                    label="City"
                    name="city"
                    value={
                      customerData.city
                    }
                    error={
                      errors.city
                    }
                    onChange={
                      handleChange
                    }
                    placeholder="Enter city / town"
                    required
                  />

                  <InputField
                    label="Pincode"
                    name="pincode"
                    value={
                      customerData.pincode
                    }
                    error={
                      errors.pincode
                    }
                    onChange={
                      handleChange
                    }
                    placeholder="6-digit pincode"
                    maxLength={6}
                    inputMode="numeric"
                    required
                  />

                </div>


              </div>

            </section>

            {/* WHATSAPP PAYMENT */}

            <section className="border border-[#e6dace] bg-[#fffdf9] shadow-[0_12px_35px_rgba(70,35,25,0.045)]">

              <div className="border-b border-[#eee3da] px-6 py-5 sm:px-8">

                <div className="flex items-center gap-4">

                  <div className="flex h-9 w-9 shrink-0 items-center justify-center bg-[#54244f] text-sm font-bold text-white">
                    2
                  </div>

                  <div>

                    <h2 className="font-serif text-xl font-semibold text-[#54244f]">
                      Complete on WhatsApp
                    </h2>

                    <p className="mt-0.5 text-xs text-[#897970]">
                      Simple manual payment process
                    </p>

                  </div>

                </div>

              </div>

              <div className="p-6 sm:p-8">

                <div className="grid gap-3 sm:grid-cols-2">

                  <div className="border border-[#eadfd4] bg-[#fbf6ef] p-4">

                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#a06d32]">
                      01
                    </span>

                    <p className="mt-2 text-sm font-semibold text-[#4b2930]">
                      Place your order
                    </p>

                    <p className="mt-1 text-xs leading-5 text-[#81736b]">
                      Submit your delivery information.
                    </p>

                  </div>

                  <div className="border border-[#eadfd4] bg-[#fbf6ef] p-4">

                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#a06d32]">
                      02
                    </span>

                    <p className="mt-2 text-sm font-semibold text-[#4b2930]">
                      WhatsApp opens
                    </p>

                    <p className="mt-1 text-xs leading-5 text-[#81736b]">
                      Your order details are pre-filled.
                    </p>

                  </div>

                  <div className="border border-[#eadfd4] bg-[#fbf6ef] p-4">

                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#a06d32]">
                      03
                    </span>

                    <p className="mt-2 text-sm font-semibold text-[#4b2930]">
                      Receive payment details
                    </p>

                    <p className="mt-1 text-xs leading-5 text-[#81736b]">
                      Our team shares the QR / UPI details.
                    </p>

                  </div>

                  <div className="border border-[#eadfd4] bg-[#fbf6ef] p-4">

                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#a06d32]">
                      04
                    </span>

                    <p className="mt-2 text-sm font-semibold text-[#4b2930]">
                      Payment verification
                    </p>

                    <p className="mt-1 text-xs leading-5 text-[#81736b]">
                      Payment is manually verified before confirmation.
                    </p>

                  </div>

                </div>

                <div className="mt-5 border-l-2 border-[#c99a4a] bg-[#fcf7ed] px-5 py-4">

                  <p className="text-sm font-semibold text-[#54244f]">
                    Your order starts as Pending
                  </p>

                  <p className="mt-1 text-xs leading-5 text-[#766960]">
                    Once the payment is verified,
                    the order will move to Confirmed.
                  </p>

                </div>

              </div>

            </section>

            {/* ERROR */}

            {submitError && (
              <div className="border border-[#e7b8b3] bg-[#fff4f2] px-5 py-4 text-sm text-[#a33a32]">
                {submitError}
              </div>
            )}

            {/* MOBILE CTA */}

            <div className="lg:hidden border border-[#e6dace] bg-[#fffdf9] p-5">

              <div className="mb-4 flex items-center justify-between">

                <span className="text-sm font-medium text-[#766960]">
                  Order total
                </span>

                <span className="font-serif text-2xl font-bold text-[#7a2525]">
                  Rs. {total}
                </span>

              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#7a2525] px-5 py-4 text-sm font-bold tracking-wide text-white transition hover:bg-[#641c1c] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSubmitting
                  ? 'Creating Order...'
                  : 'Continue to WhatsApp →'}
              </button>

            </div>

          </div>

          {/* RIGHT COLUMN */}

          <aside className="lg:sticky lg:top-6 lg:h-fit">

            <div className="border border-[#e6dace] bg-[#fffdf9] shadow-[0_12px_35px_rgba(70,35,25,0.06)]">

              <div className="border-b border-[#eee3da] px-6 py-5">

                <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#a06d32]">
                  Your selection
                </p>

                <h2 className="mt-1 font-serif text-2xl font-semibold text-[#54244f]">
                  Order summary
                </h2>

              </div>

              <div className="max-h-[390px] overflow-y-auto px-6 py-5">

                <div className="space-y-5">

                  {cartItems.map(
                    (item) => (
                      <div
                        key={
                          item.productId
                        }
                        className="flex gap-4"
                      >

                        <div className="h-20 w-20 shrink-0 overflow-hidden border border-[#e8ddd1] bg-[#f4eee6]">

                          {item.image ? (
                            <img
                              src={
                                item.image
                              }
                              alt={
                                item.name
                              }
                              className="h-full w-full object-cover"
                              onError={(
                                event
                              ) => {
                                event.currentTarget.style.display =
                                  'none'
                              }}
                            />
                          ) : (
                            <div className="flex h-full w-full items-center justify-center text-[10px] uppercase tracking-wider text-[#a59a91]">
                              No Image
                            </div>
                          )}

                        </div>

                        <div className="min-w-0 flex-1">

                          <h3 className="truncate text-sm font-semibold text-[#4b2930]">
                            {
                              item.name
                            }
                          </h3>

                          <p className="mt-1 text-[11px] text-[#95867d]">
                            {
                              item.productId
                            }
                          </p>

                          <div className="mt-2 flex items-center justify-between">

                            <span className="text-xs text-[#766960]">
                              Qty.{' '}
                              {
                                item.quantity
                              }
                            </span>

                            <span className="text-sm font-bold text-[#7a2525]">
                              Rs.{' '}
                              {Number(
                                item.price
                              ) *
                                Number(
                                  item.quantity
                                )}
                            </span>

                          </div>

                        </div>

                      </div>
                    )
                  )}

                </div>

              </div>

              <div className="border-t border-[#e8ddd1] px-6 py-5">

                <div className="space-y-3 text-sm">

                  <div className="flex justify-between">

                    <span className="text-[#766960]">
                      Subtotal
                    </span>

                    <span className="font-medium text-[#4b2930]">
                      Rs. {subtotal}
                    </span>

                  </div>

                  <div className="flex justify-between">

                    <span className="text-[#766960]">
                      Delivery
                    </span>

                    <span className="font-semibold text-[#65754a]">
                      FREE
                    </span>

                  </div>

                </div>

                <div className="my-5 border-t border-dashed border-[#d9c9bb]" />

                <div className="flex items-end justify-between">

                  <div>

                    <p className="text-xs uppercase tracking-wider text-[#897970]">
                      Total
                    </p>

                    <p className="mt-1 font-serif text-3xl font-bold text-[#54244f]">
                      Rs. {total}
                    </p>

                  </div>

                  <span className="mb-1 text-[11px] text-[#897970]">
                    INR
                  </span>

                </div>

                <div className="mt-5 border border-[#eadfd4] bg-[#fbf6ef] p-4">

                  <div className="flex items-start gap-3">

                    <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center bg-[#7a2525] text-xs font-bold text-white">
                      ✓
                    </div>

                    <div>

                      <p className="text-xs font-bold uppercase tracking-wider text-[#54244f]">
                        Delivery distance
                      </p>

                      <p className="mt-1 text-xs leading-5 text-[#81736b]">
                        The server calculates the
                        road distance from Borivali
                        to your selected destination
                        when the order is submitted.
                      </p>

                    </div>

                  </div>

                </div>

              </div>

              {/* DESKTOP CTA */}

              <div className="hidden border-t border-[#eee3da] p-6 lg:block">

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="group flex w-full items-center justify-center gap-2 bg-[#7a2525] px-5 py-4 text-sm font-bold tracking-wide text-white transition hover:bg-[#641c1c] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <span>
                    {isSubmitting
                      ? 'Creating Order...'
                      : 'Continue to WhatsApp'}
                  </span>

                  {!isSubmitting && (
                    <span className="transition-transform group-hover:translate-x-1">
                      →
                    </span>
                  )}
                </button>

                <p className="mt-3 text-center text-[11px] leading-5 text-[#95867d]">
                  Payment is completed manually
                  through WhatsApp after the order
                  is created.
                </p>

              </div>

            </div>

          </aside>

        </form>

      </main>

      {/* BOTTOM BRAND STRIP */}

      <div className="border-t border-[#e5d8cd] bg-[#f2e8dc]">

        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-5 text-center text-[11px] uppercase tracking-[0.18em] text-[#766960] sm:flex-row sm:items-center sm:justify-center sm:gap-6">

          <span>
            Handcrafted
          </span>

          <span className="hidden h-1 w-1 rounded-full bg-[#c99a4a] sm:block" />

          <span>
            Reusable
          </span>

          <span className="hidden h-1 w-1 rounded-full bg-[#c99a4a] sm:block" />

          <span>
            Made with care
          </span>

        </div>

      </div>

    </div>
  )
}

export default Checkout