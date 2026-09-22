function Footer() {
  return (
    <footer
      id="contact"
      className="bg-[#35251d] text-[#f8eee4]"
    >
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-6 lg:py-20">

        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">

          {/* Brand */}
          <div className="lg:col-span-1">

            <h2 className="text-2xl font-bold tracking-wide">
              DwijasKalaRekha
            </h2>

            <p className="mt-1 text-[9px] uppercase tracking-[0.3em] text-[#cda98a]">
              Art • Tradition • Elegance
            </p>

            <p className="mt-6 max-w-xs text-sm leading-7 text-[#cdbbae]">
              Beautiful rangoli designs created to bring
              tradition, creativity and elegance into every
              celebration.
            </p>

            {/* Social */}
            <div className="mt-6 flex gap-3">

              <a
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-[#806c5d] text-sm transition hover:border-[#e8cdb5] hover:text-[#e8cdb5]"
              >
                IG
              </a>

              <a
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-[#806c5d] text-sm transition hover:border-[#e8cdb5] hover:text-[#e8cdb5]"
              >
                WA
              </a>

            </div>

          </div>

          {/* Shop */}
          <div>

            <h3 className="text-sm font-semibold uppercase tracking-wider text-[#e8cdb5]">
              Shop
            </h3>

            <ul className="mt-5 space-y-3 text-sm text-[#cdbbae]">

              <li>
                <a
                  href="#shop"
                  className="transition hover:text-white"
                >
                  Best Sellers
                </a>
              </li>

              <li>
                <a
                  href="#new-arrivals"
                  className="transition hover:text-white"
                >
                  New Arrivals
                </a>
              </li>

              <li>
                <a
                  href="#collections"
                  className="transition hover:text-white"
                >
                  Collections
                </a>
              </li>

              <li>
                <a
                  href="#shop"
                  className="transition hover:text-white"
                >
                  All Products
                </a>
              </li>

            </ul>

          </div>

          {/* Customer Support */}
          <div>

            <h3 className="text-sm font-semibold uppercase tracking-wider text-[#e8cdb5]">
              Customer Support
            </h3>

            <ul className="mt-5 space-y-3 text-sm text-[#cdbbae]">

              <li>
                <a
                  href="#"
                  className="transition hover:text-white"
                >
                  Track Order
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="transition hover:text-white"
                >
                  Shipping Information
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="transition hover:text-white"
                >
                  Returns & Refunds
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="transition hover:text-white"
                >
                  FAQs
                </a>
              </li>

            </ul>

          </div>

          {/* Contact */}
          <div>

            <h3 className="text-sm font-semibold uppercase tracking-wider text-[#e8cdb5]">
              Contact Us
            </h3>

            <div className="mt-5 space-y-4 text-sm text-[#cdbbae]">

              <p>
                📱 WhatsApp
                <br />
                <span className="text-white">
                  +91 XXXXXXXXXX
                </span>
              </p>

              <p>
                ✉ Email
                <br />
                <span className="text-white">
                  hello@dwijaskalarekha.com
                </span>
              </p>

              <p>
                📍 Location
                <br />
                <span className="text-white">
                  Mumbai, Maharashtra
                </span>
              </p>

            </div>

          </div>

        </div>

        {/* Bottom */}
        <div className="mt-14 border-t border-[#806c5d]/40 pt-6">

          <div className="flex flex-col gap-3 text-xs text-[#a99588] sm:flex-row sm:items-center sm:justify-between">

            <p>
              © 2026 DwijasKalaRekha. All rights reserved.
            </p>

            <div className="flex gap-5">

              <a
                href="#"
                className="transition hover:text-white"
              >
                Privacy Policy
              </a>

              <a
                href="#"
                className="transition hover:text-white"
              >
                Terms & Conditions
              </a>

            </div>

          </div>

        </div>

      </div>
    </footer>
  )
}

export default Footer