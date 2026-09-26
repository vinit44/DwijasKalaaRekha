const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema(
  {
    orderId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    customer: {
      fullName: {
        type: String,
        required: true,
        trim: true,
      },

      mobile: {
        type: String,
        required: true,
        trim: true,
      },

      email: {
        type: String,
        default: '',
        trim: true,
      },

      address: {
        type: String,
        required: true,
        trim: true,
      },

      city: {
        type: String,
        required: true,
        trim: true,
      },

      state: {
        type: String,
        required: true,
        trim: true,
      },

      pincode: {
        type: String,
        required: true,
        trim: true,
      },
    },

    items: [
      {
        productId: {
          type: String,
          required: true,
        },

        name: {
          type: String,
          required: true,
        },

        price: {
          type: Number,
          required: true,
        },

        quantity: {
          type: Number,
          required: true,
          min: 1,
        },

        image: {
          type: String,
          default: '',
        },
      },
    ],

    subtotal: {
      type: Number,
      required: true,
    },

    deliveryCharge: {
      type: Number,
      default: 0,
    },

    // Distance from Borivali to customer's delivery destination
    deliveryDistanceKm: {
      type: Number,
      default: 0,
      min: 0,
    },

    // Source used to calculate the delivery distance
    deliveryDistanceSource: {
      type: String,
      default: '',
      trim: true,
    },

    total: {
      type: Number,
      required: true,
    },

    paymentStatus: {
      type: String,
      enum: [
        'Pending',
        'Paid',
        'Failed',
      ],
      default: 'Pending',
    },

    paymentReference: {
      type: String,
      default: '',
      trim: true,
    },

    orderStatus: {
      type: String,
      enum: [
        'Pending',
        'Confirmed',
        'Processing',
        'Packed',
        'Shipped',
        'Out for Delivery',
        'Delivered',
        'Cancelled',
      ],
      default: 'Pending',
    },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('Order', orderSchema)