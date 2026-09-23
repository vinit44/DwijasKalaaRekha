import { Link, useParams } from 'react-router-dom'

import { useCart } from '../context/CartContext'
import { useWishlist } from '../context/WishlistContext'
import { getProductById } from '../services/productService'
import { useEffect, useState } from 'react'
function ProductDetails() {
  const { id } = useParams()

const [product, setProduct] = useState(null)
const [loading, setLoading] = useState(true)
const [error, setError] = useState('')

useEffect(() => {
  async function loadProduct() {
    try {
      const data = await getProductById(id)
      setProduct(data)
    } catch (error) {
      console.error(error)
      setError('Failed to load product')
    } finally {
      setLoading(false)
    }
  }

  loadProduct()
}, [id])

  const { addToCart } = useCart()

  const {
    toggleWishlist,
    isInWishlist,
  } = useWishlist()
if (loading) {
  return (
    <main className="min-h-screen bg-[#faf7f2] px-6 py-20">
      <div className="mx-auto max-w-7xl text-center">
        <p className="text-[#6f625a]">
          Loading product...
        </p>
      </div>
    </main>
  )
}

if (error) {
  return (
    <main className="min-h-screen bg-[#faf7f2] px-6 py-20">
      <div className="mx-auto max-w-7xl text-center">
        <p className="text-[#6f1d1b]">
          {error}
        </p>
      </div>
    </main>
  )
}
  if (!product) {
    return (
      <main className="min-h-screen bg-[#faf7f2] px-6 py-20">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#9a806b]">
            Product
          </p>

          <h1 className="mt-3 text-4xl font-bold text-[#35251d]">
            Product Not Found
          </h1>

          <p className="mt-4 text-[#6f625a]">
            The rangoli you're looking for doesn't exist.
          </p>

          <Link
            to="/shop"
            className="mt-8 inline-block rounded-full bg-[#6f1d1b] px-7 py-3 text-sm font-semibold text-white transition hover:bg-[#581716]"
          >
            Back to Shop
          </Link>
        </div>
      </main>
    )
  }

  const productInWishlist = isInWishlist(product.productId)

  function handleWishlist() {
    toggleWishlist(product)
  }

  return (
    <main className="min-h-screen bg-[#faf7f2] px-6 py-12">
      <div className="mx-auto max-w-7xl">

        {/* Breadcrumb */}
        <div className="mb-8 text-sm text-[#9a806b]">
          <Link
            to="/"
            className="transition hover:text-[#6f1d1b]"
          >
            Home
          </Link>

          <span className="mx-2">/</span>

          <Link
            to="/shop"
            className="transition hover:text-[#6f1d1b]"
          >
            Shop
          </Link>

          <span className="mx-2">/</span>

          <span className="text-[#6f625a]">
            {product.name}
          </span>
        </div>

        {/* Product */}
        <div className="grid gap-10 lg:grid-cols-2">

          {/* Product Image */}
          <div className="relative overflow-hidden rounded-3xl border border-[#eadfd5] bg-white">

            <div className="aspect-square bg-[#f8f3ed]">

              {product.image ? (
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full items-center justify-center text-[10rem] text-[#8b2f2b]/30">
                  {product.symbol}
                </div>
              )}

            </div>

            {/* Discount */}
            {product.discount && (
              <span className="absolute left-5 top-5 rounded-full bg-[#6f1d1b] px-4 py-2 text-xs font-semibold text-white">
                {product.discount}% OFF
              </span>
            )}

            {/* Wishlist */}
            <button
              type="button"
              onClick={handleWishlist}
              className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full bg-white/95 text-2xl text-[#6f1d1b] shadow-sm transition hover:scale-110"
              aria-label={
                productInWishlist
                  ? `Remove ${product.name} from wishlist`
                  : `Add ${product.name} to wishlist`
              }
            >
              {productInWishlist ? '♥' : '♡'}
            </button>

          </div>

          {/* Product Information */}
          <div className="flex flex-col justify-center">

            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#9a806b]">
              {product.productId}
            </p>

            <h1 className="mt-3 text-4xl font-bold text-[#35251d] sm:text-5xl">
              {product.name}
            </h1>

            {/* Rating */}
            <div className="mt-5 flex items-center gap-3">
              <span className="text-lg tracking-wide text-[#b7791f]">
                {'★'.repeat(product.rating)}
              </span>

              <span className="text-sm text-[#9a806b]">
                {product.reviews} reviews
              </span>
            </div>

            {/* Price */}
            <div className="mt-6 flex items-center gap-4">
              <span className="text-3xl font-bold text-[#6f1d1b]">
                ₹{product.price}
              </span>

              {product.mrp > product.price && (
                <span className="text-lg text-gray-400 line-through">
                  ₹{product.mrp}
                </span>
              )}

              {product.discount && (
                <span className="rounded-full bg-[#f4ebe2] px-3 py-1 text-sm font-semibold text-[#6f1d1b]">
                  {product.discount}% OFF
                </span>
              )}
            </div>

            {/* Description */}
            <p className="mt-6 max-w-xl leading-7 text-[#6f625a]">
              Add a touch of traditional elegance to your festive
              celebrations with this beautiful rangoli design.
              Perfect for Diwali, pooja, and special occasions.
            </p>

            {/* Product Information */}
            <div className="mt-8 grid gap-4 sm:grid-cols-2">

              <div className="rounded-2xl border border-[#eadfd5] bg-white p-4">
                <p className="text-xs uppercase tracking-wider text-[#9a806b]">
                  Category
                </p>

                <p className="mt-1 font-semibold text-[#35251d]">
                  {product.category}
                </p>
              </div>

              <div className="rounded-2xl border border-[#eadfd5] bg-white p-4">
                <p className="text-xs uppercase tracking-wider text-[#9a806b]">
                  Collection
                </p>

                <p className="mt-1 font-semibold text-[#35251d]">
                  {product.collection}
                </p>
              </div>

            </div>

            {/* Actions */}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">

              <button
                type="button"
                onClick={() => addToCart(product)}
                className="flex-1 rounded-full bg-[#6f1d1b] px-6 py-4 text-sm font-semibold text-white transition hover:bg-[#581716]"
              >
                Add to Cart
              </button>

              <button
                type="button"
                onClick={handleWishlist}
                className="rounded-full border border-[#6f1d1b] px-6 py-4 text-sm font-semibold text-[#6f1d1b] transition hover:bg-[#f4ebe2]"
              >
                {productInWishlist
                  ? '♥ Saved'
                  : '♡ Add to Wishlist'}
              </button>

            </div>

          </div>
        </div>
      </div>
    </main>
  )
}

export default ProductDetails