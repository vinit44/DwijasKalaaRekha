import { useEffect, useMemo, useState } from 'react'
import ProductCard from '../components/ProductCard'
import { getProducts } from '../services/productService'

const accentStyles = [
  {
    bg: 'bg-[#FFF0E7]',
    border: 'border-[#E8B39A]',
    dot: 'bg-[#C65D3A]',
  },
  {
    bg: 'bg-[#F5E8F3]',
    border: 'border-[#D7B4D0]',
    dot: 'bg-[#8A477F]',
  },
  {
    bg: 'bg-[#FFF4D8]',
    border: 'border-[#E6CA7B]',
    dot: 'bg-[#D5A43A]',
  },
  {
    bg: 'bg-[#EDF2DF]',
    border: 'border-[#C4CEA8]',
    dot: 'bg-[#65754A]',
  },
]

function Shop() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [sortOption, setSortOption] = useState('default')

  useEffect(() => {
    async function loadProducts() {
      try {
        const data = await getProducts()
        setProducts(Array.isArray(data) ? data : [])
      } catch (error) {
        console.error(error)
        setError('Failed to load products')
      } finally {
        setLoading(false)
      }
    }

    loadProducts()
  }, [])

  const categories = [
    'All',
    ...new Set(
      products
        .map((product) => product.category)
        .filter(Boolean)
    ),
  ]

  const filteredProducts = useMemo(() => {
    const cleanSearch = searchTerm.trim().toLowerCase()

    const filtered = products.filter((product) => {
      const productName = String(product.name || '').toLowerCase()
      const productCategory = String(product.category || '')

      const matchesSearch =
        cleanSearch === '' ||
        productName.includes(cleanSearch)

      const matchesCategory =
        selectedCategory === 'All' ||
        productCategory === selectedCategory

      return matchesSearch && matchesCategory
    })

    if (sortOption === 'price-low') {
      return [...filtered].sort(
        (a, b) =>
          Number(a.price || 0) - Number(b.price || 0)
      )
    }

    if (sortOption === 'price-high') {
      return [...filtered].sort(
        (a, b) =>
          Number(b.price || 0) - Number(a.price || 0)
      )
    }

    if (sortOption === 'name') {
      return [...filtered].sort((a, b) =>
        String(a.name || '').localeCompare(
          String(b.name || '')
        )
      )
    }

    return filtered
  }, [
    products,
    searchTerm,
    selectedCategory,
    sortOption,
  ])

  const clearFilters = () => {
    setSearchTerm('')
    setSelectedCategory('All')
    setSortOption('default')
  }

  /* ================= LOADING ================= */

  if (loading) {
    return (
      <main className="min-h-screen bg-[#FFF7E8]">

        <div className="mx-auto max-w-[1400px] px-5 py-20 sm:px-8 lg:px-12">

          <div className="mx-auto max-w-2xl text-center">

            <div className="mx-auto h-3 w-36 animate-pulse bg-[#E7C98A]" />

            <div className="mx-auto mt-6 h-14 w-80 animate-pulse bg-[#E8D8C0]" />

            <div className="mx-auto mt-4 h-4 w-96 max-w-full animate-pulse bg-[#E8D8C0]" />

          </div>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">

            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="overflow-hidden bg-white"
              >
                <div className="aspect-square animate-pulse bg-[#E7D7C0]" />

                <div className="space-y-3 p-5">
                  <div className="h-3 w-2/3 animate-pulse bg-[#E7D7C0]" />
                  <div className="h-4 w-1/2 animate-pulse bg-[#E7D7C0]" />
                  <div className="h-3 w-1/3 animate-pulse bg-[#E7D7C0]" />
                </div>
              </div>
            ))}

          </div>

        </div>

      </main>
    )
  }

  /* ================= ERROR ================= */

  if (error) {
    return (
      <main className="min-h-screen bg-[#FFF7E8] px-5 py-24 sm:px-8">

        <div className="mx-auto max-w-xl bg-white px-6 py-14 text-center shadow-sm">

          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#F9DDD7] text-xl font-bold text-[#7A2525]">
            !
          </div>

          <h1 className="mt-6 font-serif text-3xl text-[#351B19]">
            Something went wrong
          </h1>

          <p className="mt-3 text-sm text-[#725E57]">
            {error}
          </p>

          <button
            type="button"
            onClick={() => window.location.reload()}
            className="mt-7 bg-[#7A2525] px-7 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-white transition-all duration-300 hover:bg-[#A33A32]"
          >
            Try Again
          </button>

        </div>

      </main>
    )
  }

  return (
    <main className="min-h-screen bg-[#FFF7E8]">

      {/* =========================================================
          COLOURFUL PAGE HEADER
      ========================================================= */}

      <section className="relative overflow-hidden bg-[#54244F] text-white">

        {/* Large decorative circles */}

        <div className="absolute -right-28 -top-32 h-96 w-96 rounded-full border border-[#F0C66B]/30" />

        <div className="absolute -right-10 -top-14 h-64 w-64 rounded-full border border-[#E5A7B5]/25" />

        <div className="absolute -bottom-32 -left-24 h-80 w-80 rounded-full border border-[#C65D3A]/30" />

        {/* Small rangoli-inspired shapes */}

        <div className="absolute left-[10%] top-[28%] hidden h-4 w-4 rotate-45 bg-[#D5A43A] lg:block" />

        <div className="absolute left-[22%] bottom-[22%] hidden h-2.5 w-2.5 rounded-full bg-[#E5A7B5] lg:block" />

        <div className="absolute right-[25%] bottom-[20%] hidden h-3 w-3 rotate-45 bg-[#C65D3A] lg:block" />

        <div className="relative mx-auto max-w-[1400px] px-5 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-24">

          <div className="grid items-end gap-10 lg:grid-cols-[1fr_auto]">

            <div className="max-w-3xl">

              <div className="flex items-center gap-4">

                <span className="h-px w-14 bg-[#F0C66B]" />

                <span className="text-[10px] font-semibold uppercase tracking-[0.4em] text-[#F4DFA9]">
                  The DwijasKalaRekha Collection
                </span>

              </div>

              <h1 className="mt-7 font-serif text-5xl leading-[0.92] text-white sm:text-6xl lg:text-8xl">
                Rangoli for
                <span className="block text-[#F0C66B]">
                  every celebration.
                </span>
              </h1>

              <p className="mt-7 max-w-2xl text-sm leading-7 text-white/80 sm:text-base">
                Discover handcrafted designs filled with colour,
                detail and the beauty of Indian tradition.
              </p>

            </div>

            {/* Decorative side block */}

            <div className="hidden lg:block">

              <div className="relative flex h-32 w-32 items-center justify-center">

                <div className="absolute inset-2 rotate-45 border border-[#F0C66B]/50" />

                <div className="absolute inset-7 rounded-full border border-[#E5A7B5]/50" />

                <div className="h-5 w-5 rotate-45 bg-[#C65D3A]" />

              </div>

            </div>

          </div>

          {/* Header tags */}

          <div className="mt-12 flex flex-wrap gap-3">

            <span className="border border-[#F0C66B]/40 bg-[#F0C66B]/10 px-4 py-2 text-[9px] font-semibold uppercase tracking-[0.2em] text-[#F5DFA5]">
              Handmade
            </span>

            <span className="border border-[#E5A7B5]/40 bg-[#E5A7B5]/10 px-4 py-2 text-[9px] font-semibold uppercase tracking-[0.2em] text-[#F4D2D9]">
              Reusable
            </span>

            <span className="border border-[#C65D3A]/40 bg-[#C65D3A]/10 px-4 py-2 text-[9px] font-semibold uppercase tracking-[0.2em] text-[#F4C5B4]">
              Floral
            </span>

          </div>

        </div>

      </section>

      {/* =========================================================
          FILTER AREA
      ========================================================= */}

      <section className="bg-[#F2DCC5] py-6">

        <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">

          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

            {/* Search */}

            <div className="relative w-full lg:max-w-xl">

              <label
                htmlFor="shop-search"
                className="sr-only"
              >
                Search rangoli
              </label>

              <input
                id="shop-search"
                type="search"
                value={searchTerm}
                onChange={(event) =>
                  setSearchTerm(event.target.value)
                }
                maxLength={60}
                placeholder="Search your favourite rangoli..."
                className="w-full border-2 border-[#D7B89A] bg-[#FFF9EF] px-5 py-3.5 pr-12 text-sm text-[#351B19] outline-none transition-all duration-300 placeholder:text-[#9A8175] focus:border-[#7A2525] focus:bg-white"
              />

              <span className="pointer-events-none absolute right-5 top-1/2 -translate-y-1/2 text-xl text-[#7A2525]">
                ⌕
              </span>

            </div>

            {/* Filters */}

            <div className="flex flex-col gap-3 sm:flex-row">

              <select
                aria-label="Filter by category"
                value={selectedCategory}
                onChange={(event) =>
                  setSelectedCategory(event.target.value)
                }
                className="appearance-none border-2 border-[#D7B89A] bg-[#FFF9EF] px-5 py-3 text-xs font-bold uppercase tracking-[0.12em] text-[#54244F] outline-none transition-all duration-300 hover:border-[#7A2525] focus:border-[#7A2525]"
              >
                {categories.map((category) => (
                  <option
                    key={category}
                    value={category}
                  >
                    {category === 'All'
                      ? 'All Categories'
                      : category}
                  </option>
                ))}
              </select>

              <select
                aria-label="Sort products"
                value={sortOption}
                onChange={(event) =>
                  setSortOption(event.target.value)
                }
                className="appearance-none border-2 border-[#D7B89A] bg-[#FFF9EF] px-5 py-3 text-xs font-bold uppercase tracking-[0.12em] text-[#54244F] outline-none transition-all duration-300 hover:border-[#7A2525] focus:border-[#7A2525]"
              >
                <option value="default">
                  Sort By
                </option>

                <option value="price-low">
                  Price: Low to High
                </option>

                <option value="price-high">
                  Price: High to Low
                </option>

                <option value="name">
                  Name: A to Z
                </option>
              </select>

            </div>

          </div>

        </div>

      </section>

      {/* =========================================================
          PRODUCT AREA
      ========================================================= */}

      <section className="relative overflow-hidden bg-[#FFF7E8] py-12 sm:py-16 lg:py-20">

        {/* Background decoration */}

        <div className="pointer-events-none absolute right-[-100px] top-20 h-72 w-72 rounded-full border border-[#D5A43A]/15" />

        <div className="pointer-events-none absolute bottom-[-150px] left-[-100px] h-80 w-80 rounded-full border border-[#8A477F]/10" />

        <div className="relative mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">

          {/* Result header */}

          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">

            <div>

              <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#8A477F]">
                Curated for you
              </p>

              <p className="mt-2 font-serif text-2xl text-[#351B19]">
                {filteredProducts.length}{' '}
                {filteredProducts.length === 1
                  ? 'design'
                  : 'designs'}
              </p>

            </div>

            {(searchTerm ||
              selectedCategory !== 'All' ||
              sortOption !== 'default') && (
              <button
                type="button"
                onClick={clearFilters}
                className="w-fit bg-[#7A2525] px-5 py-2.5 text-[9px] font-bold uppercase tracking-[0.18em] text-white transition-all duration-300 hover:bg-[#A33A32]"
              >
                Clear Filters
              </button>
            )}

          </div>

          {/* Products */}

          {filteredProducts.length > 0 ? (
            <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-4">

              {filteredProducts.map((product, index) => {

                const accent =
                  accentStyles[index % accentStyles.length]

                return (
                  <div
                    key={product.productId}
                    className="group relative"
                  >

                    {/* Colour frame */}

                    <div
                      className={`absolute -inset-2 -z-0 opacity-70 transition-all duration-500 group-hover:opacity-100 group-hover:scale-[1.015] ${accent.bg}`}
                    />

                    {/* Product number */}

                    <div className="absolute left-3 top-3 z-20 flex h-8 w-8 items-center justify-center rounded-full bg-[#54244F] text-[9px] font-bold tracking-[0.1em] text-white shadow-lg">
                      {String(index + 1).padStart(2, '0')}
                    </div>

                    {/* Accent dot */}

                    <div
                      className={`absolute right-3 top-3 z-20 h-3 w-3 rounded-full ring-4 ring-white/80 ${accent.dot}`}
                    />

                    <div className="relative z-10">
                      <ProductCard product={product} />
                    </div>

                  </div>
                )
              })}

            </div>
          ) : (
            <div className="border-2 border-dashed border-[#D6BCA2] bg-white px-6 py-20 text-center">

              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#F5E8F3] text-3xl text-[#8A477F]">
                ⌕
              </div>

              <h2 className="mt-6 font-serif text-3xl text-[#351B19]">
                No rangoli found
              </h2>

              <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-[#725E57]">
                Try another search term or explore our complete
                collection.
              </p>

              <button
                type="button"
                onClick={clearFilters}
                className="mt-7 bg-[#7A2525] px-7 py-3 text-xs font-bold uppercase tracking-[0.16em] text-white transition-all duration-300 hover:bg-[#A33A32]"
              >
                View All Designs
              </button>

            </div>
          )}

          {/* =====================================================
              BOTTOM COLOUR STRIP
          ===================================================== */}

          <div className="mt-16 overflow-hidden bg-[#54244F]">

            <div className="grid sm:grid-cols-3">

              <div className="bg-[#C65D3A] px-6 py-6 text-center">
                <p className="font-serif text-xl text-white">
                  Colour
                </p>
                <p className="mt-1 text-[9px] uppercase tracking-[0.2em] text-white/70">
                  Brighten your space
                </p>
              </div>

              <div className="bg-[#D5A43A] px-6 py-6 text-center">
                <p className="font-serif text-xl text-[#351B19]">
                  Craft
                </p>
                <p className="mt-1 text-[9px] uppercase tracking-[0.2em] text-[#54244F]/70">
                  Made with care
                </p>
              </div>

              <div className="bg-[#65754A] px-6 py-6 text-center">
                <p className="font-serif text-xl text-white">
                  Tradition
                </p>
                <p className="mt-1 text-[9px] uppercase tracking-[0.2em] text-white/70">
                  Inspired by India
                </p>
              </div>

            </div>

          </div>

        </div>

      </section>

    </main>
  )
}

export default Shop