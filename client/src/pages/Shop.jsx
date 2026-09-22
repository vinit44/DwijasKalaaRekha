import products from '../../data/products'
import ProductCard from '../components/ProductCard'

function Shop() {
  return (
    <main className="min-h-screen bg-[#faf7f2]">

      {/* Page Header */}
      <section className="border-b border-[#eadfd5] bg-[#f4ede5]">
        <div className="mx-auto max-w-7xl px-6 py-16 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#9a806b]">
            Explore Our Collection
          </p>

          <h1 className="mt-3 text-4xl font-bold text-[#35251d] md:text-5xl">
            Shop Rangoli
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-[#6f625a] md:text-base">
            Discover handcrafted rangoli designs created to bring beauty,
            tradition, and elegance to every celebration.
          </p>
        </div>
      </section>

      {/* Shop Content */}
      <section className="mx-auto max-w-7xl px-6 py-12">
        <div className="flex flex-col gap-8 lg:flex-row">

          {/* Filters */}
          <aside className="w-full rounded-2xl border border-[#eadfd5] bg-white p-6 lg:w-64">
            <h2 className="text-lg font-semibold text-[#35251d]">
              Filters
            </h2>

            <div className="mt-6">
              <p className="text-sm font-semibold text-[#6f1d1b]">
                Category
              </p>

              <div className="mt-4 space-y-3 text-sm text-[#6f625a]">
                <label className="flex items-center gap-3">
                  <input type="checkbox" />
                  All Rangoli
                </label>

                <label className="flex items-center gap-3">
                  <input type="checkbox" />
                  Diwali
                </label>

                <label className="flex items-center gap-3">
                  <input type="checkbox" />
                  Floral
                </label>

                <label className="flex items-center gap-3">
                  <input type="checkbox" />
                  Peacock
                </label>

                <label className="flex items-center gap-3">
                  <input type="checkbox" />
                  Pooja
                </label>
              </div>
            </div>

            <div className="mt-8">
              <p className="text-sm font-semibold text-[#6f1d1b]">
                Price
              </p>

              <div className="mt-4 space-y-3 text-sm text-[#6f625a]">
                <label className="flex items-center gap-3">
                  <input type="checkbox" />
                  Under ₹400
                </label>

                <label className="flex items-center gap-3">
                  <input type="checkbox" />
                  ₹400 – ₹600
                </label>

                <label className="flex items-center gap-3">
                  <input type="checkbox" />
                  ₹600 – ₹800
                </label>

                <label className="flex items-center gap-3">
                  <input type="checkbox" />
                  Above ₹800
                </label>
              </div>
            </div>
          </aside>

          {/* Products */}
          <div className="flex-1">

            {/* Top Bar */}
            <div className="mb-6 flex items-center justify-between">
              <p className="text-sm text-[#6f625a]">
                Showing{' '}
                <span className="font-semibold">
                  {products.length}
                </span>{' '}
                products
              </p>

              <select
                className="rounded-full border border-[#eadfd5] bg-white px-4 py-2 text-sm text-[#35251d] outline-none"
                defaultValue="featured"
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="newest">Newest</option>
              </select>
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {products.map((product) => (
                <ProductCard
                  key={product.productId}
                  product={product}
                />
              ))}
            </div>

          </div>
        </div>
      </section>

    </main>
  )
}

export default Shop