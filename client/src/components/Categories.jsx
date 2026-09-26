import { Link } from 'react-router-dom'

const categories = [
  {
    number: '01',
    name: 'Floral Rangoli',
    description: 'Layered floral designs for festive corners.',
    image:
      'https://www.themaevastore.com/cdn/shop/files/240901796_902631060383612_6156662634585683954_n_902631063716945.jpg?v=1755602538&width=1000',
    accent: '#C99A4A',
  },
  {
    number: '02',
    name: 'Traditional',
    description: 'Classic patterns inspired by Indian celebrations.',
    image:
      'https://www.themaevastore.com/cdn/shop/articles/banner1_e20ceb3e-8313-4814-aba9-893f62488c15.jpg?v=1761715247',
    accent: '#B85C38',
  },
  {
    number: '03',
    name: 'Festive',
    description: 'Colourful pieces made for special occasions.',
    image:
      'https://desifavors.com/cdn/shop/products/fabric-rangoli-mat-red.jpg',
    accent: '#C9827A',
  },
  {
    number: '04',
    name: 'Decorative',
    description: 'Statement designs that add warmth to your space.',
    image:
      'https://shagunartsandcrafts.com/wp-content/uploads/2023/07/22982957-a696-4bf4-bd4d-ba643194e108-1.jpeg',
    accent: '#75805A',
  },
]

function Categories() {
  return (
    <section
      id="collections"
      className="relative overflow-hidden bg-[#F8F1E5] py-20 sm:py-24 lg:py-28"
    >
      {/* Background details */}
      <div className="pointer-events-none absolute -right-24 top-16 h-72 w-72 rounded-full border border-[#C99A4A]/15" />

      <div className="pointer-events-none absolute -left-32 bottom-10 h-80 w-80 rounded-full border border-[#641C1C]/10" />

      <div className="relative mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">

        {/* ================= HEADING ================= */}

        <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end lg:mb-16">

          <div className="max-w-2xl">

            <div className="mb-5 flex items-center gap-3">
              <span className="h-px w-10 bg-[#C99A4A]" />

              <span className="text-[10px] font-semibold uppercase tracking-[0.35em] text-[#8A6250]">
                Our Collections
              </span>
            </div>

            <h2 className="font-serif text-4xl leading-tight text-[#3B211B] sm:text-5xl lg:text-6xl">
              Made to bring
              <span className="block text-[#7A2525]">
                colour home.
              </span>
            </h2>

          </div>

          <div className="max-w-sm md:pb-1">
            <p className="text-sm leading-7 text-[#6D5952] sm:text-base">
              Explore handcrafted rangoli designs created to make
              everyday spaces feel festive, warm and beautiful.
            </p>
          </div>

        </div>

        {/* ================= CATEGORY GRID ================= */}

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

          {categories.map((category, index) => (
            <Link
              key={category.name}
              to="/shop"
              className="group relative overflow-hidden bg-[#2B1110] shadow-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl"
              style={{
                animationDelay: `${index * 100}ms`,
              }}
            >

              {/* Image */}
              <div className="relative aspect-[4/5] overflow-hidden">

                <img
                  src={category.image}
                  alt={category.name}
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  onError={(event) => {
                    event.currentTarget.style.display = 'none'
                  }}
                />

                {/* Image shade */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#21100d] via-[#21100d]/20 to-transparent opacity-85 transition-opacity duration-500 group-hover:opacity-95" />

                {/* Number */}
                <span className="absolute left-5 top-5 text-[10px] font-semibold tracking-[0.25em] text-white/70">
                  {category.number}
                </span>

                {/* Accent line */}
                <span
                  className="absolute right-5 top-5 h-8 w-px opacity-80"
                  style={{ backgroundColor: category.accent }}
                />

                {/* Bottom content */}
                <div className="absolute inset-x-0 bottom-0 p-6">

                  <div className="mb-3 h-px w-8 transition-all duration-500 group-hover:w-14"
                    style={{ backgroundColor: category.accent }}
                  />

                  <h3 className="font-serif text-2xl text-white">
                    {category.name}
                  </h3>

                  <p className="mt-2 max-w-[220px] text-xs leading-5 text-white/70">
                    {category.description}
                  </p>

                  <div className="mt-5 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#f1d19a]">
                    Explore
                    <span className="transition-transform duration-300 group-hover:translate-x-2">
                      →
                    </span>
                  </div>

                </div>

              </div>

              {/* Bottom colour strip */}
              <div
                className="h-1 w-full transition-all duration-500 group-hover:h-2"
                style={{ backgroundColor: category.accent }}
              />

            </Link>
          ))}

        </div>

        {/* ================= BOTTOM STATEMENT ================= */}

        <div className="mt-14 flex flex-col gap-5 border-t border-[#D8C5AE] pt-7 sm:flex-row sm:items-center sm:justify-between">

          <p className="font-serif text-lg text-[#5C3029]">
            Every piece carries a little celebration.
          </p>

          <Link
            to="/shop"
            className="group inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#641C1C]"
          >
            View all designs

            <span className="flex h-8 w-8 items-center justify-center border border-[#C99A4A] transition-all duration-300 group-hover:bg-[#641C1C] group-hover:text-white">
              →
            </span>
          </Link>

        </div>

      </div>
    </section>
  )
}

export default Categories