import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'

function Cart() {
  const {
    cartItems,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
  } = useCart()

  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  )

  /* =========================================================
     EMPTY CART
  ========================================================= */

  if (cartItems.length === 0) {
    return (
      <main className="min-h-screen bg-[#FFF7E8]">

        <div className="mx-auto max-w-[1200px] px-5 py-20 sm:px-8 lg:py-28">

          <div className="mx-auto max-w-2xl text-center">

            <div className="mx-auto flex h-24 w-24 items-center justify-center border border-[#DCC9B5] bg-white text-3xl text-[#7A2525] shadow-sm">
              ♡
            </div>

            <p className="mt-8 text-[10px] font-bold uppercase tracking-[0.3em] text-[#8A477F]">
              Your Shopping Cart
            </p>

            <h1 className="mt-4 font-serif text-4xl text-[#351B19] sm:text-5xl">
              Your cart is empty
            </h1>

            <p className="mx-auto mt-5 max-w-lg text-sm leading-7 text-[#725E57] sm:text-base">
              Discover beautiful rangoli designs and add your favourites
              to your collection.
            </p>

            <Link
              to="/shop"
              className="group mt-8 inline-flex items-center gap-3 bg-[#7A2525] px-8 py-4 text-xs font-bold uppercase tracking-[0.15em] text-white shadow-lg shadow-[#7A2525]/15 transition-all duration-300 hover:-translate-y-1 hover:bg-[#A33A32] hover:shadow-xl active:translate-y-0"
            >
              Continue Shopping

              <span className="transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </Link>

          </div>

        </div>

      </main>
    )
  }

  return (
    <main className="min-h-screen bg-[#FFF7E8]">

      {/* =====================================================
          TOP BRAND STRIP
      ===================================================== */}

      <div className="bg-[#54244F]">

        <div className="mx-auto max-w-[1400px] px-5 py-3 sm:px-8 lg:px-12">

          <div className="flex items-center justify-between">

            <p className="text-[9px] font-semibold uppercase tracking-[0.25em] text-[#F3DDA7]">
              Handmade • Reusable • Festive
            </p>

            <p className="hidden text-[9px] uppercase tracking-[0.2em] text-white/50 sm:block">
              DwijasKalaRekha
            </p>

          </div>

        </div>

      </div>

      {/* =====================================================
          MAIN
      ===================================================== */}

      <div className="mx-auto max-w-[1400px] px-5 py-10 sm:px-8 sm:py-14 lg:px-12 lg:py-16">

        {/* ===================================================
            HEADER
        =================================================== */}

        <div className="mb-10">

          <div className="flex items-center gap-3">

            <span className="h-px w-10 bg-[#C65D3A]" />

            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#8A477F]">
              Shopping Cart
            </p>

          </div>

          <div className="mt-4 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">

            <div>

              <h1 className="font-serif text-4xl text-[#351B19] sm:text-5xl">
                Your Cart
              </h1>

              <p className="mt-3 text-sm text-[#725E57]">
                Review your selected designs before checkout.
              </p>

            </div>

            <div className="border-l-2 border-[#D5A43A] pl-4">

              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#8A6250]">
                Selected
              </p>

              <p className="mt-1 text-sm font-semibold text-[#54244F]">
                {cartItems.length}{' '}
                {cartItems.length === 1
                  ? 'item'
                  : 'items'}
              </p>

            </div>

          </div>

        </div>

        {/* ===================================================
            CONTENT
        =================================================== */}

        <div className="grid gap-10 lg:grid-cols-[1fr_380px]">

          {/* =================================================
              CART ITEMS
          ================================================= */}

          <div className="space-y-5">

            {cartItems.map((item, index) => (

              <div
                key={item.productId}
                className="group border border-[#DCC9B5] bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg sm:p-5"
              >

                <div className="flex flex-col gap-5 sm:flex-row sm:items-center">

                  {/* =========================================
                      IMAGE
                  ========================================= */}

                  <div className="relative h-32 w-full shrink-0 overflow-hidden bg-[#F2E5D5] sm:h-32 sm:w-32">

                    {item.image ? (
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center">

                        <span className="text-5xl text-[#7A2525]/35">
                          {item.symbol}
                        </span>

                      </div>
                    )}

                    {/* Number */}

                    <span className="absolute left-2 top-2 flex h-7 w-7 items-center justify-center bg-[#54244F] text-[9px] font-bold text-white">
                      {String(index + 1).padStart(2, '0')}
                    </span>

                  </div>

                  {/* =========================================
                      DETAILS
                  ========================================= */}

                  <div className="min-w-0 flex-1">

                    <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#8A477F]">
                      {item.productId}
                    </p>

                    <h2 className="mt-2 truncate font-serif text-xl text-[#351B19] sm:text-2xl">
                      {item.name}
                    </h2>

                    <p className="mt-2 text-lg font-bold text-[#7A2525]">
                      ₹{item.price}
                    </p>

                    {/* Quantity */}

                    <div className="mt-5 flex flex-wrap items-center gap-3">

                      <span className="text-[9px] font-bold uppercase tracking-[0.18em] text-[#8A6250]">
                        Quantity
                      </span>

                      <div className="flex items-center border border-[#DCC9B5] bg-[#FFF7E8]">

                        <button
                          type="button"
                          onClick={() =>
                            decreaseQuantity(item.productId)
                          }
                          className="flex h-9 w-9 items-center justify-center text-lg text-[#7A2525] transition-colors duration-200 hover:bg-[#F0E0D1] active:scale-90"
                          aria-label={`Decrease quantity of ${item.name}`}
                        >
                          −
                        </button>

                        <span className="flex h-9 min-w-10 items-center justify-center border-x border-[#DCC9B5] px-3 text-sm font-bold text-[#351B19]">
                          {item.quantity}
                        </span>

                        <button
                          type="button"
                          onClick={() =>
                            increaseQuantity(item.productId)
                          }
                          className="flex h-9 w-9 items-center justify-center text-lg text-[#7A2525] transition-colors duration-200 hover:bg-[#F0E0D1] active:scale-90"
                          aria-label={`Increase quantity of ${item.name}`}
                        >
                          +
                        </button>

                      </div>

                    </div>

                    {/* Remove */}

                    <button
                      type="button"
                      onClick={() =>
                        removeFromCart(item.productId)
                      }
                      className="mt-4 text-[10px] font-bold uppercase tracking-[0.12em] text-[#9A806B] transition-colors duration-200 hover:text-[#7A2525]"
                    >
                      Remove item
                    </button>

                  </div>

                  {/* =========================================
                      TOTAL
                  ========================================= */}

                  <div className="border-t border-[#E5D7C8] pt-4 sm:min-w-[120px] sm:border-0 sm:pt-0 sm:text-right">

                    <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-[#9A806B]">
                      Item Total
                    </p>

                    <p className="mt-2 font-serif text-2xl font-bold text-[#7A2525]">
                      ₹{item.price * item.quantity}
                    </p>

                  </div>

                </div>

              </div>

            ))}

          </div>

          {/* =================================================
              ORDER SUMMARY
          ================================================= */}

          <aside className="h-fit lg:sticky lg:top-24">

            <div className="border border-[#DCC9B5] bg-white shadow-sm">

              {/* Summary Header */}

              <div className="bg-[#54244F] px-6 py-6 text-white sm:px-7">

                <p className="text-[9px] font-bold uppercase tracking-[0.25em] text-[#F3DDA7]">
                  Your Order
                </p>

                <h2 className="mt-2 font-serif text-2xl">
                  Order Summary
                </h2>

              </div>

              <div className="p-6 sm:p-7">

                {/* Pricing */}

                <div className="space-y-5">

                  <div className="flex items-center justify-between text-sm">

                    <span className="text-[#725E57]">
                      Subtotal
                    </span>

                    <span className="font-semibold text-[#351B19]">
                      ₹{subtotal}
                    </span>

                  </div>

                  <div className="flex items-start justify-between gap-4 text-sm">

                    <span className="text-[#725E57]">
                      Delivery
                    </span>

                    <span className="text-right font-semibold text-[#65754A]">
                      FREE
                    </span>

                  </div>

                </div>

                <div className="my-6 border-t border-dashed border-[#DCC9B5]" />

                {/* Total */}

                <div className="flex items-end justify-between">

                  <div>

                    <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#8A6250]">
                      Total
                    </p>

                    <p className="mt-1 text-xs text-[#9A806B]">
                      Including delivery
                    </p>

                  </div>

                  <span className="font-serif text-3xl font-bold text-[#7A2525]">
                    ₹{subtotal}
                  </span>

                </div>

                {/* Checkout */}

                <Link
                  to="/checkout"
                  className="group mt-7 flex w-full items-center justify-center gap-3 bg-[#7A2525] px-6 py-4 text-xs font-bold uppercase tracking-[0.14em] text-white shadow-lg shadow-[#7A2525]/15 transition-all duration-300 hover:-translate-y-1 hover:bg-[#A33A32] hover:shadow-xl active:translate-y-0"
                >
                  Proceed to Checkout

                  <span className="transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>

                </Link>

                {/* Continue Shopping */}

                <Link
                  to="/shop"
                  className="mt-3 flex w-full items-center justify-center border border-[#DCC9B5] px-6 py-3.5 text-xs font-bold uppercase tracking-[0.12em] text-[#54244F] transition-all duration-300 hover:border-[#8A477F] hover:bg-[#F7EDF5]"
                >
                  Continue Shopping
                </Link>

                {/* Payment note */}

                <div className="mt-6 border-l-2 border-[#D5A43A] bg-[#FFF7E8] px-4 py-4">

                  <p className="text-xs font-semibold text-[#54244F]">
                    Simple & secure ordering
                  </p>

                  <p className="mt-1.5 text-[11px] leading-5 text-[#725E57]">
                    Payment will be handled through WhatsApp
                    after checkout.
                  </p>

                </div>

              </div>

            </div>

          </aside>

        </div>

        {/* ===================================================
            BOTTOM TRUST STRIP
        =================================================== */}

        <div className="mt-12 grid border border-[#DCC9B5] bg-white sm:grid-cols-3">

          <div className="border-b border-[#DCC9B5] px-5 py-5 text-center sm:border-b-0 sm:border-r">

            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#7A2525]">
              Handmade
            </p>

            <p className="mt-1 text-xs text-[#8A6250]">
              Crafted with care
            </p>

          </div>

          <div className="border-b border-[#DCC9B5] px-5 py-5 text-center sm:border-b-0 sm:border-r">

            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#8A477F]">
              Reusable
            </p>

            <p className="mt-1 text-xs text-[#8A6250]">
              Made for celebrations
            </p>

          </div>

          <div className="px-5 py-5 text-center">

            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#65754A]">
              Free Delivery
            </p>

            <p className="mt-1 text-xs text-[#8A6250]">
              No extra delivery charge
            </p>

          </div>

        </div>

      </div>

    </main>
  )
}

export default Cart