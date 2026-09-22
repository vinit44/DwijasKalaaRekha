import products from '../../data/products'
import ProductCard from './ProductCard'

function BestSellers() {
  const bestSellers = products.slice(0, 4)

  return (
    <section id="shop" className="bg-[#faf7f2] px-6 py-20">
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#9a806b]">
              Customer Favorites
            </p>

            <h2 className="mt-2 text-3xl font-bold text-[#35251d] md:text-4xl">
              Best Sellers
            </h2>
          </div>

          <p className="max-w-md text-sm leading-6 text-[#6f625a]">
            Explore the rangoli designs loved by our customers for festivals,
            pooja, and special occasions.
          </p>
        </div>

        {/* Products */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {bestSellers.map((product) => (
            <ProductCard
              key={product.productId}
              product={product}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default BestSellers