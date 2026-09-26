const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Admin = require('../models/Admin')

const router = express.Router()

// Admin Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({
        message: 'Email and password are required',
      })
    }

    const admin = await Admin.findOne({
      email: email.toLowerCase(),
    })

    if (!admin) {
      return res.status(401).json({
        message: 'Invalid email or password',
      })
    }

    const passwordMatch = await bcrypt.compare(
      password,
      admin.password
    )

    if (!passwordMatch) {
      return res.status(401).json({
        message: 'Invalid email or password',
      })
    }

    const token = jwt.sign(
      {
        adminId: admin._id,
        email: admin.email,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: '1d',
      }
    )

    res.json({
      message: 'Login successful',
      token,
      admin: {
        id: admin._id,
        email: admin.email,
      },
    })
  } catch (error) {
    console.error('Admin login failed:', error)

    res.status(500).json({
      message: 'Login failed',
      error: error.message,
    })
  }
})

module.exports = router