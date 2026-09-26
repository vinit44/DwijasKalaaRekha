import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getProducts } from '../services/productService'
import ProductCard from './ProductCard'

function NewArrivals() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function loadProducts() {
      try {
        setLoading(true)

        const data = await getProducts()

        const sortedProducts = Array.isArray(data)
          ? [...data]
              .sort(
                (a, b) =>
                  new Date(b.createdAt || 0) -
                  new Date(a.createdAt || 0)
              )
              .slice(0, 4)
          : []

        setProducts(sortedProducts)
      } catch (err) {
        console.error(err)
        setError('Unable to load new arrivals right now.')
      } finally {
        setLoading(false)
      }
    }

    loadProducts()
  }, [])

  return (
    <section className="relative overflow-hidden bg-[#FFF9F0] py-20 sm:py-24 lg:py-28">

      {/* ================= DECORATIVE BACKGROUND ================= */}

      <div className="pointer-events-none absolute right-[-100px] top-20 h-72 w-72 rounded-full border border-[#C99A4A]/15" />

      <div className="pointer-events-none absolute bottom-[-120px] left-[-80px] h-80 w-80 rounded-full border border-[#B85C38]/10" />

      <div className="pointer-events-none absolute right-[14%] top-[18%] hidden h-2 w-2 rounded-full bg-[#C99A4A]/60 lg:block" />

      <div className="relative mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">

        {/* ================= HEADER ================= */}

        <div className="mb-12 grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end lg:mb-16">

          <div>

            <div className="mb-5 flex items-center gap-3">

              <span className="h-px w-10 bg-[#B85C38]" />

              <span className="text-[10px] font-semibold uppercase tracking-[0.35em] text-[#8A6250]">
                Just arrived
              </span>

            </div>

            <h2 className="font-serif text-4xl leading-tight text-[#321916] sm:text-5xl lg:text-6xl">
              New
              <span className="text-[#641C1C]">
                {' '}Arrivals
              </span>
            </h2>

            <p className="mt-4 max-w-xl text-sm leading-7 text-[#6C554D] sm:text-base">
              Fresh designs made to add a little more colour,
              character and celebration to your home.
            </p>

          </div>

          <Link
            to="/shop"
            className="group inline-flex w-fit items-center gap-3 border-b border-[#C99A4A] pb-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#641C1C] transition-all duration-300 hover:border-[#641C1C]"
          >
            Discover collection

            <span className="transition-transform duration-300 group-hover:translate-x-2">
              →
            </span>
          </Link>

        </div>

        {/* ================= LOADING ================= */}

        {loading && (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">

            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="overflow-hidden bg-[#F4E8D8]"
              >

                <div className="aspect-square animate-pulse bg-[#E2CFB7]" />

                <div className="space-y-3 p-5">

                  <div className="h-3 w-2/3 animate-pulse bg-[#E2CFB7]" />

                  <div className="h-4 w-1/2 animate-pulse bg-[#E2CFB7]" />

                  <div className="h-3 w-1/3 animate-pulse bg-[#E2CFB7]" />

                </div>

              </div>
            ))}

          </div>
        )}

        {/* ================= ERROR ================= */}

        {!loading && error && (
          <div className="border border-[#C99A4A]/40 bg-[#F4E8D8] px-6 py-10 text-center">

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

        {/* ================= EMPTY ================= */}

        {!loading && !error && products.length === 0 && (
          <div className="border border-[#D8C5AE] bg-[#F4E8D8] px-6 py-12 text-center">

            <p className="font-serif text-2xl text-[#321916]">
              New designs are on their way.
            </p>

            <p className="mt-2 text-sm text-[#6C554D]">
              Explore our shop to see the current collection.
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

        {/* ================= PRODUCTS ================= */}

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

                {/* New badge */}
                <div className="pointer-events-none absolute right-4 top-4 z-10 bg-[#641C1C] px-3 py-1.5 text-[9px] font-semibold uppercase tracking-[0.18em] text-[#FFF4DF] shadow-lg">
                  New
                </div>

                <ProductCard product={product} />

              </div>
            ))}

          </div>
        )}

        {/* ================= BOTTOM MESSAGE ================= */}

        {!loading && products.length > 0 && (
          <div className="mt-12 border-t border-[#E0CFBA] pt-7">

            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

              <div>
                <p className="font-serif text-lg text-[#5C3029]">
                  New season. New corners to decorate.
                </p>

                <p className="mt-1 text-xs text-[#80685D]">
                  Discover handcrafted designs made for everyday celebrations.
                </p>
              </div>

              <div className="flex items-center gap-4">

                <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#8A6250]">
                  Handmade
                </span>

                <span className="h-1 w-1 rounded-full bg-[#C99A4A]" />

                <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#8A6250]">
                  Reusable
                </span>

              </div>

            </div>

          </div>
        )}

      </div>
    </section>
  )
}

export default NewArrivals