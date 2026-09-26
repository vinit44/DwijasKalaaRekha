import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getProducts } from '../services/productService'
import ProductCard from './ProductCard'

function BestSellers() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function loadProducts() {
      try {
        setLoading(true)
        const data = await getProducts()
        setProducts(Array.isArray(data) ? data.slice(0, 4) : [])
      } catch (err) {
        console.error(err)
        setError('Unable to load products right now.')
      } finally {
        setLoading(false)
      }
    }

    loadProducts()
  }, [])

  return (
    <section className="relative overflow-hidden bg-[#E9D8C3] py-20 sm:py-24 lg:py-28">

      {/* Decorative background */}
      <div className="pointer-events-none absolute -left-28 top-20 h-72 w-72 rounded-full border border-[#641C1C]/10" />

      <div className="pointer-events-none absolute -right-20 bottom-10 h-80 w-80 rounded-full border border-[#C99A4A]/20" />

      <div className="relative mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">

        {/* ================= HEADER ================= */}

        <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between lg:mb-16">

          <div>

            <div className="mb-5 flex items-center gap-3">
              <span className="h-px w-10 bg-[#641C1C]" />

              <span className="text-[10px] font-semibold uppercase tracking-[0.35em] text-[#7A5146]">
                Customer favourites
              </span>
            </div>

            <h2 className="font-serif text-4xl leading-tight text-[#321916] sm:text-5xl lg:text-6xl">
              Best
              <span className="text-[#7A2525]">
                {' '}Sellers
              </span>
            </h2>

            <p className="mt-4 max-w-xl text-sm leading-7 text-[#6C554D] sm:text-base">
              Designs that bring colour, detail and a festive touch
              to the spaces you love.
            </p>

          </div>

          <Link
            to="/shop"
            className="group inline-flex w-fit items-center gap-3 border-b border-[#8C6A54] pb-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#641C1C] transition-all duration-300 hover:border-[#641C1C]"
          >
            Explore all

            <span className="transition-transform duration-300 group-hover:translate-x-2">
              →
            </span>
          </Link>

        </div>

        {/* ================= PRODUCTS ================= */}

        {loading && (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">

            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="overflow-hidden bg-[#F8F1E5]"
              >
                <div className="aspect-square animate-pulse bg-[#D9C3AA]" />

                <div className="space-y-3 p-5">
                  <div className="h-3 w-2/3 animate-pulse bg-[#D9C3AA]" />
                  <div className="h-4 w-1/2 animate-pulse bg-[#D9C3AA]" />
                  <div className="h-3 w-1/3 animate-pulse bg-[#D9C3AA]" />
                </div>
              </div>
            ))}

          </div>
        )}

        {!loading && error && (
          <div className="border border-[#C99A4A]/40 bg-[#F8F1E5] px-6 py-10 text-center">
            <p className="text-sm text-[#641C1C]">
              {error}
            </p>

            <Link
              to="/shop"
              className="mt-5 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.15em] text-[#641C1C]"
            >
              Browse Shop
              <span>→</span>
            </Link>
          </div>
        )}

        {!loading && !error && products.length === 0 && (
          <div className="border border-[#C99A4A]/40 bg-[#F8F1E5] px-6 py-12 text-center">
            <p className="font-serif text-2xl text-[#321916]">
              New designs are coming soon.
            </p>

            <p className="mt-2 text-sm text-[#6C554D]">
              Explore the shop for our latest collection.
            </p>

            <Link
              to="/shop"
              className="mt-6 inline-flex items-center gap-3 bg-[#641C1C] px-6 py-3 text-xs font-semibold uppercase tracking-[0.15em] text-white transition-all duration-300 hover:bg-[#8A3028]"
            >
              Visit Shop
              <span>→</span>
            </Link>
          </div>
        )}

        {!loading && !error && products.length > 0 && (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">

            {products.map((product, index) => (
              <div
                key={product._id || product.productId}
                className="group relative"
                style={{
                  animationDelay: `${index * 120}ms`,
                }}
              >

                {/* Product number */}
                <div className="pointer-events-none absolute left-4 top-4 z-10 flex h-8 w-8 items-center justify-center border border-white/60 bg-[#2B1110]/60 text-[9px] font-semibold tracking-[0.15em] text-white backdrop-blur-sm">
                  {String(index + 1).padStart(2, '0')}
                </div>

                <ProductCard product={product} />

              </div>
            ))}

          </div>
        )}

        {/* ================= BOTTOM STRIP ================= */}

        {!loading && products.length > 0 && (
          <div className="mt-12 flex flex-col gap-4 border-t border-[#C7AD93] pt-6 sm:flex-row sm:items-center sm:justify-between">

            <div className="flex flex-wrap items-center gap-x-5 gap-y-2">

              <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#73584D]">
                Handmade
              </span>

              <span className="h-1 w-1 rounded-full bg-[#C99A4A]" />

              <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#73584D]">
                Reusable
              </span>

              <span className="h-1 w-1 rounded-full bg-[#B85C38]" />

              <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#73584D]">
                Made with care
              </span>

            </div>

            <p className="font-serif text-base italic text-[#7A2525]">
              A little colour goes a long way.
            </p>

          </div>
        )}

      </div>
    </section>
  )
}

export default BestSellers