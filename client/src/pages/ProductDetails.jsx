import {
  useEffect,
  useState,
} from 'react'

import {
  Link,
  useParams,
} from 'react-router-dom'

import { useCart } from '../context/CartContext'
import { useWishlist } from '../context/WishlistContext'
import { getProductById } from '../services/productService'

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

  /* ================= LOADING ================= */

  if (loading) {
    return (
      <main className="min-h-screen bg-[#FFF7E8]">

        <div className="mx-auto max-w-[1400px] px-5 py-20 sm:px-8 lg:px-12">

          <div className="grid gap-10 lg:grid-cols-2">

            <div className="aspect-square animate-pulse bg-[#E8D5BE]" />

            <div className="flex flex-col justify-center">

              <div className="h-3 w-28 animate-pulse bg-[#D8B5A4]" />

              <div className="mt-5 h-12 w-3/4 animate-pulse bg-[#E2CDB7]" />

              <div className="mt-4 h-5 w-1/3 animate-pulse bg-[#E2CDB7]" />

              <div className="mt-8 h-10 w-40 animate-pulse bg-[#D9A94D]/40" />

              <div className="mt-8 h-24 w-full animate-pulse bg-[#E8D5BE]" />

              <div className="mt-8 flex gap-3">
                <div className="h-14 flex-1 animate-pulse bg-[#7A2525]/30" />
                <div className="h-14 w-40 animate-pulse bg-[#D8B5A4]" />
              </div>

            </div>

          </div>

        </div>

      </main>
    )
  }

  /* ================= ERROR ================= */

  if (error) {
    return (
      <main className="min-h-screen bg-[#FFF7E8] px-5 py-20 sm:px-8">

        <div className="mx-auto max-w-xl bg-white px-6 py-14 text-center shadow-sm">

          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#F8DED8] text-2xl font-bold text-[#7A2525]">
            !
          </div>

          <h1 className="mt-6 font-serif text-3xl text-[#351B19]">
            Something went wrong
          </h1>

          <p className="mt-4 text-sm text-[#725E57]">
            {error}
          </p>

          <Link
            to="/shop"
            className="mt-7 inline-flex bg-[#7A2525] px-7 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#A33A32]"
          >
            Back to Shop
          </Link>

        </div>

      </main>
    )
  }

  /* ================= NOT FOUND ================= */

  if (!product) {
    return (
      <main className="min-h-screen bg-[#FFF7E8] px-5 py-20 sm:px-8">

        <div className="mx-auto max-w-3xl text-center">

          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#8A477F]">
            Product
          </p>

          <h1 className="mt-4 font-serif text-5xl text-[#351B19]">
            Product Not Found
          </h1>

          <p className="mt-5 text-[#725E57]">
            The rangoli you're looking for doesn't exist.
          </p>

          <Link
            to="/shop"
            className="mt-8 inline-flex bg-[#7A2525] px-7 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-white transition-all duration-300 hover:bg-[#A33A32]"
          >
            Back to Shop
          </Link>

        </div>

      </main>
    )
  }

  const productInWishlist =
    isInWishlist(product.productId)

  function handleWishlist() {
    toggleWishlist(product)
  }

  function handleAddToCart() {
    addToCart(product)
  }

  const rating = Math.max(
    0,
    Math.min(
      5,
      Number(product.rating) || 0
    )
  )

  const reviews =
    Number(product.reviews) || 0

  const isInStock =
    Number(product.stock) > 0

  return (
    <main className="min-h-screen bg-[#FFF7E8]">

      {/* =====================================================
          COLOURFUL TOP STRIP
      ===================================================== */}

      <div className="bg-[#54244F] text-white">

        <div className="mx-auto flex max-w-[1400px] items-center justify-between px-5 py-3 sm:px-8 lg:px-12">

          <p className="text-[9px] font-semibold uppercase tracking-[0.25em] text-[#F4DFA9]">
            Handmade • Reusable • Festive
          </p>

          <p className="hidden text-[9px] uppercase tracking-[0.2em] text-white/60 sm:block">
            DwijasKalaRekha
          </p>

        </div>

      </div>

      <div className="mx-auto max-w-[1400px] px-5 py-7 sm:px-8 sm:py-10 lg:px-12">

        {/* ===================================================
            BREADCRUMB
        =================================================== */}

        <div className="mb-8 flex flex-wrap items-center gap-2 text-xs">

          <Link
            to="/"
            className="font-medium text-[#8A477F] transition-colors duration-300 hover:text-[#7A2525]"
          >
            Home
          </Link>

          <span className="text-[#B99C8A]">
            /
          </span>

          <Link
            to="/shop"
            className="font-medium text-[#8A477F] transition-colors duration-300 hover:text-[#7A2525]"
          >
            Shop
          </Link>

          <span className="text-[#B99C8A]">
            /
          </span>

          <span className="max-w-[220px] truncate text-[#725E57] sm:max-w-none">
            {product.name}
          </span>

        </div>

        {/* ===================================================
            PRODUCT AREA
        =================================================== */}

        <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">

          {/* =================================================
              IMAGE
          ================================================= */}

          <div className="lg:sticky lg:top-28 lg:self-start">

            <div className="relative">

              {/* Colour frame */}

              <div className="absolute -inset-3 bg-[#F2DCC5]" />

              <div className="absolute -right-3 -top-3 h-24 w-24 bg-[#D5A43A]/30" />

              <div className="absolute -bottom-3 -left-3 h-20 w-20 bg-[#8A477F]/20" />

              <div className="relative overflow-hidden border-2 border-white bg-[#F2E3D0] shadow-xl">

                <div className="aspect-square overflow-hidden bg-[#F4E8D8]">

                  {product.image ? (
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-full w-full object-cover transition-transform duration-700 ease-out hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-[8rem] text-[#7A2525]/30 transition-transform duration-700 hover:scale-105 sm:text-[10rem]">
                      {product.symbol}
                    </div>
                  )}

                </div>

                {/* Discount */}

                {product.discount > 0 && (
                  <span className="absolute left-5 top-5 bg-[#C65D3A] px-4 py-2 text-[10px] font-bold uppercase tracking-[0.15em] text-white shadow-lg">
                    {product.discount}% OFF
                  </span>
                )}

                {/* Wishlist */}

                <button
                  type="button"
                  onClick={handleWishlist}
                  className={`absolute right-5 top-5 flex h-12 w-12 items-center justify-center rounded-full bg-white/95 text-2xl shadow-lg backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:scale-105 active:scale-90 ${
                    productInWishlist
                      ? 'text-[#7A2525]'
                      : 'text-[#54244F]'
                  }`}
                  aria-label={
                    productInWishlist
                      ? `Remove ${product.name} from wishlist`
                      : `Add ${product.name} to wishlist`
                  }
                >
                  <span
                    className={`transition-transform duration-300 ${
                      productInWishlist
                        ? 'scale-110'
                        : 'scale-100'
                    }`}
                  >
                    {productInWishlist
                      ? '♥'
                      : '♡'}
                  </span>
                </button>

              </div>

            </div>

            {/* Image information */}

            <div className="mt-5 flex items-center justify-between border-b border-[#D8C3AC] pb-4 text-[9px] font-semibold uppercase tracking-[0.18em] text-[#8A6250]">

              <span>
                DwijasKalaRekha Collection
              </span>

              <span>
                {product.productId}
              </span>

            </div>

          </div>

          {/* =================================================
              PRODUCT INFORMATION
          ================================================= */}

          <div className="flex flex-col justify-center">

            {/* Product ID */}

            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#8A477F]">
              {product.productId}
            </p>

            {/* Name */}

            <h1 className="mt-4 font-serif text-4xl leading-[1.05] text-[#351B19] sm:text-5xl lg:text-6xl">
              {product.name}
            </h1>

            {/* Accent line */}

            <div className="mt-6 flex items-center gap-3">

              <span className="h-1 w-12 bg-[#C65D3A]" />

              <span className="h-1 w-5 bg-[#D5A43A]" />

              <span className="h-1 w-3 bg-[#65754A]" />

            </div>

            {/* Rating */}

            <div className="mt-6 flex flex-wrap items-center gap-3">

              {rating > 0 ? (
                <>
                  <span className="text-lg tracking-wide text-[#D5A43A]">
                    {'★'.repeat(rating)}
                    {'☆'.repeat(5 - rating)}
                  </span>

                  <span className="text-sm text-[#8A6250]">
                    {reviews}{' '}
                    {reviews === 1
                      ? 'review'
                      : 'reviews'}
                  </span>
                </>
              ) : (
                <span className="bg-[#F5E8F3] px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.15em] text-[#8A477F]">
                  New Arrival
                </span>
              )}

            </div>

            {/* Price */}

            <div className="mt-7 flex flex-wrap items-center gap-4">

              <span className="font-serif text-4xl font-bold text-[#7A2525]">
                ₹{product.price}
              </span>

              {product.mrp > product.price && (
                <span className="text-lg text-[#A9978C] line-through">
                  ₹{product.mrp}
                </span>
              )}

              {product.discount > 0 && (
                <span className="bg-[#F5DFA5] px-3 py-1.5 text-xs font-bold text-[#54244F]">
                  Save {product.discount}%
                </span>
              )}

            </div>

            {/* Stock */}

            <div className="mt-5">

              {isInStock ? (
                <div className="inline-flex items-center gap-2 bg-[#EDF2DF] px-4 py-2 text-xs font-semibold text-[#65754A]">

                  <span className="h-2 w-2 rounded-full bg-[#65754A]" />

                  In Stock

                </div>
              ) : (
                <div className="inline-flex items-center gap-2 bg-[#F8DED8] px-4 py-2 text-xs font-semibold text-[#A33A32]">

                  <span className="h-2 w-2 rounded-full bg-[#C65D3A]" />

                  Currently Unavailable

                </div>
              )}

            </div>

            {/* Description */}

            <div className="mt-7 border-y border-[#D8C3AC] py-7">

              <p className="text-sm leading-7 text-[#66534C] sm:text-base">
                {product.description ||
                  'Add a touch of traditional elegance to your festive celebrations with this beautiful rangoli design. Perfect for Diwali, pooja, and special occasions.'}
              </p>

            </div>

            {/* =================================================
                PRODUCT DETAILS
            ================================================= */}

            <div className="mt-7 grid gap-4 sm:grid-cols-2">

              <div className="border border-[#D9B89F] bg-[#FFF0E7] p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">

                <div className="flex items-center gap-3">

                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#C65D3A] text-sm text-white">
                    ✿
                  </span>

                  <div>
                    <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#9A6A58]">
                      Category
                    </p>

                    <p className="mt-1 font-semibold text-[#351B19]">
                      {product.category}
                    </p>
                  </div>

                </div>

              </div>

              <div className="border border-[#D7B4D0] bg-[#F5E8F3] p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">

                <div className="flex items-center gap-3">

                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#8A477F] text-sm text-white">
                    ◇
                  </span>

                  <div>
                    <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#8A6280]">
                      Collection
                    </p>

                    <p className="mt-1 font-semibold text-[#351B19]">
                      {product.collection}
                    </p>
                  </div>

                </div>

              </div>

            </div>

            {/* =================================================
                ACTIONS
            ================================================= */}

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">

              <button
                type="button"
                onClick={handleAddToCart}
                disabled={!isInStock}
                className="group flex-1 bg-[#7A2525] px-6 py-4 text-sm font-bold uppercase tracking-[0.12em] text-white shadow-lg shadow-[#7A2525]/15 transition-all duration-300 hover:-translate-y-1 hover:bg-[#A33A32] hover:shadow-xl active:translate-y-0 active:scale-[0.98] disabled:cursor-not-allowed disabled:bg-[#B8AAA1] disabled:shadow-none"
              >
                <span className="flex items-center justify-center gap-3">

                  {isInStock
                    ? 'Add to Cart'
                    : 'Out of Stock'}

                  {isInStock && (
                    <span className="transition-transform duration-300 group-hover:translate-x-2">
                      →
                    </span>
                  )}

                </span>
              </button>

              <button
                type="button"
                onClick={handleWishlist}
                className="border-2 border-[#8A477F] bg-[#F5E8F3] px-6 py-4 text-sm font-bold text-[#54244F] transition-all duration-300 hover:-translate-y-1 hover:bg-[#E9D5E5] active:scale-[0.98]"
              >
                {productInWishlist
                  ? '♥ Saved'
                  : '♡ Add to Wishlist'}
              </button>

            </div>

            {/* =================================================
                BRAND BENEFITS
            ================================================= */}

            <div className="mt-8 grid grid-cols-3 gap-2 sm:gap-3">

              <div className="bg-[#FFF0E7] p-4 text-center transition-transform duration-300 hover:-translate-y-1">

                <div className="text-xl text-[#C65D3A]">
                  ✿
                </div>

                <p className="mt-2 text-[9px] font-bold uppercase tracking-[0.12em] text-[#73584D]">
                  Handmade
                </p>

              </div>

              <div className="bg-[#FFF4D8] p-4 text-center transition-transform duration-300 hover:-translate-y-1">

                <div className="text-xl text-[#D5A43A]">
                  ◆
                </div>

                <p className="mt-2 text-[9px] font-bold uppercase tracking-[0.12em] text-[#73584D]">
                  Reusable
                </p>

              </div>

              <div className="bg-[#EDF2DF] p-4 text-center transition-transform duration-300 hover:-translate-y-1">

                <div className="text-xl text-[#65754A]">
                  ✓
                </div>

                <p className="mt-2 text-[9px] font-bold uppercase tracking-[0.12em] text-[#73584D]">
                  Easy Ordering
                </p>

              </div>

            </div>

          </div>

        </div>

        {/* =====================================================
            BOTTOM COLOUR BAND
        ===================================================== */}

        <div className="mt-16 overflow-hidden bg-[#54244F]">

          <div className="grid sm:grid-cols-3">

            <div className="bg-[#C65D3A] px-5 py-5 text-center">
              <p className="font-serif text-lg text-white">
                Colour
              </p>

              <p className="mt-1 text-[8px] uppercase tracking-[0.2em] text-white/70">
                Brighten your space
              </p>
            </div>

            <div className="bg-[#D5A43A] px-5 py-5 text-center">
              <p className="font-serif text-lg text-[#351B19]">
                Craft
              </p>

              <p className="mt-1 text-[8px] uppercase tracking-[0.2em] text-[#54244F]/70">
                Made with care
              </p>
            </div>

            <div className="bg-[#65754A] px-5 py-5 text-center">
              <p className="font-serif text-lg text-white">
                Tradition
              </p>

              <p className="mt-1 text-[8px] uppercase tracking-[0.2em] text-white/70">
                Inspired by India
              </p>
            </div>

          </div>

        </div>

      </div>

    </main>
  )
}

export default ProductDetails