import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const API_URL = 'http://localhost:5000'

function AdminOrders() {
  const [orders, setOrders] = useState([])
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)
  const [searching, setSearching] = useState(false)
  const [error, setError] = useState('')

  const token = localStorage.getItem('adminToken')

  async function fetchOrders() {
    try {
      setLoading(true)
      setError('')

      const response = await fetch(`${API_URL}/api/orders`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch orders')
      }

      setOrders(data.orders || [])
    } catch (error) {
      console.error(error)
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  async function handleSearch(event) {
    event.preventDefault()

    const query = search.trim()

    if (!query) {
      fetchOrders()
      return
    }

    try {
      setSearching(true)
      setError('')

      const response = await fetch(
        `${API_URL}/api/orders/search?q=${encodeURIComponent(query)}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Search failed')
      }

      setOrders(data.orders || [])
    } catch (error) {
      console.error(error)
      setError(error.message)
    } finally {
      setSearching(false)
    }
  }

  async function confirmPayment(orderId) {
    const confirmed = window.confirm(
      `Confirm payment for ${orderId}?`
    )

    if (!confirmed) {
      return
    }

    try {
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

      setOrders((currentOrders) =>
        currentOrders.map((order) =>
          order.orderId === orderId ? data.order : order
        )
      )

      alert('Payment confirmed successfully.')
    } catch (error) {
      console.error(error)
      alert(error.message)
    }
  }

  useEffect(() => {
    fetchOrders()
  }, [])

  const totalOrders = orders.length

  const pendingOrders = orders.filter(
    (order) => order.paymentStatus === 'Pending'
  ).length

  const paidOrders = orders.filter(
    (order) => order.paymentStatus === 'Paid'
  ).length

  const totalValue = orders.reduce(
    (total, order) => total + Number(order.total || 0),
    0
  )

  const formatDate = (date) => {
    if (!date) return '—'

    return new Date(date).toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    })
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

    if (value === 'cancelled' || value === 'canceled') {
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
        <div className="mx-auto max-w-7xl">
          <div className="overflow-hidden rounded-[28px] border border-[#E6D9CA] bg-[#FFFDF8] shadow-[0_12px_40px_rgba(75,45,35,0.06)]">
            <div className="h-2 bg-[#54244F]" />

            <div className="flex min-h-[420px] items-center justify-center p-8">
              <div className="text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border-4 border-[#E8DCCF] border-t-[#54244F]">
                  <span className="sr-only">Loading</span>
                </div>

                <p className="mt-5 text-sm font-medium text-[#6F625C]">
                  Loading orders...
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#F8F1E5] px-4 py-6 md:px-8 md:py-8">
      <div className="mx-auto max-w-7xl">

        {/* TOP BRAND BAR */}
        <div className="mb-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#54244F] text-sm font-bold text-[#F3D18A]">
              DK
            </div>

            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#8B6A25]">
                DwijasKalaRekha
              </p>
              <p className="text-xs text-[#806F67]">
                Admin workspace
              </p>
            </div>
          </div>

          <Link
            to="/admin/products"
            className="hidden rounded-xl border border-[#D9C9BA] bg-[#FFFDF8] px-4 py-2.5 text-sm font-semibold text-[#54244F] transition hover:border-[#54244F] hover:bg-[#54244F] hover:text-white sm:inline-flex"
          >
            Manage Products
          </Link>
        </div>

        {/* HEADER */}
        <section className="overflow-hidden rounded-[28px] border border-[#E4D6C8] bg-[#FFFDF8] shadow-[0_12px_40px_rgba(75,45,35,0.06)]">
          <div className="h-2 bg-[#54244F]" />

          <div className="px-5 py-7 md:px-8 md:py-8">
            <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">

              <div>
                <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-[#B85C38]">
                  Order Management
                </p>

                <h1 className="text-3xl font-bold tracking-tight text-[#351B19] md:text-4xl">
                  Customer Orders
                </h1>

                <p className="mt-2 max-w-2xl text-sm leading-6 text-[#75665F]">
                  Review incoming orders, verify payments and monitor
                  order status from one place.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span className="rounded-full border border-[#E2D4C7] bg-[#F8F1E5] px-3 py-1.5 text-xs font-semibold text-[#675953]">
                  {totalOrders} {totalOrders === 1 ? 'order' : 'orders'}
                </span>

                <Link
                  to="/admin/products"
                  className="inline-flex rounded-xl bg-[#54244F] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#421B3E] sm:hidden"
                >
                  Products
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* STATS */}
        <section className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

          <div className="rounded-2xl border border-[#E4D6C8] bg-[#FFFDF8] p-5 shadow-[0_8px_25px_rgba(75,45,35,0.04)]">
            <div className="flex items-center justify-between">
              <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#806F67]">
                Total Orders
              </p>

              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#F3E9DD] text-sm font-bold text-[#54244F]">
                #
              </span>
            </div>

            <p className="mt-4 text-3xl font-bold text-[#351B19]">
              {totalOrders}
            </p>

            <p className="mt-1 text-xs text-[#8A7A72]">
              Orders currently in the list
            </p>
          </div>

          <div className="rounded-2xl border border-[#E4D6C8] bg-[#FFFDF8] p-5 shadow-[0_8px_25px_rgba(75,45,35,0.04)]">
            <div className="flex items-center justify-between">
              <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#806F67]">
                Payment Pending
              </p>

              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#FFF1CE] text-sm text-[#9A7426]">
                ₹
              </span>
            </div>

            <p className="mt-4 text-3xl font-bold text-[#8B6A25]">
              {pendingOrders}
            </p>

            <p className="mt-1 text-xs text-[#8A7A72]">
              Awaiting manual verification
            </p>
          </div>

          <div className="rounded-2xl border border-[#E4D6C8] bg-[#FFFDF8] p-5 shadow-[0_8px_25px_rgba(75,45,35,0.04)]">
            <div className="flex items-center justify-between">
              <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#806F67]">
                Paid Orders
              </p>

              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#EEF4E8] text-sm font-bold text-[#65754A]">
                ✓
              </span>
            </div>

            <p className="mt-4 text-3xl font-bold text-[#52613B]">
              {paidOrders}
            </p>

            <p className="mt-1 text-xs text-[#8A7A72]">
              Payment successfully verified
            </p>
          </div>

          <div className="rounded-2xl border border-[#E4D6C8] bg-[#FFFDF8] p-5 shadow-[0_8px_25px_rgba(75,45,35,0.04)]">
            <div className="flex items-center justify-between">
              <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#806F67]">
                Total Value
              </p>

              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#F4E5E1] text-sm font-bold text-[#8A477F]">
                ₹
              </span>
            </div>

            <p className="mt-4 text-3xl font-bold text-[#351B19]">
              ₹{totalValue.toLocaleString('en-IN')}
            </p>

            <p className="mt-1 text-xs text-[#8A7A72]">
              Value of displayed orders
            </p>
          </div>

        </section>

        {/* SEARCH */}
        <section className="mt-5 rounded-[24px] border border-[#E4D6C8] bg-[#FFFDF8] p-5 shadow-[0_8px_25px_rgba(75,45,35,0.04)] md:p-6">

          <div className="mb-4">
            <p className="text-sm font-bold text-[#351B19]">
              Find an order
            </p>

            <p className="mt-1 text-xs text-[#806F67]">
              Search using Order ID, customer name or mobile number.
            </p>
          </div>

          <form
            onSubmit={handleSearch}
            className="flex flex-col gap-3 md:flex-row"
          >
            <div className="relative flex-1">
              <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#9A8980]">
                ⌕
              </span>

              <input
                type="search"
                value={search}
                maxLength={60}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Order ID, customer name or mobile..."
                className="w-full rounded-xl border border-[#DCCDC0] bg-[#FFFCF7] py-3.5 pl-11 pr-4 text-sm text-[#351B19] outline-none transition placeholder:text-[#A2948D] focus:border-[#54244F] focus:ring-4 focus:ring-[#54244F]/10"
              />
            </div>

            <button
              type="submit"
              disabled={searching}
              className="rounded-xl bg-[#54244F] px-7 py-3.5 text-sm font-bold text-white transition hover:bg-[#421B3E] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {searching ? 'Searching...' : 'Search'}
            </button>

            <button
              type="button"
              onClick={() => {
                setSearch('')
                fetchOrders()
              }}
              className="rounded-xl border border-[#DCCDC0] bg-[#FFFCF7] px-7 py-3.5 text-sm font-semibold text-[#675953] transition hover:border-[#54244F] hover:text-[#54244F]"
            >
              Reset
            </button>
          </form>
        </section>

        {/* ERROR */}
        {error && (
          <div className="mt-5 rounded-2xl border border-[#E7CACA] bg-[#FBEEEE] p-4 text-sm font-medium text-[#8A4141]">
            {error}
          </div>
        )}

        {/* ORDERS */}
        <section className="mt-5 overflow-hidden rounded-[24px] border border-[#E4D6C8] bg-[#FFFDF8] shadow-[0_8px_25px_rgba(75,45,35,0.04)]">

          <div className="flex flex-col gap-3 border-b border-[#E9DED4] px-5 py-5 md:flex-row md:items-center md:justify-between md:px-6">

            <div>
              <h2 className="text-lg font-bold text-[#351B19]">
                Orders
              </h2>

              <p className="mt-1 text-xs text-[#806F67]">
                Verify payment before treating an order as confirmed.
              </p>
            </div>

            <div className="flex items-center gap-2 text-xs">
              <span className="flex items-center gap-1.5 rounded-full border border-[#E7D6A8] bg-[#FFF6DF] px-3 py-1.5 font-semibold text-[#8B6A25]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#C99A4A]" />
                {pendingOrders} pending
              </span>

              <span className="flex items-center gap-1.5 rounded-full border border-[#D8E3CC] bg-[#EEF4E8] px-3 py-1.5 font-semibold text-[#52613B]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#65754A]" />
                {paidOrders} paid
              </span>
            </div>

          </div>

          {orders.length === 0 ? (
            <div className="px-6 py-20 text-center">

              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#F3E9DD] text-2xl text-[#54244F]">
                □
              </div>

              <h3 className="mt-5 text-lg font-bold text-[#351B19]">
                No orders found
              </h3>

              <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[#806F67]">
                Try another search or wait for a new customer order
                to arrive.
              </p>

            </div>
          ) : (
            <div className="overflow-x-auto">

              <table className="w-full min-w-[1050px]">

                <thead className="bg-[#F8F1E5]">
                  <tr className="border-b border-[#E9DED4] text-left text-[11px] font-bold uppercase tracking-[0.12em] text-[#806F67]">

                    <th className="px-6 py-4">
                      Order
                    </th>

                    <th className="px-6 py-4">
                      Customer
                    </th>

                    <th className="px-6 py-4">
                      Amount
                    </th>

                    <th className="px-6 py-4">
                      Payment
                    </th>

                    <th className="px-6 py-4">
                      Status
                    </th>

                    <th className="px-6 py-4">
                      Date
                    </th>

                    <th className="px-6 py-4 text-right">
                      Action
                    </th>

                  </tr>
                </thead>

                <tbody className="divide-y divide-[#EEE4DA]">

                  {orders.map((order) => {
                    const paymentStyles = getPaymentStyles(
                      order.paymentStatus
                    )

                    return (
                      <tr
                        key={order.orderId}
                        className="group transition hover:bg-[#FFFAF4]"
                      >

                        {/* ORDER */}
                        <td className="px-6 py-5">

                          <Link
                            to={`/admin/orders/${order.orderId}`}
                            className="font-bold text-[#54244F] transition hover:text-[#B85C38]"
                          >
                            {order.orderId}
                          </Link>

                          <p className="mt-1 text-xs text-[#91827A]">
                            {order.items?.length || 0}{' '}
                            product
                            {order.items?.length === 1
                              ? ''
                              : 's'}
                          </p>

                        </td>

                        {/* CUSTOMER */}
                        <td className="px-6 py-5">

                          <p className="max-w-[190px] truncate font-semibold text-[#40312D]">
                            {order.customer?.fullName || '—'}
                          </p>

                          <p className="mt-1 text-xs text-[#8A7A72]">
                            {order.customer?.mobile || '—'}
                          </p>

                        </td>

                        {/* AMOUNT */}
                        <td className="px-6 py-5">

                          <p className="font-bold text-[#351B19]">
                            ₹{Number(order.total || 0).toLocaleString('en-IN')}
                          </p>

                        </td>

                        {/* PAYMENT */}
                        <td className="px-6 py-5">

                          <span
                            className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-bold ${paymentStyles.wrapper} ${paymentStyles.text}`}
                          >
                            <span
                              className={`h-1.5 w-1.5 rounded-full ${paymentStyles.dot}`}
                            />

                            {order.paymentStatus === 'Paid'
                              ? 'Paid'
                              : 'Pending'}
                          </span>

                        </td>

                        {/* STATUS */}
                        <td className="px-6 py-5">

                          <span
                            className={`inline-flex rounded-full border px-3 py-1.5 text-xs font-semibold ${getOrderStatusStyles(
                              order.orderStatus
                            )}`}
                          >
                            {order.orderStatus || 'Pending'}
                          </span>

                        </td>

                        {/* DATE */}
                        <td className="px-6 py-5 text-sm text-[#75665F]">
                          {formatDate(order.createdAt)}
                        </td>

                        {/* ACTION */}
                        <td className="px-6 py-5">

                          <div className="flex justify-end gap-2">

                            <Link
                              to={`/admin/orders/${order.orderId}`}
                              className="rounded-xl border border-[#D7C7BA] bg-[#FFFCF7] px-4 py-2.5 text-xs font-bold text-[#54244F] transition hover:border-[#54244F] hover:bg-[#54244F] hover:text-white"
                            >
                              View
                            </Link>

                            {order.paymentStatus !== 'Paid' && (
                              <button
                                type="button"
                                onClick={() =>
                                  confirmPayment(order.orderId)
                                }
                                className="rounded-xl bg-[#65754A] px-4 py-2.5 text-xs font-bold text-white transition hover:bg-[#52613B]"
                              >
                                Confirm Payment
                              </button>
                            )}

                          </div>

                        </td>

                      </tr>
                    )
                  })}

                </tbody>

              </table>

            </div>
          )}

        </section>

        {/* FOOTER NOTE */}
        <div className="flex flex-col gap-2 px-2 py-5 text-xs text-[#8A7A72] sm:flex-row sm:items-center sm:justify-between">
          <p>
            DwijasKalaRekha Admin
          </p>

          <p>
            Payment verification is handled manually through the admin panel.
          </p>
        </div>

      </div>
    </div>
  )
}

export default AdminOrders