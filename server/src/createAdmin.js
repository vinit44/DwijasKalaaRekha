const mongoose = require('mongoose')
const dotenv = require('dotenv')
const bcrypt = require('bcryptjs')
const Admin = require('./models/Admin')

dotenv.config()

async function createAdmin() {
  try {
    await mongoose.connect(process.env.MONGODB_URI)

    console.log('MongoDB connected')

    const existingAdmin = await Admin.findOne({
      email: process.env.ADMIN_EMAIL.toLowerCase(),
    })

    if (existingAdmin) {
      console.log('Admin already exists')
      process.exit(0)
    }

    const hashedPassword = await bcrypt.hash(
      process.env.ADMIN_PASSWORD,
      10
    )

    await Admin.create({
      email: process.env.ADMIN_EMAIL,
      password: hashedPassword,
    })

    console.log('Admin created successfully')

    process.exit(0)
  } catch (error) {
    console.error('Failed to create admin:')
    console.error(error.message)

    process.exit(1)
  }
}

createAdmin()