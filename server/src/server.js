const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const cors = require('cors')
const authRoutes = require('./routes/authRoutes')
dotenv.config()
const orderRoutes = require('./routes/orderRoutes')
const productRoutes = require('./routes/productRoutes')
const uploadRoutes = require('./routes/uploadRoutes')

const app = express()

const PORT = process.env.PORT || 5000

// Middleware
app.use(cors())
app.use(express.json())
app.use('/api/auth', authRoutes)
// Routes
app.get('/', (req, res) => {
  res.json({
    message: 'DwijasKalaRekha API is running',
  })
})
app.use('/api/orders', orderRoutes)
app.use('/api/products', productRoutes)
app.use('/api/upload', uploadRoutes)

// Connect MongoDB and start server
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('MongoDB connected successfully')

    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`)
    })
  })
  .catch((error) => {
    console.error('MongoDB connection failed:')
    console.error(error.message)
  })