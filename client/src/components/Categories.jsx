const categories = [
  {
    id: 1,
    name: 'Diwali Collection',
    description: 'Festive designs for Diwali',
    symbol: '✦',
  },
  {
    id: 2,
    name: 'Floral Designs',
    description: 'Elegant floral patterns',
    symbol: '✿',
  },
  {
    id: 3,
    name: 'Peacock Designs',
    description: 'Traditional peacock artwork',
    symbol: '◈',
  },
  {
    id: 4,
    name: 'Pooja Rangoli',
    description: 'Beautiful designs for pooja',
    symbol: '❋',
  },
]

function Categories() {
  return (
    <section
      id="collections"
      className="bg-[#fffdf9] px-5 py-20 sm:px-6 lg:py-28"
    >
      <div className="mx-auto max-w-7xl">

        {/* Section Heading */}
        <div className="mx-auto max-w-2xl text-center">

          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#8b2f2b]">
            Our Collections
          </p>

          <h2 className="mt-4 text-3xl font-bold tracking-tight text-[#35251d] sm:text-4xl lg:text-5xl">
            Designs for Every Celebration
          </h2>

          <p className="mt-5 text-base leading-7 text-[#705d50]">
            Explore our carefully selected rangoli collections,
            created to bring beauty and tradition into your space.
          </p>

        </div>

        {/* Categories */}
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

          {categories.map((category) => (
            <div
              key={category.id}
              className="group cursor-pointer rounded-3xl border border-[#eadfd5] bg-[#f8f3ed] p-8 text-center transition duration-300 hover:-translate-y-2 hover:border-[#c7a78e] hover:shadow-xl hover:shadow-[#6f1d1b]/10"
            >

              {/* Symbol */}
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-[#c7a78e] bg-[#fffdf9] text-3xl text-[#6f1d1b] transition duration-300 group-hover:rotate-6 group-hover:scale-110">
                {category.symbol}
              </div>

              {/* Name */}
              <h3 className="mt-6 text-lg font-semibold text-[#35251d]">
                {category.name}
              </h3>

              {/* Description */}
              <p className="mt-2 text-sm leading-6 text-[#806c5d]">
                {category.description}
              </p>

              {/* Link */}
              <div className="mt-5 text-sm font-semibold text-[#6f1d1b]">
                Explore →
              </div>

            </div>
          ))}

        </div>

      </div>
    </section>
  )
}

export default Categories