import { useEffect, useState } from 'react'
import ProductCard from './ProductCard'
import { getProducts } from '../services/productService'

function NewArrivals() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadProducts() {
      try {
        const data = await getProducts()
        setProducts(data)
      } catch (error) {
        console.error('Failed to load new arrivals:', error)
      } finally {
        setLoading(false)
      }
    }

    loadProducts()
  }, [])

  const newArrivals = [...products]
    .sort(
      (a, b) =>
        new Date(b.createdAt) - new Date(a.createdAt)
    )
    .slice(0, 4)

  if (loading) {
    return (
      <section id="new-arrivals" className="bg-white px-6 py-20">
        <div className="mx-auto max-w-7xl text-center">
          <p className="text-[#6f625a]">
            Loading new arrivals...
          </p>
        </div>
      </section>
    )
  }

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
        {newArrivals.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {newArrivals.map((product) => (
              <ProductCard
                key={product.productId}
                product={product}
              />
            ))}
          </div>
        ) : (
          <div className="rounded-3xl border border-[#eadfd5] bg-[#faf7f2] px-6 py-12 text-center">
            <p className="text-[#6f625a]">
              New arrivals will appear here soon.
            </p>
          </div>
        )}

      </div>
    </section>
  )
}

export default NewArrivals