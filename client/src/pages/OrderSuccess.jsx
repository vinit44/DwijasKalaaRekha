import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import API_URL from '../config/api'

const WHATSAPP_NUMBER = '919321510370'

const ORDER_STATUSES = [
  'Confirmed',
  'Processing',
  'Packed',
  'Shipped',
  'Out for Delivery',
  'Delivered',
]

const STATUS_LABELS = {
  Confirmed: 'Order confirmed',
  Processing: 'Being prepared',
  Packed: 'Packed',
  Shipped: 'Shipped',
  'Out for Delivery': 'Out for delivery',
  Delivered: 'Order delivered',
}

function OrderSuccess() {
  const location = useLocation()

  const savedOrder = localStorage.getItem('dwijasPendingOrder')

  let parsedSavedOrder = null

  try {
    parsedSavedOrder = savedOrder
      ? JSON.parse(savedOrder)
      : null
  } catch (error) {
    console.error('Saved order data is invalid:', error)
  }

  const initialOrder =
    location.state?.order || parsedSavedOrder

  const [liveOrder, setLiveOrder] = useState(initialOrder)
  const [statusLoading, setStatusLoading] =
    useState(Boolean(initialOrder))
  const [statusError, setStatusError] = useState('')

  /*
  ==================================================
  LIVE ORDER STATUS
  ==================================================
  */

  useEffect(() => {
    if (
      !initialOrder?.orderId ||
      !initialOrder?.customer?.mobile
    ) {
      setStatusLoading(false)
      return
    }

    let cancelled = false

    const fetchLatestOrder = async () => {
      try {
        const response = await fetch(
          `${API_URL}/api/orders/status/${initialOrder.orderId}?mobile=${encodeURIComponent(
            initialOrder.customer.mobile
          )}`
        )

        const data = await response.json()

        if (!response.ok) {
          throw new Error(
            data.message ||
              'Failed to fetch order status'
          )
        }

        if (!cancelled && data.order) {
          setLiveOrder(data.order)
          setStatusError('')

          localStorage.setItem(
            'dwijasPendingOrder',
            JSON.stringify(data.order)
          )
        }
      } catch (error) {
        console.error(
          'Order status update failed:',
          error
        )

        if (!cancelled) {
          setStatusError(
            'Unable to refresh order status right now.'
          )
        }
      } finally {
        if (!cancelled) {
          setStatusLoading(false)
        }
      }
    }

    // Check immediately
    fetchLatestOrder()

    // Then check every 5 seconds
    const intervalId = window.setInterval(
      fetchLatestOrder,
      5000
    )

    return () => {
      cancelled = true
      window.clearInterval(intervalId)
    }
  }, [
    initialOrder?.orderId,
    initialOrder?.customer?.mobile,
  ])

  const displayOrder = liveOrder || initialOrder

  /*
  ==================================================
  ORDER NOT FOUND
  ==================================================
  */

  if (!displayOrder) {
    return (
      <div className="min-h-screen bg-[#f8f3ea]">
        <div className="h-1 bg-[#7a2525]" />

        <div className="flex min-h-[calc(100vh-4px)] items-center justify-center px-4">
          <div className="w-full max-w-md border border-[#e6dace] bg-[#fffdf9] p-9 text-center shadow-[0_20px_60px_rgba(70,35,25,0.07)]">
            <div className="mx-auto flex h-16 w-16 items-center justify-center bg-[#f4e7dc] text-2xl font-semibold text-[#7a2525]">
              ?
            </div>

            <p className="mt-6 text-[11px] font-bold uppercase tracking-[0.22em] text-[#a06d32]">
              DwijasKalaRekha
            </p>

            <h1 className="mt-2 font-serif text-3xl font-semibold text-[#54244f]">
              Order not found
            </h1>

            <p className="mt-3 text-sm leading-6 text-[#766960]">
              We could not find the order details.
              Please continue shopping to place a new
              order.
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

  /*
  ==================================================
  CALCULATIONS
  ==================================================
  */

  const subtotal =
    Number(displayOrder.subtotal) || 0

  const deliveryCharge =
    Number(displayOrder.deliveryCharge) || 0

  const total =
    Number(displayOrder.total) ||
    subtotal + deliveryCharge

  const currentStatus =
    displayOrder.orderStatus || 'Pending'

  const currentStatusIndex =
    ORDER_STATUSES.indexOf(currentStatus)

  /*
  ==================================================
  WHATSAPP MESSAGE
  ==================================================
  */

  const buildWhatsAppMessage = () => {
    const itemsText =
      displayOrder.items
        ?.map((item) => {
          const itemTotal =
            Number(item.price) *
            Number(item.quantity)

          return `- ${item.name}
  Product ID: ${item.productId}
  Quantity: ${item.quantity}
  Price: Rs. ${item.price}
  Total: Rs. ${itemTotal}`
        })
        .join('\n\n') || ''

    return `DWIJASKALAREKHA
====================

ORDER DETAILS

Order ID: ${displayOrder.orderId}

====================
PRODUCTS

${itemsText}

====================
PAYMENT

Payment Status: ${
      displayOrder.paymentStatus || 'Paid'
    }

Order Status: ${currentStatus}

====================
TOTAL

Subtotal: Rs. ${subtotal}

Delivery: ${
      deliveryCharge === 0
        ? 'FREE'
        : `Rs. ${deliveryCharge}`
    }

Total: Rs. ${total}

====================
CUSTOMER

Name: ${
      displayOrder.customer?.fullName || ''
    }

Mobile: ${
      displayOrder.customer?.mobile || ''
    }

====================

Thank you for choosing
DwijasKalaRekha.`
  }

  const openWhatsApp = () => {
    const message = buildWhatsAppMessage()

    const whatsappUrl =
      `https://wa.me/${WHATSAPP_NUMBER}` +
      `?text=${encodeURIComponent(message)}`

    window.open(whatsappUrl, '_blank')
  }

  /*
  ==================================================
  RENDER
  ==================================================
  */

  return (
    <div className="min-h-screen bg-[#f8f3ea]">
      <div className="h-1 bg-[#7a2525]" />

      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">

        {/* TOP NAVIGATION */}

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

        {/* SUCCESS HERO */}

        <header className="py-10 text-center sm:py-12">
          <div className="mx-auto flex h-20 w-20 items-center justify-center border border-[#d8c9b9] bg-[#fffdf9]">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#65754a] text-2xl font-bold text-white shadow-sm">
              ✓
            </div>
          </div>

          <p className="mt-6 text-[11px] font-bold uppercase tracking-[0.25em] text-[#a06d32]">
            DwijasKalaRekha
          </p>

          <h1 className="mt-2 font-serif text-4xl font-semibold tracking-tight text-[#54244f] sm:text-5xl">
            {STATUS_LABELS[currentStatus] ||
              currentStatus}
          </h1>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-[#766960] sm:text-base">
            Your payment has been verified. You can
            track the latest status of your order below.
          </p>
        </header>

        {/* ORDER INFORMATION BAR */}

        <div className="mb-7 border border-[#e6dace] bg-[#fffdf9]">
          <div className="grid sm:grid-cols-3">

            {/* ORDER ID */}

            <div className="border-b border-[#eee3da] p-5 sm:border-b-0 sm:border-r">
              <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#95867d]">
                Order ID
              </p>

              <p className="mt-2 break-all font-semibold text-[#54244f]">
                {displayOrder.orderId}
              </p>
            </div>

            {/* PAYMENT */}

            <div className="border-b border-[#eee3da] p-5 sm:border-b-0 sm:border-r">
              <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#95867d]">
                Payment
              </p>

              <div className="mt-2 flex items-center gap-2">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#65754a] text-[10px] font-bold text-white">
                  ✓
                </span>

                <span className="font-semibold text-[#65754a]">
                  {displayOrder.paymentStatus ||
                    'Paid'}
                </span>
              </div>
            </div>

            {/* ORDER STATUS */}

            <div className="p-5">
              <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#95867d]">
                Order status
              </p>

              <div className="mt-2 flex items-center gap-2">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#65754a] text-[10px] font-bold text-white">
                  ✓
                </span>

                <span className="font-semibold text-[#65754a]">
                  {currentStatus}
                </span>
              </div>

              {statusLoading && (
                <p className="mt-2 text-[10px] text-[#95867d]">
                  Checking latest status...
                </p>
              )}

              {statusError && (
                <p className="mt-2 text-[10px] text-[#b43b35]">
                  {statusError}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* LIVE ORDER TRACKING */}

        <section className="mb-7 border border-[#e6dace] bg-[#fffdf9]">
          <div className="border-b border-[#eee3da] px-6 py-5 sm:px-8">
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#a06d32]">
              Live order tracking
            </p>

            <div className="mt-1 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <h2 className="font-serif text-2xl font-semibold text-[#54244f]">
                {currentStatus}
              </h2>

              <span className="text-xs text-[#95867d]">
                Updates automatically
              </span>
            </div>
          </div>

          <div className="px-6 py-7 sm:px-8">
            <div className="grid gap-5 sm:grid-cols-6">
              {ORDER_STATUSES.map(
                (status, index) => {
                  const isCompleted =
                    currentStatusIndex >= index &&
                    currentStatusIndex !== -1

                  const isCurrent =
                    currentStatus === status

                  return (
                    <div
                      key={status}
                      className="relative"
                    >
                      <div className="flex items-start gap-3 sm:block">

                        <div
                          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                            isCompleted
                              ? 'bg-[#65754a] text-white'
                              : 'border border-[#d9cbbd] bg-[#f8f3ea] text-[#95867d]'
                          }`}
                        >
                          {isCompleted
                            ? '✓'
                            : index + 1}
                        </div>

                        <div className="pt-1 sm:pt-3">
                          <p
                            className={`text-xs font-semibold ${
                              isCurrent
                                ? 'text-[#7a2525]'
                                : isCompleted
                                ? 'text-[#54244f]'
                                : 'text-[#95867d]'
                            }`}
                          >
                            {status}
                          </p>

                          <p className="mt-1 text-[10px] leading-4 text-[#95867d]">
                            {STATUS_LABELS[status]}
                          </p>
                        </div>
                      </div>

                      {index <
                        ORDER_STATUSES.length - 1 && (
                        <div
                          className={`hidden h-px sm:absolute sm:left-9 sm:right-[-20px] sm:top-[18px] sm:block ${
                            currentStatusIndex >
                            index
                              ? 'bg-[#65754a]'
                              : 'bg-[#e2d7cc]'
                          }`}
                        />
                      )}
                    </div>
                  )
                }
              )}
            </div>
          </div>
        </section>

        {/* MAIN CONTENT */}

        <div className="grid gap-7 lg:grid-cols-[minmax(0,1fr)_360px]">

          {/* LEFT SIDE */}

          <div className="space-y-7">

            {/* CUSTOMER DETAILS */}

            <section className="border border-[#e6dace] bg-[#fffdf9]">
              <div className="border-b border-[#eee3da] px-6 py-5 sm:px-8">
                <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#a06d32]">
                  Delivery details
                </p>

                <h2 className="mt-1 font-serif text-xl font-semibold text-[#54244f]">
                  Customer information
                </h2>
              </div>

              <div className="grid gap-5 p-6 sm:grid-cols-2 sm:p-8">

                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#95867d]">
                    Name
                  </p>

                  <p className="mt-1 text-sm font-semibold text-[#4b2930]">
                    {displayOrder.customer?.fullName ||
                      '-'}
                  </p>
                </div>

                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#95867d]">
                    Mobile
                  </p>

                  <p className="mt-1 text-sm font-semibold text-[#4b2930]">
                    {displayOrder.customer?.mobile ||
                      '-'}
                  </p>
                </div>

                {displayOrder.customer?.email && (
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#95867d]">
                      Email
                    </p>

                    <p className="mt-1 break-all text-sm font-semibold text-[#4b2930]">
                      {displayOrder.customer.email}
                    </p>
                  </div>
                )}

                <div className="sm:col-span-2">
                  <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#95867d]">
                    Delivery address
                  </p>

                  <p className="mt-1 text-sm leading-6 text-[#4b2930]">
                    {displayOrder.customer?.address ||
                      '-'}
                    <br />

                    {displayOrder.customer?.city ||
                      ''}

                    {displayOrder.customer?.city &&
                    displayOrder.customer?.state
                      ? ', '
                      : ''}

                    {displayOrder.customer?.state ||
                      ''}

                    {displayOrder.customer?.pincode
                      ? ` - ${displayOrder.customer.pincode}`
                      : ''}
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
                      Your purchase
                    </p>

                    <h2 className="mt-1 font-serif text-xl font-semibold text-[#54244f]">
                      Order items
                    </h2>
                  </div>

                  <span className="text-xs text-[#95867d]">
                    {displayOrder.items?.length || 0}{' '}
                    item
                    {(displayOrder.items?.length || 0) !==
                    1
                      ? 's'
                      : ''}
                  </span>
                </div>
              </div>

              <div className="divide-y divide-[#eee3da]">
                {displayOrder.items?.map(
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
                            onError={(event) => {
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
                            Qty. {item.quantity}
                          </span>

                          <span>
                            Rs. {item.price} each
                          </span>
                        </div>
                      </div>

                      <div className="sm:text-right">
                        <p className="text-[10px] font-bold uppercase tracking-wider text-[#95867d]">
                          Item total
                        </p>

                        <p className="mt-1 font-serif text-xl font-bold text-[#7a2525]">
                          Rs.{' '}
                          {Number(item.price) *
                            Number(item.quantity)}
                        </p>
                      </div>
                    </div>
                  )
                )}
              </div>
            </section>

            {/* HELP */}

            <section className="border border-[#e6dace] bg-[#fffdf9]">
              <div className="p-6 sm:p-8">
                <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#a06d32]">
                      Need assistance?
                    </p>

                    <h2 className="mt-1 font-serif text-xl font-semibold text-[#54244f]">
                      We're here to help
                    </h2>

                    <p className="mt-2 max-w-lg text-sm leading-6 text-[#766960]">
                      Contact us on WhatsApp and
                      include your Order ID so we
                      can quickly find your order.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={openWhatsApp}
                    className="shrink-0 bg-[#7a2525] px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-[#641c1c]"
                  >
                    Contact on WhatsApp
                  </button>
                </div>
              </div>
            </section>
          </div>

          {/* RIGHT SUMMARY */}

          <aside className="lg:sticky lg:top-6 lg:h-fit">
            <div className="border border-[#e6dace] bg-[#fffdf9] shadow-[0_12px_35px_rgba(70,35,25,0.05)]">

              <div className="border-b border-[#eee3da] px-6 py-5">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#a06d32]">
                  Payment complete
                </p>

                <h2 className="mt-1 font-serif text-2xl font-semibold text-[#54244f]">
                  Payment summary
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
                      {deliveryCharge === 0
                        ? 'FREE'
                        : `Rs. ${deliveryCharge}`}
                    </span>
                  </div>
                </div>

                <div className="my-5 border-t border-dashed border-[#d9c9bb]" />

                <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#95867d]">
                  Total paid
                </p>

                <p className="mt-1 font-serif text-3xl font-bold text-[#54244f]">
                  Rs. {total}
                </p>

                <div className="mt-6 border border-[#dce3d2] bg-[#f3f6ed] p-4">
                  <div className="flex items-start gap-3">
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#65754a] text-xs font-bold text-white">
                      ✓
                    </div>

                    <div>
                      <p className="text-xs font-bold text-[#53603e]">
                        Payment verified
                      </p>

                      <p className="mt-1 text-xs leading-5 text-[#69725b]">
                        Your payment has been
                        successfully confirmed.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-4 border border-[#eadfd4] bg-[#fbf6ef] p-4">
                  <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#95867d]">
                    Current order status
                  </p>

                  <p className="mt-2 text-sm font-semibold text-[#54244f]">
                    {currentStatus}
                  </p>
                </div>

                <div className="mt-4 border border-[#eadfd4] bg-[#fbf6ef] p-4">
                  <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#95867d]">
                    Order ID
                  </p>

                  <p className="mt-2 break-all text-sm font-semibold text-[#54244f]">
                    {displayOrder.orderId}
                  </p>
                </div>
              </div>
            </div>
          </aside>
        </div>

        {/* BOTTOM BUTTONS */}

        <div className="mt-7 flex flex-col gap-3 sm:flex-row">
          <Link
            to="/shop"
            className="flex-1 bg-[#7a2525] px-5 py-4 text-center text-sm font-semibold text-white transition hover:bg-[#641c1c]"
          >
            Continue Shopping
          </Link>

          <Link
            to="/"
            className="flex-1 border border-[#7a2525] bg-[#fffdf9] px-5 py-4 text-center text-sm font-semibold text-[#7a2525] transition hover:bg-[#fbf3e9]"
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

export default OrderSuccess