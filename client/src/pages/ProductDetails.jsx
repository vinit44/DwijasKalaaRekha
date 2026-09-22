import { useParams } from 'react-router-dom'
import products from '../../data/products'
import { useCart } from '../context/CartContext'
function ProductDetails() {
  const { id } = useParams()
  const { addToCart } = useCart()

  const product = products.find(
    (item) => item.productId === id
  )

  if (!product) {
    return (
      <main className="min-h-screen bg-[#faf7f2] px-6 py-20">
        <div className="mx-auto max-w-7xl text-center">
          <h1 className="text-3xl font-bold text-[#35251d]">
            Product Not Found
          </h1>

          <p className="mt-3 text-[#6f625a]">
            The product you are looking for does not exist.
          </p>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-[#faf7f2] px-6 py-20">
      <div className="mx-auto max-w-7xl">

        <div className="grid gap-10 lg:grid-cols-2">

          {/* Product Image */}
          <div className="flex aspect-square items-center justify-center rounded-3xl bg-[#f4ede5]">
            <span className="text-[10rem] text-[#8b2f2b]/40">
              {product.symbol}
            </span>
          </div>

          {/* Product Information */}
          <div className="flex flex-col justify-center">

            <p className="text-sm font-medium uppercase tracking-[0.2em] text-[#9a806b]">
              {product.productId}
            </p>

            <h1 className="mt-3 text-4xl font-bold text-[#35251d] md:text-5xl">
              {product.name}
            </h1>

            {/* Rating */}
            <div className="mt-5 flex items-center gap-3">
              <span className="text-lg tracking-wide text-[#b7791f]">
                {'★'.repeat(product.rating)}
              </span>

              <span className="text-sm text-[#9a806b]">
                ({product.reviews} reviews)
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
                <span className="rounded-full bg-[#6f1d1b] px-3 py-1 text-xs font-semibold text-white">
                  {product.discount}% OFF
                </span>
              )}
            </div>

            {/* Description */}
            <p className="mt-6 leading-7 text-[#6f625a]">
              Bring traditional beauty and festive elegance to your space
              with this beautifully designed rangoli. Perfect for festivals,
              pooja, entrances, and special occasions.
            </p>

            {/* Product Information */}
            <div className="mt-8 grid grid-cols-2 gap-4">
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

            {/* Add To Cart */}
           <button
  type="button"
  onClick={() => addToCart(product)}
  className="mt-8 rounded-full bg-[#6f1d1b] px-6 py-4 text-sm font-semibold text-white transition hover:bg-[#581716]"
>
  Add to Cart
</button>

          </div>
        </div>
      </div>
    </main>
  )
}

export default ProductDetails