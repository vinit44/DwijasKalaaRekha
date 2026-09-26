import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useWishlist } from '../context/WishlistContext'

function ProductCard({ product }) {
  const { addToCart } = useCart()

  const {
    toggleWishlist,
    isInWishlist,
  } = useWishlist()

  function handleAddToCart() {
    addToCart(product)
  }

  function handleWishlist(event) {
    event.preventDefault()
    toggleWishlist(product)
  }

  const productInWishlist = isInWishlist(
    product.productId
  )

  return (
    <article className="group overflow-hidden rounded-3xl border border-[#eadfd5] bg-white shadow-sm transition-all duration-500 ease-out hover:-translate-y-2 hover:border-[#dbc9b8] hover:shadow-xl hover:shadow-[#6f1d1b]/10">

      {/* Product Image */}
      <Link
        to={`/product/${product.productId}`}
        className="block"
      >
        <div className="relative aspect-square overflow-hidden bg-[#f8f3ed]">

          {product.image ? (
            <img
              src={product.image}
              alt={product.name}
              className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-7xl text-[#8b2f2b]/40 transition-transform duration-700 ease-out group-hover:scale-110">
              {product.symbol}
            </div>
          )}

          {/* Image Overlay */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#3d1719]/10 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

          {/* Discount */}
          {product.discount > 0 && (
            <span className="absolute left-4 top-4 rounded-full bg-[#6f1d1b] px-3.5 py-1.5 text-xs font-semibold tracking-wide text-white shadow-md transition-transform duration-300 group-hover:scale-105">
              {product.discount}% OFF
            </span>
          )}

          {/* Wishlist */}
          <button
            type="button"
            onClick={handleWishlist}
            className={`absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-xl shadow-md backdrop-blur-sm transition-all duration-300 hover:scale-110 hover:bg-white active:scale-90 ${
              productInWishlist
                ? 'text-[#6f1d1b]'
                : 'text-[#49352a]'
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

          {/* View Product Hint */}
          <div className="pointer-events-none absolute bottom-4 left-1/2 hidden -translate-x-1/2 translate-y-3 rounded-full bg-white/95 px-4 py-2 text-xs font-semibold text-[#6f1d1b] opacity-0 shadow-md backdrop-blur-sm transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 sm:block">
            View Product
          </div>
        </div>
      </Link>

      {/* Product Information */}
      <div className="p-5">

        {/* Product ID */}
        <p className="text-xs font-medium uppercase tracking-[0.16em] text-[#9a806b]">
          {product.productId}
        </p>

        {/* Product Name */}
        <Link
          to={`/product/${product.productId}`}
          className="block"
        >
          <h3 className="mt-2 line-clamp-2 min-h-[3.5rem] text-lg font-semibold leading-7 text-[#35251d] transition-colors duration-300 hover:text-[#6f1d1b]">
            {product.name}
          </h3>
        </Link>

        {/* Rating */}
        <div className="mt-2 flex min-h-5 items-center gap-2">
          {product.rating ? (
            <>
              <span className="text-sm tracking-wide text-[#b7791f]">
                {'★'.repeat(
                  Math.max(
                    0,
                    Math.min(
                      5,
                      Number(product.rating)
                    )
                  )
                )}
              </span>

              <span className="text-xs text-[#9a806b]">
                ({product.reviews || 0})
              </span>
            </>
          ) : (
            <span className="text-xs text-[#9a806b]">
              New arrival
            </span>
          )}
        </div>

        {/* Price */}
        <div className="mt-4 flex items-baseline gap-3">
          <span className="text-2xl font-bold text-[#6f1d1b]">
            ₹{product.price}
          </span>

          {product.mrp > product.price && (
            <span className="text-sm text-gray-400 line-through">
              ₹{product.mrp}
            </span>
          )}
        </div>

        {/* Add to Cart */}
        <button
          type="button"
          onClick={handleAddToCart}
          className="mt-5 w-full rounded-full bg-[#6f1d1b] px-5 py-3.5 text-sm font-semibold text-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#581716] hover:shadow-lg hover:shadow-[#6f1d1b]/15 active:translate-y-0 active:scale-[0.98]"
        >
          Add to Cart
        </button>
      </div>
    </article>
  )
}

export default ProductCard