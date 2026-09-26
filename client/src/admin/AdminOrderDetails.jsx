import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

const API_URL = 'http://localhost:5000'

function AdminOrderDetails() {
  const { orderId } = useParams()

  const [order, setOrder] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [confirming, setConfirming] = useState(false)

  const token = localStorage.getItem('adminToken')

  async function fetchOrder() {
    try {
      setLoading(true)
      setError('')

      const response = await fetch(
        `${API_URL}/api/orders/${orderId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      const data = await response.json()

      if (!response.ok) {
        throw new Error(
          data.message || 'Failed to fetch order'
        )
      }

      setOrder(data.order)
    } catch (error) {
      console.error(error)
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchOrder()
  }, [orderId])

  async function confirmPayment() {
    const confirmed = window.confirm(
      `Are you sure you want to confirm payment for ${orderId}?`
    )

    if (!confirmed) {
      return
    }

    try {
      setConfirming(true)

      const response = await fetch(
        `${API_URL}/api/orders/${orderId}/payment`,
        {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      const data = await response.json()

      if (!response.ok) {
        throw new Error(
          data.message || 'Failed to confirm payment'
        )
      }

      setOrder(data.order)

      alert('Payment confirmed successfully.')
    } catch (error) {
      console.error(error)
      alert(error.message)
    } finally {
      setConfirming(false)
    }
  }

  const formatDate = (date) => {
    if (!date) return '—'

    return new Date(date).toLocaleString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  const formatCurrency = (value) => {
    return `₹${Number(value || 0).toLocaleString('en-IN')}`
  }

  const getPaymentStyles = (status) => {
    if (status === 'Paid') {
      return {
        wrapper: 'border-[#D8E3CC] bg-[#EEF4E8]',
        dot: 'bg-[#65754A]',
        text: 'text-[#52613B]',
      }
    }

    return {
      wrapper: 'border-[#E7D6A8] bg-[#FFF6DF]',
      dot: 'bg-[#C99A4A]',
      text: 'text-[#8B6A25]',
    }
  }

  const getOrderStatusStyles = (status) => {
    const value = String(status || '').toLowerCase()

    if (value === 'confirmed') {
      return 'border-[#D8E3CC] bg-[#EEF4E8] text-[#52613B]'
    }

    if (
      value === 'cancelled' ||
      value === 'canceled'
    ) {
      return 'border-[#E8CACA] bg-[#FAEEEE] text-[#8A4141]'
    }

    if (value === 'pending') {
      return 'border-[#E7D6A8] bg-[#FFF6DF] text-[#8B6A25]'
    }

    return 'border-[#DDD1CA] bg-[#F6F1EC] text-[#675953]'
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F8F1E5] px-4 py-6 md:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="overflow-hidden rounded-[28px] border border-[#E4D6C8] bg-[#FFFDF8] shadow-[0_12px_40px_rgba(75,45,35,0.06)]">
            <div className="h-2 bg-[#54244F]" />

            <div className="flex min-h-[420px] items-center justify-center">
              <div className="text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border-4 border-[#E8DCCF] border-t-[#54244F]">
                  <span className="sr-only">
                    Loading
                  </span>
                </div>

                <p className="mt-5 text-sm font-medium text-[#6F625C]">
                  Loading order...
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error || !order) {
    return (
      <div className="min-h-screen bg-[#F8F1E5] px-4 py-6 md:px-8">
        <div className="mx-auto max-w-6xl">

          <Link
            to="/admin/orders"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#54244F] transition hover:text-[#B85C38]"
          >
            ← Back to Orders
          </Link>

          <div className="mt-6 overflow-hidden rounded-[28px] border border-[#E4D6C8] bg-[#FFFDF8] shadow-[0_12px_40px_rgba(75,45,35,0.06)]">
            <div className="h-2 bg-[#54244F]" />

            <div className="px-6 py-16 text-center">

              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#FAEEEE] text-xl text-[#8A4141]">
                !
              </div>

              <h1 className="mt-5 text-xl font-bold text-[#351B19]">
                Order not available
              </h1>

              <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[#806F67]">
                {error || 'The requested order could not be found.'}
              </p>

              <Link
                to="/admin/orders"
                className="mt-6 inline-flex rounded-xl bg-[#54244F] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#421B3E]"
              >
                Back to Orders
              </Link>

            </div>
          </div>

        </div>
      </div>
    )
  }

  const paymentStyles = getPaymentStyles(
    order.paymentStatus
  )

  const itemCount = order.items?.reduce(
    (total, item) =>
      total + Number(item.quantity || 0),
    0
  )

  return (
    <div className="min-h-screen bg-[#F8F1E5] px-4 py-6 md:px-8 md:py-8">
      <div className="mx-auto max-w-6xl">

        {/* TOP BAR */}
        <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

          <Link
            to="/admin/orders"
            className="inline-flex w-fit items-center gap-2 text-sm font-semibold text-[#54244F] transition hover:text-[#B85C38]"
          >
            ← Back to Orders
          </Link>

          <div className="flex items-center gap-2">
            <span className="rounded-full border border-[#E2D4C7] bg-[#FFFDF8] px-3 py-1.5 text-xs font-semibold text-[#675953]">
              {itemCount || 0}{' '}
              {itemCount === 1 ? 'item' : 'items'}
            </span>

            <span className="rounded-full border border-[#E2D4C7] bg-[#FFFDF8] px-3 py-1.5 text-xs font-semibold text-[#675953]">
              {formatDate(order.createdAt)}
            </span>
          </div>

        </div>

        {/* HEADER */}
        <section className="overflow-hidden rounded-[28px] border border-[#E4D6C8] bg-[#FFFDF8] shadow-[0_12px_40px_rgba(75,45,35,0.06)]">

          <div className="h-2 bg-[#54244F]" />

          <div className="px-5 py-7 md:px-8 md:py-8">

            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">

              <div>
                <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-[#B85C38]">
                  Order Details
                </p>

                <h1 className="break-all text-3xl font-bold tracking-tight text-[#351B19] md:text-4xl">
                  {order.orderId}
                </h1>

                <p className="mt-2 text-sm text-[#806F67]">
                  Created on {formatDate(order.createdAt)}
                </p>
              </div>

              <div className="flex flex-wrap gap-2">

                <span
                  className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-bold ${paymentStyles.wrapper} ${paymentStyles.text}`}
                >
                  <span
                    className={`h-2 w-2 rounded-full ${paymentStyles.dot}`}
                  />
                  Payment: {order.paymentStatus}
                </span>

                <span
                  className={`rounded-full border px-4 py-2 text-xs font-bold ${getOrderStatusStyles(
                    order.orderStatus
                  )}`}
                >
                  Order: {order.orderStatus}
                </span>

              </div>

            </div>

          </div>
        </section>

        {/* MAIN GRID */}
        <div className="mt-5 grid gap-5 lg:grid-cols-3">

          {/* LEFT */}
          <div className="space-y-5 lg:col-span-2">

            {/* CUSTOMER */}
            <section className="rounded-[24px] border border-[#E4D6C8] bg-[#FFFDF8] p-5 shadow-[0_8px_25px_rgba(75,45,35,0.04)] md:p-6">

              <div className="flex items-start justify-between gap-4">

                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#B85C38]">
                    Customer
                  </p>

                  <h2 className="mt-1 text-xl font-bold text-[#351B19]">
                    Customer Details
                  </h2>
                </div>

                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#F3E9DD] text-sm font-bold text-[#54244F]">
                  C
                </div>

              </div>

              <div className="mt-6 grid gap-5 sm:grid-cols-2">

                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-[#91827A]">
                    Full Name
                  </p>

                  <p className="mt-1.5 font-semibold text-[#40312D]">
                    {order.customer?.fullName || '—'}
                  </p>
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-[#91827A]">
                    Mobile
                  </p>

                  <p className="mt-1.5 font-semibold text-[#40312D]">
                    {order.customer?.mobile || '—'}
                  </p>
                </div>

                {order.customer?.email && (
                  <div className="sm:col-span-2">
                    <p className="text-xs font-semibold uppercase tracking-wide text-[#91827A]">
                      Email
                    </p>

                    <p className="mt-1.5 break-all font-semibold text-[#40312D]">
                      {order.customer.email}
                    </p>
                  </div>
                )}

              </div>

            </section>

            {/* ADDRESS */}
            <section className="rounded-[24px] border border-[#E4D6C8] bg-[#FFFDF8] p-5 shadow-[0_8px_25px_rgba(75,45,35,0.04)] md:p-6">

              <div>
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#B85C38]">
                  Delivery
                </p>

                <h2 className="mt-1 text-xl font-bold text-[#351B19]">
                  Delivery Address
                </h2>
              </div>

              <div className="mt-5 rounded-2xl border border-[#E7DCCF] bg-[#F8F1E5] p-5">

                <p className="font-semibold leading-6 text-[#40312D]">
                  {order.customer?.address || '—'}
                </p>

                <div className="mt-3 flex flex-wrap gap-x-2 gap-y-1 text-sm text-[#75665F]">
                  <span>
                    {order.customer?.city || '—'}
                  </span>

                  <span>•</span>

                  <span>
                    {order.customer?.state || '—'}
                  </span>

                  <span>•</span>

                  <span>
                    {order.customer?.pincode || '—'}
                  </span>
                </div>

              </div>

            </section>

            {/* PRODUCTS */}
            <section className="rounded-[24px] border border-[#E4D6C8] bg-[#FFFDF8] p-5 shadow-[0_8px_25px_rgba(75,45,35,0.04)] md:p-6">

              <div className="flex items-end justify-between gap-4">

                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#B85C38]">
                    Order Items
                  </p>

                  <h2 className="mt-1 text-xl font-bold text-[#351B19]">
                    Ordered Products
                  </h2>
                </div>

                <span className="text-xs font-semibold text-[#806F67]">
                  {order.items?.length || 0}{' '}
                  {order.items?.length === 1
                    ? 'product'
                    : 'products'}
                </span>

              </div>

              <div className="mt-5 space-y-3">

                {order.items?.map((item, index) => (
                  <div
                    key={`${item.productId}-${index}`}
                    className="flex flex-col gap-4 rounded-2xl border border-[#E8DDD3] bg-[#FFFCF7] p-4 sm:flex-row"
                  >

                    {/* IMAGE */}
                    <div className="h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-[#F3E8DA]">

                      {item.image ? (
                        <img
                          src={item.image}
                          alt={item.name}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center text-xs font-semibold text-[#9A8980]">
                          No image
                        </div>
                      )}

                    </div>

                    {/* DETAILS */}
                    <div className="min-w-0 flex-1">

                      <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between">

                        <div>
                          <h3 className="font-bold text-[#40312D]">
                            {item.name}
                          </h3>

                          <p className="mt-1 break-all text-xs text-[#91827A]">
                            Product ID: {item.productId}
                          </p>
                        </div>

                        <p className="font-bold text-[#54244F]">
                          {formatCurrency(
                            Number(item.price || 0) *
                              Number(item.quantity || 0)
                          )}
                        </p>

                      </div>

                      <div className="mt-4 flex flex-wrap gap-2">

                        <span className="rounded-lg border border-[#E2D5CA] bg-[#F8F1E5] px-3 py-1.5 text-xs font-semibold text-[#675953]">
                          Qty: {item.quantity}
                        </span>

                        <span className="rounded-lg border border-[#E2D5CA] bg-[#F8F1E5] px-3 py-1.5 text-xs font-semibold text-[#675953]">
                          Unit: {formatCurrency(item.price)}
                        </span>

                      </div>

                    </div>

                  </div>
                ))}

              </div>

            </section>

          </div>

          {/* RIGHT */}
          <div className="space-y-5">

            {/* PAYMENT SUMMARY */}
            <section className="rounded-[24px] border border-[#E4D6C8] bg-[#FFFDF8] p-5 shadow-[0_8px_25px_rgba(75,45,35,0.04)] md:p-6">

              <div>
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#B85C38]">
                  Billing
                </p>

                <h2 className="mt-1 text-xl font-bold text-[#351B19]">
                  Payment Summary
                </h2>
              </div>

              <div className="mt-5 space-y-4">

                <div className="flex items-center justify-between gap-4">
                  <span className="text-sm text-[#806F67]">
                    Payment Status
                  </span>

                  <span
                    className={`rounded-full border px-3 py-1.5 text-xs font-bold ${paymentStyles.wrapper} ${paymentStyles.text}`}
                  >
                    {order.paymentStatus}
                  </span>
                </div>

                <div className="border-t border-[#E9DED4] pt-4">

                  <div className="flex justify-between">
                    <span className="text-sm text-[#806F67]">
                      Subtotal
                    </span>

                    <span className="text-sm font-semibold text-[#40312D]">
                      {formatCurrency(order.subtotal)}
                    </span>
                  </div>

                  <div className="mt-3 flex justify-between">
                    <span className="text-sm text-[#806F67]">
                      Delivery
                    </span>

                    <span className="text-sm font-semibold text-[#52613B]">
                      {Number(order.deliveryCharge || 0) === 0
                        ? 'FREE'
                        : formatCurrency(order.deliveryCharge)}
                    </span>
                  </div>

                </div>

                <div className="border-t border-[#DCCDC0] pt-4">

                  <div className="flex items-end justify-between gap-4">
                    <span className="font-bold text-[#351B19]">
                      Total
                    </span>

                    <span className="text-2xl font-bold text-[#54244F]">
                      {formatCurrency(order.total)}
                    </span>
                  </div>

                </div>

              </div>

            </section>

            {/* PAYMENT REFERENCE */}
            {order.paymentReference && (
              <section className="rounded-[24px] border border-[#E4D6C8] bg-[#FFFDF8] p-5 shadow-[0_8px_25px_rgba(75,45,35,0.04)] md:p-6">

                <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#B85C38]">
                  Transaction
                </p>

                <h2 className="mt-1 text-xl font-bold text-[#351B19]">
                  Payment Reference
                </h2>

                <div className="mt-5 rounded-2xl border border-[#E7DCCF] bg-[#F8F1E5] p-4">

                  <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#91827A]">
                    Payment Reference
                  </p>

                  <p className="mt-2 break-all font-mono text-sm font-bold text-[#40312D]">
                    {order.paymentReference}
                  </p>

                </div>

              </section>
            )}

            {/* PAYMENT VERIFICATION */}
            <section className="overflow-hidden rounded-[24px] border border-[#E4D6C8] bg-[#FFFDF8] shadow-[0_8px_25px_rgba(75,45,35,0.04)]">

              <div className="border-b border-[#E9DED4] px-5 py-5 md:px-6">

                <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#B85C38]">
                  Admin Action
                </p>

                <h2 className="mt-1 text-xl font-bold text-[#351B19]">
                  Payment Verification
                </h2>

              </div>

              <div className="p-5 md:p-6">

                {order.paymentStatus === 'Paid' ? (

                  <div className="rounded-2xl border border-[#D8E3CC] bg-[#EEF4E8] p-5">

                    <div className="flex items-start gap-3">

                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#65754A] text-sm font-bold text-white">
                        ✓
                      </div>

                      <div>
                        <p className="font-bold text-[#52613B]">
                          Payment Confirmed
                        </p>

                        <p className="mt-1 text-sm leading-5 text-[#65754A]">
                          Payment has been manually verified.
                          This order is ready for processing.
                        </p>
                      </div>

                    </div>

                  </div>

                ) : (

                  <>
                    <div className="rounded-2xl border border-[#E7D6A8] bg-[#FFF6DF] p-4">

                      <div className="flex items-start gap-3">

                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#C99A4A] text-sm font-bold text-white">
                          ₹
                        </div>

                        <div>
                          <p className="font-bold text-[#8B6A25]">
                            Payment Pending
                          </p>

                          <p className="mt-1 text-sm leading-5 text-[#9A7426]">
                            Verify the customer's payment
                            before confirming this order.
                          </p>
                        </div>

                      </div>

                    </div>

                    <button
                      type="button"
                      onClick={confirmPayment}
                      disabled={confirming}
                      className="mt-4 w-full rounded-xl bg-[#65754A] px-5 py-3.5 text-sm font-bold text-white transition hover:bg-[#52613B] disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {confirming
                        ? 'Confirming Payment...'
                        : 'Confirm Payment'}
                    </button>

                  </>
                )}

              </div>

            </section>

            {/* ORDER INFO */}
            <section className="rounded-[24px] border border-[#E4D6C8] bg-[#FFFDF8] p-5 shadow-[0_8px_25px_rgba(75,45,35,0.04)] md:p-6">

              <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#B85C38]">
                Reference
              </p>

              <h2 className="mt-1 text-xl font-bold text-[#351B19]">
                Order Information
              </h2>

              <div className="mt-5 space-y-4">

                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-[#91827A]">
                    Order ID
                  </p>

                  <p className="mt-1 break-all font-mono text-sm font-bold text-[#54244F]">
                    {order.orderId}
                  </p>
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-[#91827A]">
                    Order Status
                  </p>

                  <span
                    className={`mt-1.5 inline-flex rounded-full border px-3 py-1.5 text-xs font-bold ${getOrderStatusStyles(
                      order.orderStatus
                    )}`}
                  >
                    {order.orderStatus || 'Pending'}
                  </span>
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-[#91827A]">
                    Created
                  </p>

                  <p className="mt-1 text-sm font-semibold text-[#40312D]">
                    {formatDate(order.createdAt)}
                  </p>
                </div>

              </div>

            </section>

          </div>

        </div>

        {/* FOOTER */}
        <div className="flex flex-col gap-2 px-2 py-5 text-xs text-[#8A7A72] sm:flex-row sm:items-center sm:justify-between">

          <p>
            DwijasKalaRekha Admin
          </p>

          <p>
            Verify payment manually before processing the order.
          </p>

        </div>

      </div>
    </div>
  )
}

export default AdminOrderDetails