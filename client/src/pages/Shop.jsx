import { useEffect, useMemo, useState } from 'react'
import ProductCard from '../components/ProductCard'
import { getProducts } from '../services/productService'

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
        setProducts(data)
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
    ...new Set(products.map((product) => product.category)),
  ]

  const filteredProducts = useMemo(() => {
    const filtered = products.filter((product) => {
      const matchesSearch = product.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase())

      const matchesCategory =
        selectedCategory === 'All' ||
        product.category === selectedCategory

      return matchesSearch && matchesCategory
    })

    if (sortOption === 'price-low') {
      return [...filtered].sort((a, b) => a.price - b.price)
    }

    if (sortOption === 'price-high') {
      return [...filtered].sort((a, b) => b.price - a.price)
    }

    if (sortOption === 'name') {
      return [...filtered].sort((a, b) =>
        a.name.localeCompare(b.name)
      )
    }

    return filtered
  }, [products, searchTerm, selectedCategory, sortOption])

  if (loading) {
    return (
      <main className="min-h-screen bg-[#faf7f2] px-6 py-20">
        <div className="mx-auto max-w-7xl text-center">
          <p className="text-[#6f625a]">
            Loading rangoli...
          </p>
        </div>
      </main>
    )
  }

  if (error) {
    return (
      <main className="min-h-screen bg-[#faf7f2] px-6 py-20">
        <div className="mx-auto max-w-7xl text-center">
          <p className="text-[#6f1d1b]">
            {error}
          </p>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-[#faf7f2] px-6 py-12">
      <div className="mx-auto max-w-7xl">

        {/* Page Header */}
        <div className="mb-10">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#9a806b]">
            Our Collection
          </p>

          <h1 className="mt-2 text-4xl font-bold text-[#35251d]">
            Shop Rangoli
          </h1>

          <p className="mt-3 max-w-2xl text-[#6f625a]">
            Explore our collection of traditional and premium rangoli designs.
          </p>
        </div>

        {/* Search + Filters */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center">

          {/* Search */}
          <input
            type="text"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder="Search rangoli..."
            className="w-full rounded-full border border-[#eadfd5] bg-white px-5 py-3 text-sm text-[#35251d] outline-none transition placeholder:text-[#a99a8e] focus:border-[#6f1d1b] sm:max-w-md"
          />

          {/* Category Filter */}
          <select
            value={selectedCategory}
            onChange={(event) => setSelectedCategory(event.target.value)}
            className="rounded-full border border-[#eadfd5] bg-white px-5 py-3 text-sm text-[#35251d] outline-none focus:border-[#6f1d1b]"
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category === 'All'
                  ? 'All Categories'
                  : category}
              </option>
            ))}
          </select>

          {/* Sort Filter */}
          <select
            value={sortOption}
            onChange={(event) => setSortOption(event.target.value)}
            className="rounded-full border border-[#eadfd5] bg-white px-5 py-3 text-sm text-[#35251d] outline-none focus:border-[#6f1d1b]"
          >
            <option value="default">Sort By</option>

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

        {/* Product Count */}
        <div className="mb-6 text-sm text-[#6f625a]">
          Showing{' '}
          <span className="font-semibold text-[#35251d]">
            {filteredProducts.length}
          </span>{' '}
          products
        </div>

        {/* Products */}
        {filteredProducts.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.productId}
                product={product}
              />
            ))}
          </div>
        ) : (
          <div className="rounded-3xl border border-[#eadfd5] bg-white px-6 py-16 text-center">

            <div className="text-5xl">
              🔍
            </div>

            <h2 className="mt-4 text-2xl font-semibold text-[#35251d]">
              No products found
            </h2>

            <p className="mt-2 text-[#6f625a]">
              Try searching with a different name.
            </p>

          </div>
        )}

      </div>
    </main>
  )
}

export default Shop