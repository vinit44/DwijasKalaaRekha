import { Link } from 'react-router-dom'

function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative overflow-hidden bg-[#2B1110] text-[#F8EBDD]">

      {/* ================= DECORATIVE BACKGROUND ================= */}

      <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full border border-[#C99A4A]/15" />

      <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full border border-[#C99A4A]/10" />

      <div className="pointer-events-none absolute -bottom-40 -left-32 h-96 w-96 rounded-full border border-[#B85C38]/10" />

      <div className="pointer-events-none absolute right-[25%] top-[35%] h-2 w-2 rotate-45 bg-[#C99A4A]/50" />

      {/* ================= MAIN FOOTER ================= */}

      <div className="relative mx-auto max-w-[1400px] px-5 pb-10 pt-16 sm:px-8 sm:pt-20 lg:px-12 lg:pt-24">

        <div className="grid gap-12 border-b border-[#D2A96D]/20 pb-12 md:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1.2fr] lg:gap-16">

          {/* ================= BRAND ================= */}

          <div className="max-w-sm">

            <Link
              to="/"
              className="group inline-flex items-center gap-3"
            >

              {/* Rangoli-inspired mark */}
              <div className="relative flex h-11 w-11 items-center justify-center">

                <div className="absolute inset-1 rotate-45 border border-[#C99A4A]/80 transition-transform duration-500 group-hover:rotate-[135deg]" />

                <div className="absolute h-7 w-7 rounded-full border border-[#C99A4A]/60" />

                <div className="relative h-3 w-3 rotate-45 bg-[#C99A4A] transition-transform duration-500 group-hover:rotate-90" />

              </div>

              <div className="leading-none">

                <p className="font-serif text-[21px] font-semibold tracking-wide text-[#FFF3E0]">
                  DwijasKalaRekha
                </p>

                <p className="mt-1 text-[8px] font-medium uppercase tracking-[0.32em] text-[#CFAF82]">
                  Handmade • Tradition • Art
                </p>

              </div>

            </Link>

            <p className="mt-7 text-sm leading-7 text-[#D8C0B1]">
              Handcrafted rangoli designs created to bring
              colour, warmth and a beautiful festive feeling
              into your home.
            </p>

            <Link
              to="/shop"
              className="group mt-7 inline-flex items-center gap-3 border-b border-[#C99A4A]/60 pb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#E4C17A] transition-all duration-300 hover:border-[#E4C17A]"
            >
              Explore Rangoli

              <span className="transition-transform duration-300 group-hover:translate-x-2">
                →
              </span>
            </Link>

          </div>

          {/* ================= QUICK LINKS ================= */}

          <div>

            <h3 className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#E4C17A]">
              Explore
            </h3>

            <ul className="mt-6 space-y-4">

              <li>
                <Link
                  to="/"
                  className="text-sm text-[#D8C0B1] transition-colors duration-300 hover:text-[#FFF3E0]"
                >
                  Home
                </Link>
              </li>

              <li>
                <Link
                  to="/shop"
                  className="text-sm text-[#D8C0B1] transition-colors duration-300 hover:text-[#FFF3E0]"
                >
                  Shop
                </Link>
              </li>

              <li>
                <a
                  href="/#collections"
                  className="text-sm text-[#D8C0B1] transition-colors duration-300 hover:text-[#FFF3E0]"
                >
                  Collections
                </a>
              </li>

              <li>
                <Link
                  to="/wishlist"
                  className="text-sm text-[#D8C0B1] transition-colors duration-300 hover:text-[#FFF3E0]"
                >
                  Wishlist
                </Link>
              </li>

              <li>
                <Link
                  to="/cart"
                  className="text-sm text-[#D8C0B1] transition-colors duration-300 hover:text-[#FFF3E0]"
                >
                  Cart
                </Link>
              </li>

            </ul>

          </div>

          {/* ================= SHOP ================= */}

          <div>

            <h3 className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#E4C17A]">
              Collections
            </h3>

            <ul className="mt-6 space-y-4">

              <li>
                <Link
                  to="/shop"
                  className="text-sm text-[#D8C0B1] transition-colors duration-300 hover:text-[#FFF3E0]"
                >
                  Floral Rangoli
                </Link>
              </li>

              <li>
                <Link
                  to="/shop"
                  className="text-sm text-[#D8C0B1] transition-colors duration-300 hover:text-[#FFF3E0]"
                >
                  Traditional
                </Link>
              </li>

              <li>
                <Link
                  to="/shop"
                  className="text-sm text-[#D8C0B1] transition-colors duration-300 hover:text-[#FFF3E0]"
                >
                  Festive
                </Link>
              </li>

              <li>
                <Link
                  to="/shop"
                  className="text-sm text-[#D8C0B1] transition-colors duration-300 hover:text-[#FFF3E0]"
                >
                  Decorative
                </Link>
              </li>

              <li>
                <Link
                  to="/shop"
                  className="text-sm text-[#D8C0B1] transition-colors duration-300 hover:text-[#FFF3E0]"
                >
                  New Arrivals
                </Link>
              </li>

            </ul>

          </div>

          {/* ================= CONTACT ================= */}

          <div>

            <h3 className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#E4C17A]">
              Get in touch
            </h3>

            <p className="mt-6 text-sm leading-7 text-[#D8C0B1]">
              Have a question about a rangoli or your order?
              We're happy to help.
            </p>

            <a
              href="https://wa.me/919321510370"
              target="_blank"
              rel="noreferrer"
              className="group mt-6 flex items-center gap-3 text-sm text-[#FFF3E0]"
            >

              <span className="flex h-9 w-9 items-center justify-center border border-[#C99A4A]/50 text-[#E4C17A] transition-all duration-300 group-hover:bg-[#C99A4A] group-hover:text-[#2B1110]">
                ↗
              </span>

              <span className="transition-colors duration-300 group-hover:text-[#E4C17A]">
                WhatsApp us
              </span>

            </a>

            <div className="mt-7">

              <p className="text-[9px] uppercase tracking-[0.25em] text-[#9F7D6D]">
                Follow the craft
              </p>

              <div className="mt-4 flex gap-3">

                <a
                  href="#"
                  aria-label="Instagram"
                  className="flex h-9 w-9 items-center justify-center border border-[#C99A4A]/30 text-xs text-[#E4C17A] transition-all duration-300 hover:border-[#E4C17A] hover:bg-[#C99A4A] hover:text-[#2B1110]"
                >
                  IG
                </a>

                <a
                  href="#"
                  aria-label="Facebook"
                  className="flex h-9 w-9 items-center justify-center border border-[#C99A4A]/30 text-xs text-[#E4C17A] transition-all duration-300 hover:border-[#E4C17A] hover:bg-[#C99A4A] hover:text-[#2B1110]"
                >
                  FB
                </a>

              </div>

            </div>

          </div>

        </div>

        {/* ================= TRUST STRIP ================= */}

        <div className="flex flex-col gap-6 border-b border-[#D2A96D]/20 py-7 md:flex-row md:items-center md:justify-between">

          <div className="flex flex-wrap gap-x-6 gap-y-3">

            <span className="text-[9px] font-semibold uppercase tracking-[0.2em] text-[#BFA391]">
              Handmade
            </span>

            <span className="h-1 w-1 self-center rounded-full bg-[#C99A4A]" />

            <span className="text-[9px] font-semibold uppercase tracking-[0.2em] text-[#BFA391]">
              Reusable
            </span>

            <span className="h-1 w-1 self-center rounded-full bg-[#C99A4A]" />

            <span className="text-[9px] font-semibold uppercase tracking-[0.2em] text-[#BFA391]">
              Secure Ordering
            </span>

            <span className="h-1 w-1 self-center rounded-full bg-[#C99A4A]" />

            <span className="text-[9px] font-semibold uppercase tracking-[0.2em] text-[#BFA391]">
              WhatsApp Support
            </span>

          </div>

          <p className="font-serif text-sm italic text-[#CFAF82]">
            Made with tradition. Designed with love.
          </p>

        </div>

        {/* ================= COPYRIGHT ================= */}

        <div className="flex flex-col gap-4 pt-7 text-[10px] text-[#907365] sm:flex-row sm:items-center sm:justify-between">

          <p>
            © {currentYear} DwijasKalaRekha. All rights reserved.
          </p>

          <div className="flex gap-5">

            <Link
              to="/"
              className="transition-colors duration-300 hover:text-[#E4C17A]"
            >
              Privacy
            </Link>

            <Link
              to="/"
              className="transition-colors duration-300 hover:text-[#E4C17A]"
            >
              Terms
            </Link>

          </div>

        </div>

      </div>

    </footer>
  )
}

export default Footer