import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const heroImages = [
  {
    src: 'https://www.themaevastore.com/cdn/shop/files/240901796_902631060383612_6156662634585683954_n_902631063716945.jpg?v=1755602538&width=1800',
    alt: 'Green floral fabric rangoli with layered petals and embellishments',
  },
  {
    src: 'https://www.themaevastore.com/cdn/shop/articles/banner1_e20ceb3e-8313-4814-aba9-893f62488c15.jpg?v=1761715247',
    alt: 'Red and gold reusable floral rangoli',
  },
  {
    src: 'https://desifavors.com/cdn/shop/products/fabric-rangoli-mat-red.jpg',
    alt: 'Red flower-shaped fabric rangoli mat',
  },
  {
    src: 'https://shagunartsandcrafts.com/wp-content/uploads/2023/07/22982957-a696-4bf4-bd4d-ba643194e108-1.jpeg',
    alt: 'Colorful handmade floral rangoli mat',
  },
]

function Hero() {
  const [activeImage, setActiveImage] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveImage((current) => (current + 1) % heroImages.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  return (
    <section
      id="home"
      className="relative min-h-[calc(100vh-76px)] overflow-hidden bg-[#2b1110] text-white"
    >
      {/* ================= BACKGROUND SLIDESHOW ================= */}
      <div className="absolute inset-0">

        {heroImages.map((image, index) => (
          <div
            key={image.src}
            className={`absolute inset-0 transition-opacity duration-[1600ms] ease-in-out ${
              activeImage === index ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img
              src={image.src}
              alt={image.alt}
              className={`h-full w-full object-cover transition-transform duration-[7000ms] ease-out ${
                activeImage === index ? 'scale-110' : 'scale-100'
              }`}
              onError={(event) => {
                event.currentTarget.style.display = 'none'
              }}
            />
          </div>
        ))}

        {/* Left cinematic shade */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#210b09]/95 via-[#421713]/72 to-[#3b1510]/25" />

        {/* Warm colour wash */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#8d3b28]/15 via-transparent to-[#c99a4a]/10" />

        {/* Bottom depth */}
        <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-[#2b1110] via-[#2b1110]/65 to-transparent" />

      </div>

      {/* ================= DECORATIVE ELEMENTS ================= */}

      <div className="pointer-events-none absolute right-[8%] top-[18%] hidden lg:block">
        <div className="h-36 w-36 rotate-45 border border-[#e2bd76]/30" />
        <div className="absolute inset-6 rotate-45 border border-[#e2bd76]/20" />
        <div className="absolute inset-[58px] rotate-45 bg-[#e2bd76]/20" />
      </div>

      <div className="pointer-events-none absolute bottom-[18%] right-[22%] hidden h-2 w-2 rounded-full bg-[#e2bd76]/70 lg:block" />

      <div className="pointer-events-none absolute left-[45%] top-[22%] hidden h-1.5 w-1.5 rounded-full bg-[#f2d69c]/70 lg:block" />

      {/* ================= MAIN CONTENT ================= */}

      <div className="relative mx-auto flex min-h-[calc(100vh-76px)] max-w-[1400px] items-end px-5 pb-20 pt-28 sm:px-8 sm:pb-24 lg:items-center lg:px-12">

        <div className="max-w-3xl">

          {/* Brand line */}
          <div className="flex items-center gap-4">
            <span className="h-px w-14 bg-[#e3bd78]" />

            <p className="text-[10px] font-semibold uppercase tracking-[0.42em] text-[#f0d39a]">
              DwijasKalaRekha
            </p>
          </div>

          {/* Heading */}
          <h1
            key={`heading-${activeImage}`}
            className="mt-7 animate-[fadeIn_0.9s_ease-out] font-serif text-5xl font-medium leading-[0.94] tracking-tight text-white sm:text-6xl lg:text-[80px]"
          >
            Colour your
            <span className="block text-[#efc879]">
              traditions.
            </span>
          </h1>

          {/* Description */}
          <p
            key={`description-${activeImage}`}
            className="mt-7 max-w-xl animate-[fadeIn_1s_ease-out_0.1s_both] text-sm leading-7 text-white/85 sm:text-base lg:text-lg"
          >
            Handcrafted floral rangoli designs made to bring
            colour, warmth and character to your home.
          </p>

          {/* Buttons */}
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">

            <Link
              to="/shop"
              className="group inline-flex items-center justify-center gap-3 bg-[#f3dfbd] px-8 py-4 text-sm font-semibold text-[#541a18] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#fff7e8] hover:shadow-xl hover:shadow-black/15"
            >
              Explore Rangoli

              <span className="transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </Link>

            <a
              href="#collections"
              className="group inline-flex items-center justify-center gap-3 border border-[#e6c58b]/70 bg-[#2b1110]/20 px-8 py-4 text-sm font-medium text-white backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:border-[#f0cf8e] hover:bg-white/10"
            >
              View Collections

              <span className="transition-transform duration-300 group-hover:translate-y-1">
                ↓
              </span>
            </a>

          </div>

          {/* Product qualities */}
          <div className="mt-12 flex flex-wrap items-center gap-x-7 gap-y-3 border-t border-white/20 pt-5">

            <span className="text-[10px] font-medium uppercase tracking-[0.25em] text-white/80">
              Handmade
            </span>

            <span className="h-1 w-1 rounded-full bg-[#e7bd71]" />

            <span className="text-[10px] font-medium uppercase tracking-[0.25em] text-white/80">
              Reusable
            </span>

            <span className="h-1 w-1 rounded-full bg-[#e7bd71]" />

            <span className="text-[10px] font-medium uppercase tracking-[0.25em] text-white/80">
              Floral Designs
            </span>

          </div>

        </div>
      </div>

      {/* ================= SLIDE CONTROLS ================= */}

      <div className="absolute bottom-8 right-5 flex items-center gap-5 sm:right-10">

        <div className="flex items-center gap-2 text-xs tracking-[0.2em] text-white/60">

          <span className="font-semibold text-[#f0d19a]">
            {String(activeImage + 1).padStart(2, '0')}
          </span>

          <span className="text-white/30">
            /
          </span>

          <span>
            {String(heroImages.length).padStart(2, '0')}
          </span>

        </div>

        <div className="flex items-center gap-2">

          {heroImages.map((image, index) => (
            <button
              key={image.src}
              type="button"
              onClick={() => setActiveImage(index)}
              aria-label={`Show rangoli image ${index + 1}`}
              className={`h-1 transition-all duration-500 ${
                activeImage === index
                  ? 'w-10 bg-[#f0d19a]'
                  : 'w-4 bg-white/40 hover:bg-white/80'
              }`}
            />
          ))}

        </div>

      </div>

      {/* ================= SIDE LABEL ================= */}

      <div className="absolute bottom-10 left-6 hidden lg:block">

        <div className="flex items-center gap-3 [writing-mode:vertical-rl]">

          <span className="text-[9px] uppercase tracking-[0.35em] text-white/50">
            Fabric • Floral • Celebration
          </span>

          <span className="h-12 w-px bg-[#d8b27c]/60" />

        </div>

      </div>

      {/* ================= SCROLL INDICATOR ================= */}

      <div className="absolute bottom-7 left-1/2 hidden -translate-x-1/2 items-center gap-3 text-white/60 md:flex">

        <span className="text-[9px] uppercase tracking-[0.35em]">
          Discover
        </span>

        <span className="animate-bounce">
          ↓
        </span>

      </div>

    </section>
  )
}

export default Hero