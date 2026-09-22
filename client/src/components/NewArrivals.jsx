import products from '../../data/products'
import ProductCard from './ProductCard'

function NewArrivals() {
  const newArrivals = products.slice(4, 8)

  return (
    <section id="new-arrivals" className="bg-white px-6 py-20">
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#9a806b]">
              Fresh Designs
            </p>

            <h2 className="mt-2 text-3xl font-bold text-[#35251d] md:text-4xl">
              New Arrivals
            </h2>
          </div>

          <p className="max-w-md text-sm leading-6 text-[#6f625a]">
            Discover our latest rangoli designs created for upcoming
            celebrations and beautiful spaces.
          </p>
        </div>

        {/* Products */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {newArrivals.map((product) => (
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

export default NewArrivals