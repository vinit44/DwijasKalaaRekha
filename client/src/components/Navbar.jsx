import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const { cartItems } = useCart()

  const cartCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  )

  return (
    <header className="sticky top-0 z-50 border-b border-[#e8ded3] bg-[#fffdf9]/95 backdrop-blur">
      <nav className="mx-auto max-w-7xl px-5 sm:px-6">
        <div className="flex h-20 items-center justify-between">

          {/* Logo */}
          <Link to="/" className="group">
            <div className="text-xl font-bold tracking-wide text-[#6f1d1b] sm:text-2xl">
              DwijasKalaRekha
            </div>

            <div className="text-[9px] uppercase tracking-[0.3em] text-[#9a806b]">
              Art • Tradition • Elegance
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-8 md:flex">

            <Link
              to="/"
              className="text-sm font-medium text-[#49352a] transition hover:text-[#8b2f2b]"
            >
              Home
            </Link>

            <Link
              to="/shop"
              className="text-sm font-medium text-[#49352a] transition hover:text-[#8b2f2b]"
            >
              Shop
            </Link>

            <a
              href="/#collections"
              className="text-sm font-medium text-[#49352a] transition hover:text-[#8b2f2b]"
            >
              Collections
            </a>

            <a
              href="/#about"
              className="text-sm font-medium text-[#49352a] transition hover:text-[#8b2f2b]"
            >
              About
            </a>

            <a
              href="/#contact"
              className="text-sm font-medium text-[#49352a] transition hover:text-[#8b2f2b]"
            >
              Contact
            </a>

          </div>

          {/* Desktop Actions */}
          <div className="hidden items-center gap-3 md:flex">

            {/* Search */}
            <button
              type="button"
              className="rounded-full p-2 text-[#49352a] transition hover:bg-[#f4ebe2]"
              aria-label="Search"
            >
              🔍
            </button>

            {/* Cart */}
            <Link
              to="/cart"
              className="relative flex h-10 w-10 items-center justify-center rounded-full text-xl transition hover:bg-[#f4ebe2]"
              aria-label="Shopping cart"
            >
              🛒

              {cartCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#6f1d1b] px-1 text-[10px] font-bold text-white">
                  {cartCount}
                </span>
              )}
            </Link>

          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            className="rounded-lg p-2 text-2xl text-[#49352a] md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? '✕' : '☰'}
          </button>

        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="border-t border-[#e8ded3] py-5 md:hidden">
            <div className="flex flex-col gap-4">

              <Link
                to="/"
                onClick={() => setIsMenuOpen(false)}
                className="text-sm font-medium text-[#49352a]"
              >
                Home
              </Link>

              <Link
                to="/shop"
                onClick={() => setIsMenuOpen(false)}
                className="text-sm font-medium text-[#49352a]"
              >
                Shop
              </Link>

              <a
                href="/#collections"
                onClick={() => setIsMenuOpen(false)}
                className="text-sm font-medium text-[#49352a]"
              >
                Collections
              </a>

              <a
                href="/#about"
                onClick={() => setIsMenuOpen(false)}
                className="text-sm font-medium text-[#49352a]"
              >
                About
              </a>

              <a
                href="/#contact"
                onClick={() => setIsMenuOpen(false)}
                className="text-sm font-medium text-[#49352a]"
              >
                Contact
              </a>

              {/* Mobile Actions */}
              <div className="flex gap-3 border-t border-[#e8ded3] pt-4">

                {/* Mobile Search */}
                <button
                  type="button"
                  className="rounded-full bg-[#f4ebe2] px-4 py-2 text-sm"
                >
                  🔍 Search
                </button>

                {/* Mobile Cart */}
                <Link
                  to="/cart"
                  onClick={() => setIsMenuOpen(false)}
                  className="relative flex h-10 w-10 items-center justify-center rounded-full text-xl transition hover:bg-[#f4ede5]"
                  aria-label="Shopping cart"
                >
                  🛒

                  {cartCount > 0 && (
                    <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#6f1d1b] px-1 text-[10px] font-bold text-white">
                      {cartCount}
                    </span>
                  )}
                </Link>

              </div>

            </div>
          </div>
        )}

      </nav>
    </header>
  )
}

export default Navbar