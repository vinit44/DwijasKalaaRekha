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

  if (cartItems.length === 0) {
    return (
      <main className="min-h-screen bg-[#faf7f2] px-6 py-20">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#9a806b]">
            Your Shopping Cart
          </p>

          <h1 className="mt-3 text-4xl font-bold text-[#35251d]">
            Your cart is empty
          </h1>

          <p className="mt-4 text-[#6f625a]">
            Add some beautiful rangoli designs to your cart and they will
            appear here.
          </p>

          <Link
            to="/shop"
            className="mt-8 inline-block rounded-full bg-[#6f1d1b] px-7 py-3 text-sm font-semibold text-white transition hover:bg-[#581716]"
          >
            Continue Shopping
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-[#faf7f2] px-6 py-12">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="mb-10">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#9a806b]">
            Shopping Cart
          </p>

          <h1 className="mt-2 text-4xl font-bold text-[#35251d]">
            Your Cart
          </h1>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1fr_360px]">

          {/* Cart Items */}
          <div className="space-y-5">
            {cartItems.map((item) => (
              <div
                key={item.productId}
                className="rounded-3xl border border-[#eadfd5] bg-white p-5"
              >
                <div className="flex flex-col gap-5 sm:flex-row sm:items-center">

                  {/* Product Image */}
                  <div className="flex h-28 w-28 shrink-0 items-center justify-center rounded-2xl bg-[#f4ede5] text-5xl text-[#8b2f2b]/40">
                    {item.symbol}
                  </div>

                  {/* Product Details */}
                  <div className="flex-1">
                    <p className="text-xs uppercase tracking-wider text-[#9a806b]">
                      {item.productId}
                    </p>

                    <h2 className="mt-1 text-xl font-semibold text-[#35251d]">
                      {item.name}
                    </h2>

                    <p className="mt-2 text-lg font-bold text-[#6f1d1b]">
                      ₹{item.price}
                    </p>

                    {/* Quantity Controls */}
                    <div className="mt-4 flex items-center gap-3">

                      <span className="text-sm text-[#6f625a]">
                        Quantity
                      </span>

                      <div className="flex items-center overflow-hidden rounded-full border border-[#eadfd5]">

                        <button
                          type="button"
                          onClick={() =>
                            decreaseQuantity(item.productId)
                          }
                          className="flex h-9 w-9 items-center justify-center text-lg text-[#6f1d1b] transition hover:bg-[#f4ede5]"
                          aria-label={`Decrease quantity of ${item.name}`}
                        >
                          −
                        </button>

                        <span className="flex h-9 min-w-10 items-center justify-center border-x border-[#eadfd5] px-3 text-sm font-semibold text-[#35251d]">
                          {item.quantity}
                        </span>

                        <button
                          type="button"
                          onClick={() =>
                            increaseQuantity(item.productId)
                          }
                          className="flex h-9 w-9 items-center justify-center text-lg text-[#6f1d1b] transition hover:bg-[#f4ede5]"
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
                      className="mt-3 text-sm font-medium text-[#9a806b] transition hover:text-[#6f1d1b]"
                    >
                      Remove
                    </button>
                  </div>

                  {/* Item Total */}
                  <div className="text-left sm:text-right">
                    <p className="text-xs uppercase tracking-wider text-[#9a806b]">
                      Item Total
                    </p>

                    <p className="mt-1 text-xl font-bold text-[#6f1d1b]">
                      ₹{item.price * item.quantity}
                    </p>
                  </div>

                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <aside className="h-fit rounded-3xl border border-[#eadfd5] bg-white p-6">
            <h2 className="text-xl font-semibold text-[#35251d]">
              Order Summary
            </h2>

            <div className="mt-6 flex items-center justify-between text-sm text-[#6f625a]">
              <span>Subtotal</span>

              <span className="font-semibold text-[#35251d]">
                ₹{subtotal}
              </span>
            </div>

            <div className="mt-4 flex items-center justify-between text-sm text-[#6f625a]">
              <span>Delivery</span>

              <span className="font-semibold text-[#35251d]">
                Calculated at checkout
              </span>
            </div>

            <div className="my-6 border-t border-[#eadfd5]" />

            <div className="flex items-center justify-between">
              <span className="text-lg font-semibold text-[#35251d]">
                Total
              </span>

              <span className="text-2xl font-bold text-[#6f1d1b]">
                ₹{subtotal}
              </span>
            </div>

            <button
              type="button"
              className="mt-6 w-full rounded-full bg-[#6f1d1b] px-6 py-4 text-sm font-semibold text-white transition hover:bg-[#581716]"
            >
              Proceed to Checkout
            </button>
          </aside>

        </div>
      </div>
    </main>
  )
}

export default Cart