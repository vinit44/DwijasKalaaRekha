const express = require('express')
const Product = require('../models/Product')
const protectAdmin = require('../middleware/authMiddleware')

const router = express.Router()

// GET all products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 })

    res.json(products)
  } catch (error) {
    res.status(500).json({
      message: 'Failed to fetch products',
      error: error.message,
    })
  }
})

// GET one product
router.get('/:productId', async (req, res) => {
  try {
    const product = await Product.findOne({
      productId: req.params.productId,
    })

    if (!product) {
      return res.status(404).json({
        message: 'Product not found',
      })
    }

    res.json(product)
  } catch (error) {
    res.status(500).json({
      message: 'Failed to fetch product',
      error: error.message,
    })
  }
})

// ADD product - Admin only
router.post('/', protectAdmin, async (req, res) => {
  try {
    const product = await Product.create(req.body)

    res.status(201).json(product)
  } catch (error) {
    res.status(400).json({
      message: 'Failed to create product',
      error: error.message,
    })
  }
})

// UPDATE product - Admin only
router.put('/:productId', protectAdmin, async (req, res) => {
  try {
    const product = await Product.findOneAndUpdate(
      {
        productId: req.params.productId,
      },
      req.body,
      {
        new: true,
        runValidators: true,
      }
    )

    if (!product) {
      return res.status(404).json({
        message: 'Product not found',
      })
    }

    res.json(product)
  } catch (error) {
    res.status(400).json({
      message: 'Failed to update product',
      error: error.message,
    })
  }
})

// DELETE product - Admin only
router.delete('/:productId', protectAdmin, async (req, res) => {
  try {
    const product = await Product.findOneAndDelete({
      productId: req.params.productId,
    })

    if (!product) {
      return res.status(404).json({
        message: 'Product not found',
      })
    }

    res.json({
      message: 'Product deleted successfully',
      product,
    })
  } catch (error) {
    res.status(500).json({
      message: 'Failed to delete product',
      error: error.message,
    })
  }
})

module.exports = router