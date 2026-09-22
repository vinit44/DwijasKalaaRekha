function Hero() {
  return (
    <section
      id="home"
      className="relative overflow-hidden bg-[#f8f3ed]"
    >
      {/* Decorative background elements */}
      <div className="absolute -left-24 top-20 h-64 w-64 rounded-full bg-[#ead8c7] opacity-40 blur-3xl" />

      <div className="absolute -right-24 bottom-0 h-72 w-72 rounded-full bg-[#d9b89c] opacity-30 blur-3xl" />

      <div className="relative mx-auto grid min-h-[calc(100vh-80px)] max-w-7xl items-center gap-12 px-5 py-16 sm:px-6 lg:grid-cols-2 lg:gap-20 lg:py-20">

        {/* Left Content */}
        <div className="max-w-2xl">

          <p className="mb-5 text-xs font-semibold uppercase tracking-[0.35em] text-[#8b2f2b]">
            Handcrafted • Tradition • Elegance
          </p>

          <h1 className="text-5xl font-bold leading-[1.05] tracking-tight text-[#35251d] sm:text-6xl lg:text-7xl">
            Bring Your
            <span className="block text-[#6f1d1b]">
              Space to Life.
            </span>
          </h1>

          <p className="mt-6 max-w-xl text-base leading-7 text-[#705d50] sm:text-lg">
            Discover beautiful rangoli designs created to bring
            tradition, colour and elegance into every celebration.
          </p>

          {/* Buttons */}
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">

            <button
              type="button"
              className="rounded-full bg-[#6f1d1b] px-8 py-4 text-sm font-semibold text-white shadow-lg shadow-[#6f1d1b]/20 transition duration-300 hover:-translate-y-1 hover:bg-[#581716]"
            >
              Shop Collection
            </button>

            <button
              type="button"
              className="rounded-full border border-[#b99b82] bg-white/50 px-8 py-4 text-sm font-semibold text-[#6f1d1b] backdrop-blur transition duration-300 hover:bg-white"
            >
              Explore Designs
            </button>

          </div>

          {/* Trust indicators */}
          <div className="mt-10 flex flex-wrap gap-x-8 gap-y-4 text-sm text-[#806c5d]">

            <div>
              <strong className="block text-lg text-[#35251d]">
                ✦
              </strong>
              Traditional Designs
            </div>

            <div>
              <strong className="block text-lg text-[#35251d]">
                ✦
              </strong>
              Premium Quality
            </div>

            <div>
              <strong className="block text-lg text-[#35251d]">
                ✦
              </strong>
              Made With Care
            </div>

          </div>
        </div>

        {/* Right Visual */}
        <div className="relative mx-auto w-full max-w-xl">

          {/* Outer decorative circle */}
          <div className="absolute inset-4 rounded-full border border-[#b99b82]/40" />

          {/* Main visual */}
          <div className="relative flex aspect-square items-center justify-center overflow-hidden rounded-[3rem] bg-[#ead8c7] shadow-2xl shadow-[#6f1d1b]/10">

            <div className="absolute inset-8 rounded-full border border-[#8b2f2b]/20" />

            <div className="relative flex h-[70%] w-[70%] items-center justify-center rounded-full border-8 border-[#6f1d1b]/20 bg-[#f8eee4]">

              <div className="text-center">
                <div className="text-7xl sm:text-8xl">
                  ✿
                </div>

                <p className="mt-4 text-xs font-semibold uppercase tracking-[0.3em] text-[#6f1d1b]">
                  DwijasKalaRekha
                </p>

                <p className="mt-2 text-sm text-[#806c5d]">
                  Crafted for celebrations
                </p>
              </div>

            </div>

          </div>

          {/* Floating badge */}
          <div className="absolute -bottom-4 -left-2 rounded-2xl border border-[#ead8c7] bg-white px-5 py-4 shadow-xl sm:-left-6">
            <p className="text-xs uppercase tracking-widest text-[#9a806b]">
              Discover
            </p>

            <p className="mt-1 font-semibold text-[#35251d]">
              Beautiful Rangoli
            </p>
          </div>

        </div>

      </div>
    </section>
  )
}

export default Hero