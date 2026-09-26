const express = require('express')
const multer = require('multer')
const cloudinary = require('../config/cloudinary')
const protectAdmin = require('../middleware/authMiddleware')

const router = express.Router()

const ALLOWED_MIME_TYPES = [
  'image/jpeg',
  'image/png',
  'image/webp',
]

const MAX_FILE_SIZE = 10 * 1024 * 1024 // 10 MB

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: MAX_FILE_SIZE,
  },
  fileFilter: (req, file, cb) => {
    if (!ALLOWED_MIME_TYPES.includes(file.mimetype)) {
      return cb(
        new Error(
          'Only JPG, PNG and WebP images are allowed.'
        )
      )
    }

    cb(null, true)
  },
})

router.post(
  '/',
  protectAdmin,
  (req, res, next) => {
    upload.single('image')(req, res, (error) => {
      if (!error) {
        return next()
      }

      if (error instanceof multer.MulterError) {
        if (error.code === 'LIMIT_FILE_SIZE') {
          return res.status(400).json({
            message:
              'Image size must be 10 MB or less.',
          })
        }

        return res.status(400).json({
          message: error.message,
        })
      }

      return res.status(400).json({
        message: error.message,
      })
    })
  },
  async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({
          message: 'No image uploaded',
        })
      }

      const result = await new Promise(
        (resolve, reject) => {
          const uploadStream =
            cloudinary.uploader.upload_stream(
              {
                folder:
                  'dwijaskalarekha/products',
                resource_type: 'image',
              },
              (error, result) => {
                if (error) {
                  reject(error)
                } else {
                  resolve(result)
                }
              }
            )

          uploadStream.end(req.file.buffer)
        }
      )

      res.status(200).json({
        message:
          'Image uploaded successfully',
        imageUrl: result.secure_url,
        publicId: result.public_id,
      })
    } catch (error) {
      console.error(
        'Cloudinary upload failed:',
        error
      )

      res.status(500).json({
        message: 'Image upload failed',
      })
    }
  }
)

module.exports = router