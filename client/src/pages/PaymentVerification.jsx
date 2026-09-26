import { useEffect, useState } from 'react'
import {
  useLocation,
  useNavigate,
  useParams,
} from 'react-router-dom'
import API_URL from '../config/api'

function PaymentVerification() {
  const { orderId } = useParams()
  const location = useLocation()
  const navigate = useNavigate()

  const [order, setOrder] = useState(
    location.state?.order || null
  )

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  /*
    Save the order locally.

    This helps if the customer refreshes
    the payment verification page.
  */

  useEffect(() => {
    if (location.state?.order) {
      localStorage.setItem(
        'dwijasPendingOrder',
        JSON.stringify(
          location.state.order
        )
      )
    }
  }, [location.state])

  /*
    Recover order if page was refreshed.
  */

  useEffect(() => {
    if (!order) {
      const savedOrder =
        localStorage.getItem(
          'dwijasPendingOrder'
        )

      if (savedOrder) {
        try {
          setOrder(JSON.parse(savedOrder))
        } catch (error) {
          console.error(
            'Failed to restore order:',
            error
          )
        }
      }
    }
  }, [order])

  /*
    Check payment/order status.
  */

  useEffect(() => {
    let intervalId

    async function checkOrderStatus() {
      try {
        const response = await fetch(
          `${API_URL}/api/orders/status/${orderId}`
        )

        const data =
          await response.json()

        if (!response.ok) {
          throw new Error(
            data.message ||
              'Failed to check order status'
          )
        }

        const updatedOrder = {
          ...(order || {}),
          ...data.order,
        }

        setOrder(updatedOrder)
        setLoading(false)

        /*
          Admin has confirmed payment.

          Now show the real success page.
        */

        if (
          data.order.paymentStatus ===
            'Paid' &&
          data.order.orderStatus ===
            'Confirmed'
        ) {
          localStorage.removeItem(
            'dwijasPendingOrder'
          )

          navigate('/order-success', {
            state: {
              order: updatedOrder,
            },
            replace: true,
          })
        }
      } catch (error) {
        console.error(
          'Check order status failed:',
          error
        )

        setError(
          error.message ||
            'Unable to check order status'
        )

        setLoading(false)
      }
    }

    checkOrderStatus()

    /*
      Check every 5 seconds.

      This allows the customer to keep
      this page open while admin verifies
      the payment.
    */

    intervalId = setInterval(
      checkOrderStatus,
      5000
    )

    return () => {
      clearInterval(intervalId)
    }
  }, [orderId])

  /*
    ========================================
    LOADING
    ========================================
  */

  if (loading && !order) {
    return (
      <div className="min-h-[70vh] bg-[#f8f3ea] flex items-center justify-center px-4">

        <div className="bg-white rounded-3xl shadow-sm border border-[#eadfce] p-10 text-center max-w-lg w-full">

          <div className="w-14 h-14 border-4 border-[#eadfce] border-t-[#6b1f2b] rounded-full animate-spin mx-auto" />

          <h1 className="text-2xl font-serif font-semibold text-[#5b1f2a] mt-6">
            Checking your order
          </h1>

          <p className="text-gray-600 mt-2">
            Please wait...
          </p>

        </div>

      </div>
    )
  }

  /*
    ========================================
    ERROR
    ========================================
  */

  if (error && !order) {
    return (
      <div className="min-h-[70vh] bg-[#f8f3ea] flex items-center justify-center px-4">

        <div className="bg-white rounded-3xl shadow-sm border border-red-200 p-10 text-center max-w-lg w-full">

          <div className="w-16 h-16 rounded-full bg-red-100 text-red-600 flex items-center justify-center text-2xl mx-auto">
            !
          </div>

          <h1 className="text-2xl font-serif font-semibold text-[#5b1f2a] mt-5">
            Unable to check order
          </h1>

          <p className="text-gray-600 mt-3">
            {error}
          </p>

          <button
            onClick={() => window.location.reload()}
            className="mt-6 bg-[#6b1f2b] text-white px-7 py-3 rounded-full font-medium hover:bg-[#51151f] transition"
          >
            Try Again
          </button>

        </div>

      </div>
    )
  }

  return (
    <div className="min-h-[70vh] bg-[#f8f3ea] py-16 px-4">

      <div className="max-w-3xl mx-auto">

        {/* MAIN CARD */}

        <div className="bg-white rounded-[2rem] shadow-sm border border-[#eadfce] overflow-hidden">

          {/* TOP */}

          <div className="bg-[#6b1f2b] px-6 md:px-10 py-10 text-center text-white">

            <div className="w-20 h-20 rounded-full bg-white/10 border border-white/20 flex items-center justify-center mx-auto">

              <div className="w-12 h-12 rounded-full border-4 border-white/30 border-t-white animate-spin" />

            </div>

            <p className="text-xs uppercase tracking-[0.25em] text-[#e8cda8] font-medium mt-6">
              DwijasKalaRekha
            </p>

            <h1 className="text-3xl md:text-4xl font-serif font-semibold mt-2">
              Payment Submitted
            </h1>

            <p className="text-white/80 mt-3 max-w-md mx-auto">
              Your payment details have been
              submitted successfully and are
              waiting for manual verification.
            </p>

          </div>

          {/* CONTENT */}

          <div className="p-6 md:p-10">

            {/* ORDER ID */}

            <div className="bg-[#fbf5eb] rounded-2xl border border-[#ead9c5] p-5 text-center">

              <p className="text-xs uppercase tracking-widest text-[#9b6b35] font-semibold">
                Order ID
              </p>

              <p className="text-xl md:text-2xl font-mono font-semibold text-[#5b1f2a] mt-2 break-all">
                {orderId}
              </p>

            </div>

            {/* STATUS */}

            <div className="grid md:grid-cols-2 gap-4 mt-6">

              <div className="rounded-2xl border border-[#eadfce] p-5">

                <p className="text-sm text-gray-500">
                  Payment Status
                </p>

                <div className="flex items-center gap-2 mt-3">

                  <span className="w-3 h-3 rounded-full bg-amber-500 animate-pulse" />

                  <span className="font-semibold text-amber-700">
                    {order?.paymentStatus ||
                      'Pending'}
                  </span>

                </div>

              </div>

              <div className="rounded-2xl border border-[#eadfce] p-5">

                <p className="text-sm text-gray-500">
                  Order Status
                </p>

                <div className="flex items-center gap-2 mt-3">

                  <span className="w-3 h-3 rounded-full bg-amber-500 animate-pulse" />

                  <span className="font-semibold text-amber-700">
                    {order?.orderStatus ||
                      'Pending'}
                  </span>

                </div>

              </div>

            </div>

            {/* INFORMATION */}

            <div className="mt-8">

              <h2 className="text-xl font-serif font-semibold text-[#5b1f2a]">
                What happens next?
              </h2>

              <div className="mt-5 space-y-4">

                {/* STEP 1 */}

                <div className="flex gap-4">

                  <div className="w-9 h-9 rounded-full bg-[#6b1f2b] text-white flex items-center justify-center font-semibold flex-shrink-0">
                    1
                  </div>

                  <div>

                    <h3 className="font-semibold text-[#4b2930]">
                      Payment submitted
                    </h3>

                    <p className="text-sm text-gray-600 mt-1">
                      Your UTR / transaction ID
                      has been submitted with
                      your order.
                    </p>

                  </div>

                </div>

                {/* STEP 2 */}

                <div className="flex gap-4">

                  <div className="w-9 h-9 rounded-full bg-[#9b6b35] text-white flex items-center justify-center font-semibold flex-shrink-0">
                    2
                  </div>

                  <div>

                    <h3 className="font-semibold text-[#4b2930]">
                      Admin verifies payment
                    </h3>

                    <p className="text-sm text-gray-600 mt-1">
                      Our admin will manually
                      check your payment and
                      transaction reference.
                    </p>

                  </div>

                </div>

                {/* STEP 3 */}

                <div className="flex gap-4">

                  <div className="w-9 h-9 rounded-full border-2 border-[#d8c5ad] text-[#9b6b35] flex items-center justify-center font-semibold flex-shrink-0">
                    3
                  </div>

                  <div>

                    <h3 className="font-semibold text-[#4b2930]">
                      Order confirmed
                    </h3>

                    <p className="text-sm text-gray-600 mt-1">
                      Once payment is confirmed,
                      your order will be officially
                      confirmed.
                    </p>

                  </div>

                </div>

              </div>

            </div>

            {/* AUTO CHECK */}

            <div className="mt-8 rounded-2xl bg-[#fffaf3] border border-[#ead9c5] p-5">

              <div className="flex gap-3">

                <div className="text-[#9b6b35] text-xl">
                  ⟳
                </div>

                <div>

                  <p className="font-medium text-[#5b1f2a]">
                    Waiting for verification
                  </p>

                  <p className="text-sm text-gray-600 mt-1 leading-6">
                    This page automatically checks
                    your order status every few
                    seconds. You do not need to
                    refresh the page.
                  </p>

                </div>

              </div>

            </div>

            {/* ERROR BUT ORDER EXISTS */}

            {error && (
              <div className="mt-5 rounded-xl bg-red-50 border border-red-200 text-red-700 px-4 py-3 text-sm">
                {error}
              </div>
            )}

            {/* CONTINUE SHOPPING */}

            <div className="text-center mt-8">

              <button
                type="button"
                onClick={() =>
                  navigate('/shop')
                }
                className="text-[#6b1f2b] font-medium hover:underline"
              >
                Continue Shopping
              </button>

            </div>

          </div>

        </div>

      </div>

    </div>
  )
}

export default PaymentVerification