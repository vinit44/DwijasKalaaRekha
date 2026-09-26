import API_URL from '../config/api'

const PRODUCTS_API_URL = `${API_URL}/api/products`

export async function getProducts() {
  const response = await fetch(PRODUCTS_API_URL)

  if (!response.ok) {
    throw new Error('Failed to fetch products')
  }

  return response.json()
}

export async function getProductById(productId) {
  const response = await fetch(
    `${PRODUCTS_API_URL}/${productId}`
  )

  if (!response.ok) {
    throw new Error('Failed to fetch product')
  }

  return response.json()
}