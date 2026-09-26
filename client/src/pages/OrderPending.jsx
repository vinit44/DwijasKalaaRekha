import {
  useEffect,
  useState,
} from 'react'
import {
  Link,
  useLocation,
  useNavigate,
} from 'react-router-dom'
import API_URL from '../config/api'
function OrderPending() {
  const location = useLocation()
  const navigate = useNavigate()

  const [order, setOrder] = useState(
    location.state?.order || null
  )

  const [loading, setLoading] =
    useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!order) {
      const savedOrder =
        localStorage.getItem(
          'dwijasPendingOrder'
        )

      if (savedOrder) {
        try {
          setOrder(
            JSON.parse(savedOrder)
          )
        } catch (error) {
          console.error(
            'Failed to read saved order:',
            error
          )
        }
      }
    }
  }, [order])

  /*
  ==================================================
  ORDER STATUS CHECK
  ==================================================
  */

  useEffect(() => {
    if (!order?.orderId) {
      setLoading(false)
      return
    }

    const mobile =
      order.customer?.mobile?.trim()

    if (!mobile) {
      setError(
        'Mobile number is missing from the order.'
      )
      setLoading(false)
      return
    }

    let isMounted = true

    async function checkOrderStatus() {
      try {
        const response =
         await fetch(
  `${API_URL}/api/orders/status/${order.orderId}?mobile=${encodeURIComponent(
    mobile
  )}`
)

        const data =
          await response.json()

        if (!response.ok) {
          throw new Error(
            data.message ||
              'Failed to check order status'
          )
        }

        if (!isMounted) return

        const updatedOrder = {
          ...order,
          paymentStatus:
            data.order.paymentStatus,
          orderStatus:
            data.order.orderStatus,
          total:
            data.order.total,
          createdAt:
            data.order.createdAt,
        }

        setOrder(updatedOrder)
        setLoading(false)

        localStorage.setItem(
          'dwijasPendingOrder',
          JSON.stringify(updatedOrder)
        )

        if (
          data.order.paymentStatus ===
            'Paid' &&
          data.order.orderStatus ===
            'Confirmed'
        ) {
          navigate(
            '/order-success',
            {
              replace: true,
              state: {
                order:
                  updatedOrder,
              },
            }
          )
        }
      } catch (error) {
        console.error(
          'Order status check failed:',
          error
        )

        if (isMounted) {
          setError(error.message)
          setLoading(false)
        }
      }
    }

    checkOrderStatus()

    const interval =
      setInterval(
        checkOrderStatus,
        5000
      )

    return () => {
      isMounted = false
      clearInterval(interval)
    }
  }, [
    order?.orderId,
    order?.customer?.mobile,
  ])

  /*
  ==================================================
  ORDER NOT FOUND
  ==================================================
  */

  if (!order) {
    return (
      <div className="min-h-screen bg-[#f8f3ea]">

        <div className="h-1 bg-[#7a2525]" />

        <div className="flex min-h-[calc(100vh-4px)] items-center justify-center px-4">

          <div className="w-full max-w-md border border-[#e6dace] bg-[#fffdf9] p-9 text-center shadow-[0_20px_60px_rgba(70,35,25,0.07)]">

            <div className="mx-auto flex h-16 w-16 items-center justify-center bg-[#f4e7dc] text-2xl text-[#7a2525]">
              ?
            </div>

            <p className="mt-6 text-[11px] font-bold uppercase tracking-[0.22em] text-[#a06d32]">
              DwijasKalaRekha
            </p>

            <h1 className="mt-2 font-serif text-3xl font-semibold text-[#54244f]">
              Order not found
            </h1>

            <p className="mt-3 text-sm leading-6 text-[#766960]">
              We could not find the pending
              order details on this device.
            </p>

            <div className="mt-7 grid gap-3 sm:grid-cols-2">

              <Link
                to="/shop"
                className="bg-[#7a2525] px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-[#641c1c]"
              >
                Go to Shop
              </Link>

              <Link
                to="/"
                className="border border-[#7a2525] px-5 py-3.5 text-sm font-semibold text-[#7a2525] transition hover:bg-[#fbf3e9]"
              >
                Home
              </Link>

            </div>

          </div>

        </div>

      </div>
    )
  }

  const subtotal =
    Number(order.subtotal) || 0

  const deliveryCharge =
    Number(order.deliveryCharge) || 0

  const total =
    Number(order.total) ||
    subtotal + deliveryCharge

  const paymentStatus =
    order.paymentStatus ||
    'Pending'

  const orderStatus =
    order.orderStatus ||
    'Pending'

  return (
    <div className="min-h-screen bg-[#f8f3ea]">

      <div className="h-1 bg-[#7a2525]" />

      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">

        {/* TOP NAV */}

        <div className="flex items-center justify-between">

          <Link
            to="/shop"
            className="group inline-flex items-center gap-2 text-sm font-medium text-[#6d554b] transition hover:text-[#7a2525]"
          >
            <span className="text-lg transition-transform group-hover:-translate-x-1">
              ←
            </span>

            Back to shop
          </Link>

          <Link
            to="/"
            className="text-sm font-medium text-[#6d554b] transition hover:text-[#7a2525]"
          >
            Home
          </Link>

        </div>

        {/* HERO */}

        <header className="py-10 text-center sm:py-12">

          <div className="mx-auto flex h-20 w-20 items-center justify-center border border-[#dfcdbb] bg-[#fffdf9]">

            <div className="relative flex h-12 w-12 items-center justify-center rounded-full border-[3px] border-[#d7c1ae]">

              <div className="absolute inset-0 rounded-full border-[3px] border-[#7a2525] border-r-transparent border-b-transparent animate-spin" />

              <span className="text-sm font-bold text-[#7a2525]">
                ...
              </span>

            </div>

          </div>

          <p className="mt-6 text-[11px] font-bold uppercase tracking-[0.25em] text-[#a06d32]">
            DwijasKalaRekha
          </p>

          <h1 className="mt-2 font-serif text-4xl font-semibold tracking-tight text-[#54244f] sm:text-5xl">
            Order received
          </h1>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-[#766960] sm:text-base">
            Your order has been created successfully.
            We are waiting for payment verification.
          </p>

        </header>

        {/* STATUS BAR */}

        <div className="mb-7 border border-[#e6dace] bg-[#fffdf9]">

          <div className="grid sm:grid-cols-3">

            <div className="border-b border-[#eee3da] p-5 sm:border-b-0 sm:border-r">

              <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#95867d]">
                Order ID
              </p>

              <p className="mt-2 break-all font-semibold text-[#54244f]">
                {order.orderId}
              </p>

            </div>

            <div className="border-b border-[#eee3da] p-5 sm:border-b-0 sm:border-r">

              <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#95867d]">
                Payment
              </p>

              <div className="mt-2 flex items-center gap-2">

                <span className="h-2 w-2 rounded-full bg-[#c99a4a] animate-pulse" />

                <span className="font-semibold text-[#a06d32]">
                  {paymentStatus}
                </span>

              </div>

            </div>

            <div className="p-5">

              <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#95867d]">
                Order status
              </p>

              <div className="mt-2 flex items-center gap-2">

                <span className="h-2 w-2 rounded-full bg-[#c99a4a] animate-pulse" />

                <span className="font-semibold text-[#a06d32]">
                  {orderStatus}
                </span>

              </div>

            </div>

          </div>

        </div>

        {/* MAIN CONTENT */}

        <div className="grid gap-7 lg:grid-cols-[minmax(0,1fr)_350px]">

          {/* LEFT */}

          <div className="space-y-7">

            {/* PAYMENT */}

            <section className="border border-[#e6dace] bg-[#fffdf9]">

              <div className="border-b border-[#eee3da] px-6 py-5 sm:px-8">

                <div className="flex items-center gap-4">

                  <div className="flex h-9 w-9 shrink-0 items-center justify-center bg-[#7a2525] text-sm font-bold text-white">
                    1
                  </div>

                  <div>

                    <h2 className="font-serif text-xl font-semibold text-[#54244f]">
                      Payment confirmation
                    </h2>

                    <p className="mt-0.5 text-xs text-[#897970]">
                      Complete payment through WhatsApp
                    </p>

                  </div>

                </div>

              </div>

              <div className="p-6 sm:p-8">

                <p className="text-sm leading-7 text-[#766960]">
                  Your order is safely created.
                  Please complete the payment in
                  your WhatsApp conversation. Our
                  team will manually verify the payment
                  before confirming your order.
                </p>

                <div className="mt-6 grid gap-3 sm:grid-cols-3">

                  <div className="border border-[#eadfd4] bg-[#fbf6ef] p-4">

                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#a06d32]">
                      01
                    </span>

                    <p className="mt-2 text-sm font-semibold text-[#4b2930]">
                      Complete payment
                    </p>

                  </div>

                  <div className="border border-[#eadfd4] bg-[#fbf6ef] p-4">

                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#a06d32]">
                      02
                    </span>

                    <p className="mt-2 text-sm font-semibold text-[#4b2930]">
                      Payment verified
                    </p>

                  </div>

                  <div className="border border-[#eadfd4] bg-[#fbf6ef] p-4">

                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#a06d32]">
                      03
                    </span>

                    <p className="mt-2 text-sm font-semibold text-[#4b2930]">
                      Order confirmed
                    </p>

                  </div>

                </div>

                <div className="mt-6 border-l-2 border-[#c99a4a] bg-[#fcf7ed] px-5 py-4">

                  <p className="text-sm font-semibold text-[#54244f]">
                    No action is needed on this page.
                  </p>

                  <p className="mt-1 text-xs leading-5 text-[#81736b]">
                    This page automatically checks
                    your order status every 5 seconds.
                    Once payment is verified, you will
                    automatically move to the order
                    success page.
                  </p>

                </div>

              </div>

            </section>

            {/* DELIVERY DETAILS */}

            <section className="border border-[#e6dace] bg-[#fffdf9]">

              <div className="border-b border-[#eee3da] px-6 py-5 sm:px-8">

                <h2 className="font-serif text-xl font-semibold text-[#54244f]">
                  Delivery details
                </h2>

              </div>

              <div className="grid gap-6 p-6 sm:grid-cols-2 sm:p-8">

                <div>

                  <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#95867d]">
                    Customer
                  </p>

                  <p className="mt-2 text-sm font-semibold text-[#4b2930]">
                    {order.customer?.fullName ||
                      '-'}
                  </p>

                </div>

                <div>

                  <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#95867d]">
                    Mobile
                  </p>

                  <p className="mt-2 text-sm font-semibold text-[#4b2930]">
                    {order.customer?.mobile ||
                      '-'}
                  </p>

                </div>

                {order.customer?.email && (
                  <div>

                    <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#95867d]">
                      Email
                    </p>

                    <p className="mt-2 break-all text-sm font-semibold text-[#4b2930]">
                      {order.customer.email}
                    </p>

                  </div>
                )}

                <div>

                  <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#95867d]">
                    Pincode
                  </p>

                  <p className="mt-2 text-sm font-semibold text-[#4b2930]">
                    {order.customer?.pincode ||
                      '-'}
                  </p>

                </div>

                <div className="sm:col-span-2">

                  <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#95867d]">
                    Delivery address
                  </p>

                  <p className="mt-2 text-sm font-semibold leading-6 text-[#4b2930]">

                    {order.customer?.address ||
                      '-'}

                    <br />

                    {order.customer?.city ||
                      ''}

                    {order.customer?.city &&
                    order.customer?.state
                      ? ', '
                      : ''}

                    {order.customer?.state ||
                      ''}

                  </p>

                </div>

              </div>

            </section>

            {/* ORDER ITEMS */}

            <section className="border border-[#e6dace] bg-[#fffdf9]">

              <div className="border-b border-[#eee3da] px-6 py-5 sm:px-8">

                <div className="flex items-end justify-between gap-4">

                  <div>

                    <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#a06d32]">
                      Your selection
                    </p>

                    <h2 className="mt-1 font-serif text-xl font-semibold text-[#54244f]">
                      Order items
                    </h2>

                  </div>

                  <span className="text-xs text-[#95867d]">
                    {order.items?.length || 0}{' '}
                    item
                    {(order.items?.length || 0) !==
                    1
                      ? 's'
                      : ''}
                  </span>

                </div>

              </div>

              <div className="divide-y divide-[#eee3da]">

                {order.items?.map(
                  (item, index) => (
                    <div
                      key={`${item.productId}-${index}`}
                      className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:p-6"
                    >

                      <div className="h-24 w-24 shrink-0 overflow-hidden border border-[#e8ddd1] bg-[#f4eee6]">

                        {item.image ? (
                          <img
                            src={item.image}
                            alt={item.name}
                            className="h-full w-full object-cover"
                            onError={(
                              event
                            ) => {
                              event.currentTarget.style.display =
                                'none'
                            }}
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center text-[10px] uppercase tracking-wider text-[#a59a91]">
                            No Image
                          </div>
                        )}

                      </div>

                      <div className="min-w-0 flex-1">

                        <h3 className="text-sm font-semibold text-[#4b2930]">
                          {item.name}
                        </h3>

                        <p className="mt-1 text-xs text-[#95867d]">
                          Product ID:{' '}
                          {item.productId}
                        </p>

                        <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-xs text-[#766960]">

                          <span>
                            Qty.{' '}
                            {item.quantity}
                          </span>

                          <span>
                            Rs.{' '}
                            {item.price}{' '}
                            each
                          </span>

                        </div>

                      </div>

                      <div className="sm:text-right">

                        <p className="text-[10px] font-bold uppercase tracking-wider text-[#95867d]">
                          Item total
                        </p>

                        <p className="mt-1 font-serif text-xl font-bold text-[#7a2525]">
                          Rs.{' '}
                          {Number(
                            item.price
                          ) *
                            Number(
                              item.quantity
                            )}
                        </p>

                      </div>

                    </div>
                  )
                )}

              </div>

            </section>

          </div>

          {/* RIGHT SUMMARY */}

          <aside className="lg:sticky lg:top-6 lg:h-fit">

            <div className="border border-[#e6dace] bg-[#fffdf9] shadow-[0_12px_35px_rgba(70,35,25,0.05)]">

              <div className="border-b border-[#eee3da] px-6 py-5">

                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#a06d32]">
                  Order summary
                </p>

                <h2 className="mt-1 font-serif text-2xl font-semibold text-[#54244f]">
                  Payment details
                </h2>

              </div>

              <div className="p-6">

                <div className="space-y-3 text-sm">

                  <div className="flex justify-between">

                    <span className="text-[#766960]">
                      Subtotal
                    </span>

                    <span className="font-medium text-[#4b2930]">
                      Rs. {subtotal}
                    </span>

                  </div>

                  <div className="flex justify-between">

                    <span className="text-[#766960]">
                      Delivery
                    </span>

                    <span className="font-semibold text-[#65754a]">
                      {deliveryCharge ===
                      0
                        ? 'FREE'
                        : `Rs. ${deliveryCharge}`}
                    </span>

                  </div>

                </div>

                <div className="my-5 border-t border-dashed border-[#d9c9bb]" />

                <div>

                  <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#95867d]">
                    Total payable
                  </p>

                  <p className="mt-1 font-serif text-3xl font-bold text-[#54244f]">
                    Rs. {total}
                  </p>

                </div>

                <div className="mt-6 border border-[#eadfd4] bg-[#fbf6ef] p-4">

                  <div className="flex items-start gap-3">

                    <div className="flex h-7 w-7 shrink-0 items-center justify-center bg-[#7a2525] text-xs font-bold text-white">
                      ✓
                    </div>

                    <div>

                      <p className="text-xs font-bold text-[#54244f]">
                        Payment status
                      </p>

                      <p className="mt-1 text-xs leading-5 text-[#81736b]">
                        {paymentStatus}
                        {' · '}
                        waiting for manual verification.
                      </p>

                    </div>

                  </div>

                </div>

              </div>

            </div>

          </aside>

        </div>

        {/* ERROR */}

        {error && (
          <div className="mt-7 border border-[#e7b8b3] bg-[#fff4f2] p-5">

            <p className="text-sm font-semibold text-[#a33a32]">
              Unable to check order status
            </p>

            <p className="mt-1 text-xs leading-5 text-[#b43b35]">
              {error}
            </p>

          </div>
        )}

        {/* AUTO REFRESH */}

        <div className="mt-7 border border-[#e6dace] bg-[#fffdf9] p-6 text-center">

          <div className="flex justify-center">

            <div className="flex gap-1.5">

              <span className="h-1.5 w-1.5 rounded-full bg-[#c99a4a] animate-bounce" />

              <span
                className="h-1.5 w-1.5 rounded-full bg-[#c99a4a] animate-bounce"
                style={{
                  animationDelay:
                    '150ms',
                }}
              />

              <span
                className="h-1.5 w-1.5 rounded-full bg-[#c99a4a] animate-bounce"
                style={{
                  animationDelay:
                    '300ms',
                }}
              />

            </div>

          </div>

          <p className="mt-4 text-sm font-semibold text-[#54244f]">
            {loading
              ? 'Checking order status...'
              : 'Waiting for payment confirmation...'}
          </p>

          <p className="mt-1 text-xs leading-5 text-[#95867d]">
            This page automatically checks for
            updates every 5 seconds.
          </p>

        </div>

        {/* NAVIGATION */}

        <div className="mt-7 flex flex-col gap-3 sm:flex-row">

          <Link
            to="/shop"
            className="flex-1 bg-[#7a2525] px-5 py-3.5 text-center text-sm font-semibold text-white transition hover:bg-[#641c1c]"
          >
            Continue Shopping
          </Link>

          <Link
            to="/"
            className="flex-1 border border-[#7a2525] bg-[#fffdf9] px-5 py-3.5 text-center text-sm font-semibold text-[#7a2525] transition hover:bg-[#fbf3e9]"
          >
            Go to Home
          </Link>

        </div>

      </main>

      {/* FOOTER STRIP */}

      <div className="mt-8 border-t border-[#e5d8cd] bg-[#f2e8dc]">

        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-5 text-center text-[10px] font-semibold uppercase tracking-[0.18em] text-[#766960] sm:flex-row sm:items-center sm:justify-center sm:gap-6">

          <span>
            Handcrafted
          </span>

          <span className="hidden h-1 w-1 rounded-full bg-[#c99a4a] sm:block" />

          <span>
            Reusable
          </span>

          <span className="hidden h-1 w-1 rounded-full bg-[#c99a4a] sm:block" />

          <span>
            Made with care
          </span>

        </div>

      </div>

    </div>
  )
}

export default OrderPending