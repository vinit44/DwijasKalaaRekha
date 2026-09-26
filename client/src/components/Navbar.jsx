import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useWishlist } from '../context/WishlistContext'

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  const { cartItems } = useCart()
  const { wishlistItems } = useWishlist()

  const cartCount = cartItems?.reduce(
    (total, item) => total + (item.quantity || 1),
    0
  ) || 0

  const wishlistCount = wishlistItems?.length || 0

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Shop', path: '/shop' },
    { name: 'Collections', path: '/#collections' },
  ]

  return (
    <header className="sticky top-0 z-50 border-b border-[#dcc8ad] bg-[#fbf5eb]/95 backdrop-blur-xl">

      <div className="mx-auto flex h-[76px] max-w-[1400px] items-center justify-between px-5 sm:px-8 lg:px-12">

        {/* LOGO */}
        <Link
          to="/"
          onClick={() => setMenuOpen(false)}
          className="group flex items-center gap-3"
        >
          {/* Rangoli-inspired logo mark */}
          <div className="relative flex h-11 w-11 items-center justify-center">

            <div className="absolute inset-1 rotate-45 border border-[#b58a45] transition-transform duration-500 group-hover:rotate-[135deg]" />

            <div className="absolute h-7 w-7 rounded-full border border-[#7a2525]" />

            <div className="relative flex h-3 w-3 rotate-45 bg-[#c99a4a] transition-transform duration-500 group-hover:rotate-90" />

          </div>

          <div className="leading-none">
            <p className="font-serif text-[21px] font-semibold tracking-wide text-[#5c1d1d]">
              DwijasKalaRekha
            </p>

            <p className="mt-1 text-[8px] font-medium uppercase tracking-[0.32em] text-[#9a7650]">
              Handmade • Tradition • Art
            </p>
          </div>
        </Link>

        {/* DESKTOP NAVIGATION */}
        <nav className="hidden items-center gap-9 lg:flex">

          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              className={({ isActive }) =>
                `group relative py-2 text-[12px] font-semibold uppercase tracking-[0.16em] transition-colors duration-300 ${
                  isActive
                    ? 'text-[#641c1c]'
                    : 'text-[#5a4842] hover:text-[#641c1c]'
                }`
              }
            >
              {link.name}

              <span className="absolute bottom-0 left-0 h-px w-0 bg-[#c99a4a] transition-all duration-300 group-hover:w-full" />
            </NavLink>
          ))}

        </nav>

        {/* RIGHT ACTIONS */}
        <div className="hidden items-center gap-2 sm:flex">

          {/* Wishlist */}
          <Link
            to="/wishlist"
            aria-label="Wishlist"
            className="group relative flex h-10 w-10 items-center justify-center text-[#5c1d1d] transition-all duration-300 hover:bg-[#efe1ce]"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.7"
              className="h-[20px] w-[20px] transition-transform duration-300 group-hover:scale-110"
            >
              <path
                d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78Z"
              />
            </svg>

            {wishlistCount > 0 && (
              <span className="absolute right-0 top-0 flex h-[17px] min-w-[17px] items-center justify-center rounded-full bg-[#641c1c] px-1 text-[9px] font-bold text-white">
                {wishlistCount}
              </span>
            )}
          </Link>

          {/* Cart */}
          <Link
            to="/cart"
            aria-label="Shopping cart"
            className="group relative flex h-10 w-10 items-center justify-center text-[#5c1d1d] transition-all duration-300 hover:bg-[#efe1ce]"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.7"
              className="h-[21px] w-[21px] transition-transform duration-300 group-hover:scale-110"
            >
              <path d="M6 6h15l-1.5 9h-12z" />
              <path d="M6 6 5 3H2" />
              <circle cx="9" cy="20" r="1.5" />
              <circle cx="18" cy="20" r="1.5" />
            </svg>

            {cartCount > 0 && (
              <span className="absolute right-0 top-0 flex h-[17px] min-w-[17px] items-center justify-center rounded-full bg-[#c99a4a] px-1 text-[9px] font-bold text-[#3b211b]">
                {cartCount}
              </span>
            )}
          </Link>

          {/* Shop CTA */}
          <Link
            to="/shop"
            className="ml-2 inline-flex items-center gap-2 bg-[#641c1c] px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#fff8ed] transition-all duration-300 hover:bg-[#8a3028] hover:shadow-lg hover:shadow-[#641c1c]/15"
          >
            Shop Now

            <span className="transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </Link>

        </div>

        {/* MOBILE ACTIONS */}
        <div className="flex items-center gap-1 sm:hidden">

          <Link
            to="/cart"
            aria-label="Shopping cart"
            className="relative flex h-10 w-10 items-center justify-center text-[#641c1c]"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.7"
              className="h-5 w-5"
            >
              <path d="M6 6h15l-1.5 9h-12z" />
              <path d="M6 6 5 3H2" />
              <circle cx="9" cy="20" r="1.5" />
              <circle cx="18" cy="20" r="1.5" />
            </svg>

            {cartCount > 0 && (
              <span className="absolute right-0 top-0 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#c99a4a] px-1 text-[8px] font-bold text-[#3b211b]">
                {cartCount}
              </span>
            )}
          </Link>

          {/* Menu button */}
          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            className="flex h-10 w-10 items-center justify-center text-[#641c1c]"
          >
            <div className="flex w-5 flex-col gap-1.5">
              <span
                className={`h-px w-full bg-current transition-transform duration-300 ${
                  menuOpen ? 'translate-y-[4px] rotate-45' : ''
                }`}
              />

              <span
                className={`h-px w-full bg-current transition-opacity duration-300 ${
                  menuOpen ? 'opacity-0' : ''
                }`}
              />

              <span
                className={`h-px w-full bg-current transition-transform duration-300 ${
                  menuOpen ? '-translate-y-[4px] -rotate-45' : ''
                }`}
              />
            </div>
          </button>

        </div>

      </div>

      {/* MOBILE MENU */}
      <div
        className={`overflow-hidden border-t border-[#dcc8ad] bg-[#fbf5eb] transition-all duration-300 sm:hidden ${
          menuOpen
            ? 'max-h-[420px] opacity-100'
            : 'max-h-0 opacity-0'
        }`}
      >

        <nav className="px-5 py-5">

          {navLinks.map((link, index) => (
            <NavLink
              key={link.name}
              to={link.path}
              onClick={() => setMenuOpen(false)}
              className="flex items-center justify-between border-b border-[#e5d6c1] py-4 text-sm font-semibold uppercase tracking-[0.15em] text-[#5c1d1d]"
            >
              <span>{link.name}</span>

              <span className="text-[#c99a4a]">
                →
              </span>
            </NavLink>
          ))}

          <Link
            to="/wishlist"
            onClick={() => setMenuOpen(false)}
            className="flex items-center justify-between border-b border-[#e5d6c1] py-4 text-sm font-semibold uppercase tracking-[0.15em] text-[#5c1d1d]"
          >
            <span>Wishlist</span>

            {wishlistCount > 0 && (
              <span className="flex h-6 min-w-6 items-center justify-center rounded-full bg-[#641c1c] px-2 text-[10px] text-white">
                {wishlistCount}
              </span>
            )}
          </Link>

          <Link
            to="/shop"
            onClick={() => setMenuOpen(false)}
            className="mt-5 flex items-center justify-center gap-3 bg-[#641c1c] px-6 py-4 text-xs font-semibold uppercase tracking-[0.18em] text-white transition-colors duration-300 hover:bg-[#8a3028]"
          >
            Explore Rangoli
            <span>→</span>
          </Link>

        </nav>

      </div>

    </header>
  )
}

export default Navbar