function PromoBanner() {
  return (
    <section className="bg-[#6f1d1b] px-5 py-16 sm:px-6 lg:py-20">
      <div className="mx-auto max-w-7xl">
        <div className="relative overflow-hidden rounded-[2rem] border border-[#cda98a]/30 bg-[#7f2926] px-6 py-12 text-center sm:px-12 lg:py-16">

          {/* Decorative circles */}
          <div className="absolute -left-20 -top-20 h-48 w-48 rounded-full border border-[#d9b89c]/20" />

          <div className="absolute -bottom-24 -right-16 h-56 w-56 rounded-full border border-[#d9b89c]/20" />

          <div className="relative">

            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#e8cdb5]">
              Festival Special
            </p>

            <h2 className="mx-auto mt-4 max-w-3xl text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
              Celebrate Every Moment With Beautiful Designs
            </h2>

            <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-[#f0ddd0] sm:text-base">
              Explore our festive collection and bring traditional
              beauty into your home.
            </p>

            <button
              type="button"
              className="mt-8 rounded-full bg-[#f8eee4] px-8 py-4 text-sm font-semibold text-[#6f1d1b] transition duration-300 hover:-translate-y-1 hover:bg-white"
            >
              Shop Festival Collection
            </button>

          </div>

        </div>
      </div>
    </section>
  )
}

export default PromoBanner