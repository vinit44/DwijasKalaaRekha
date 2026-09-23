import { useEffect, useState } from 'react'
import ProductCard from './ProductCard'
import { getProducts } from '../services/productService'

function BestSellers() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadProducts() {
      try {
        const data = await getProducts()
        setProducts(data)
      } catch (error) {
        console.error('Failed to load best sellers:', error)
      } finally {
        setLoading(false)
      }
    }

    loadProducts()
  }, [])

  const bestSellers = products.slice(0, 4)

  if (loading) {
    return (
      <section id="shop" className="bg-[#faf7f2] px-6 py-20">
        <div className="mx-auto max-w-7xl text-center">
          <p className="text-[#6f625a]">
            Loading best sellers...
          </p>
        </div>
      </section>
    )
  }

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
        {bestSellers.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {bestSellers.map((product) => (
              <ProductCard
                key={product.productId}
                product={product}
              />
            ))}
          </div>
        ) : (
          <div className="rounded-3xl border border-[#eadfd5] bg-white px-6 py-12 text-center">
            <p className="text-[#6f625a]">
              No products available.
            </p>
          </div>
        )}

      </div>
    </section>
  )
}

export default BestSellers