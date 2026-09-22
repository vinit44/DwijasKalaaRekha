import { Link } from 'react-router-dom'

function ProductCard({ product }) {
  return (
    <article className="group overflow-hidden rounded-3xl border border-[#eadfd5] bg-white transition duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-[#6f1d1b]/10">

      {/* Product Image */}
      <Link to={`/product/${product.productId}`}>
        <div className="relative aspect-square overflow-hidden bg-[#f8f3ed]">

          <div className="flex h-full items-center justify-center text-7xl text-[#8b2f2b]/40 transition duration-500 group-hover:scale-110">
            {product.symbol}
          </div>

          {product.discount && (
            <span className="absolute left-4 top-4 rounded-full bg-[#6f1d1b] px-3 py-1 text-xs font-semibold text-white">
              {product.discount}% OFF
            </span>
          )}

          <button
            type="button"
            onClick={(event) => event.preventDefault()}
            className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-[#6f1d1b] shadow-sm transition hover:bg-white"
            aria-label={`Add ${product.name} to wishlist`}
          >
            ♡
          </button>

        </div>
      </Link>

      {/* Product Information */}
      <div className="p-5">

        <p className="text-xs font-medium uppercase tracking-wider text-[#9a806b]">
          {product.productId}
        </p>

        <Link to={`/product/${product.productId}`}>
          <h3 className="mt-2 text-lg font-semibold text-[#35251d] transition hover:text-[#6f1d1b]">
            {product.name}
          </h3>
        </Link>

        <div className="mt-2 flex items-center gap-2">
          <span className="text-sm tracking-wide text-[#b7791f]">
            {'★'.repeat(product.rating)}
          </span>

          <span className="text-xs text-[#9a806b]">
            ({product.reviews})
          </span>
        </div>

        <div className="mt-4 flex items-center gap-3">
          <span className="text-xl font-bold text-[#6f1d1b]">
            ₹{product.price}
          </span>

          {product.mrp > product.price && (
            <span className="text-sm text-gray-400 line-through">
              ₹{product.mrp}
            </span>
          )}
        </div>

        <button
          type="button"
          className="mt-5 w-full rounded-full bg-[#6f1d1b] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#581716]"
        >
          Add to Cart
        </button>

      </div>
    </article>
  )
}

export default ProductCard