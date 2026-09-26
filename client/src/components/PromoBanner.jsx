import { Link } from 'react-router-dom'

function PromoBanner() {
  return (
    <section className="relative overflow-hidden bg-[#641C1C] py-20 text-[#FFF8EC] sm:py-24 lg:py-28">

      {/* ================= DECORATIVE RANGOLI SHAPES ================= */}

      <div className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full border border-[#E4C17A]/25" />

      <div className="pointer-events-none absolute -right-10 -top-10 h-52 w-52 rounded-full border border-[#E4C17A]/20" />

      <div className="pointer-events-none absolute -left-28 -bottom-28 h-80 w-80 rounded-full border border-[#F1D7A3]/15" />

      <div className="pointer-events-none absolute left-[12%] top-[24%] hidden h-3 w-3 rotate-45 bg-[#D99A55]/70 lg:block" />

      <div className="pointer-events-none absolute right-[30%] bottom-[20%] hidden h-2 w-2 rounded-full bg-[#E4C17A]/70 lg:block" />

      {/* ================= MAIN ================= */}

      <div className="relative mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">

        <div className="relative overflow-hidden border border-[#E4C17A]/30 bg-[#4D1515] px-7 py-12 sm:px-12 sm:py-16 lg:px-20 lg:py-20">

          {/* Inner glow */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#B85C38]/20 via-transparent to-[#C99A4A]/10" />

          <div className="relative grid items-center gap-12 lg:grid-cols-[1fr_auto]">

            {/* ================= TEXT ================= */}

            <div className="max-w-3xl">

              <div className="mb-6 flex items-center gap-4">

                <span className="h-px w-12 bg-[#D9B66F]" />

                <span className="text-[10px] font-semibold uppercase tracking-[0.4em] text-[#E8C982]">
                  Celebrate beautifully
                </span>

              </div>

              <h2 className="font-serif text-4xl leading-[1.05] text-[#FFF7E8] sm:text-5xl lg:text-6xl">

                Bring a little

                <span className="block text-[#E7C476]">
                  tradition home.
                </span>

              </h2>

              <p className="mt-6 max-w-xl text-sm leading-7 text-[#F3DED0] sm:text-base">
                Discover handcrafted rangoli designs made to turn
                everyday spaces and special celebrations into something
                memorable.
              </p>

              {/* Features */}
              <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3">

                <span className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#F2D9A6]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#C99A4A]" />
                  Handmade
                </span>

                <span className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#F2D9A6]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#B85C38]" />
                  Reusable
                </span>

                <span className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#F2D9A6]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#75805A]" />
                  Made with care
                </span>

              </div>

            </div>

            {/* ================= CTA ================= */}

            <div className="lg:pr-4">

              <Link
                to="/shop"
                className="group relative flex min-w-[210px] items-center justify-center gap-4 border border-[#E4C17A] bg-[#E4C17A] px-8 py-5 text-xs font-bold uppercase tracking-[0.18em] text-[#541A18] transition-all duration-300 hover:-translate-y-1 hover:bg-[#F5D99C] hover:shadow-2xl hover:shadow-black/20"
              >
                Explore Collection

                <span className="text-lg font-normal transition-transform duration-300 group-hover:translate-x-2">
                  →
                </span>
              </Link>

              <p className="mt-4 text-center text-[9px] uppercase tracking-[0.25em] text-[#DDBF91]/70">
                Made for moments that matter
              </p>

            </div>

          </div>

          {/* ================= BOTTOM BRAND LINE ================= */}

          <div className="relative mt-12 flex flex-col gap-4 border-t border-[#E4C17A]/20 pt-6 sm:flex-row sm:items-center sm:justify-between">

            <p className="font-serif text-base italic text-[#E8D0B8]">
              DwijasKalaRekha
            </p>

            <div className="flex items-center gap-4 text-[9px] uppercase tracking-[0.3em] text-[#DDBF91]/60">

              <span>Tradition</span>

              <span className="h-1 w-1 rounded-full bg-[#C99A4A]" />

              <span>Beauty</span>

              <span className="h-1 w-1 rounded-full bg-[#C99A4A]" />

              <span>Celebration</span>

            </div>

          </div>

        </div>

      </div>

    </section>
  )
}

export default PromoBanner