import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import API_URL from '../config/api'

function AdminLogin() {
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(event) {
    event.preventDefault()

    setLoading(true)
    setError('')

    try {
      const response = await fetch(
        `${API_URL}/api/auth/login`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email,
            password,
          }),
        }
      )

      const data = await response.json()

      if (!response.ok) {
        throw new Error(
          data.message || 'Login failed'
        )
      }

      localStorage.setItem('adminToken', data.token)
      localStorage.setItem(
        'adminEmail',
        data.admin.email
      )

      navigate('/admin/products')
    } catch (error) {
      console.error(error)
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#faf7f2] px-6 py-12">
      <div className="w-full max-w-md">

        <div className="mb-8 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#9a806b]">
            DwijasKalaRekha
          </p>

          <h1 className="mt-3 text-4xl font-bold text-[#35251d]">
            Admin Login
          </h1>

          <p className="mt-3 text-[#6f625a]">
            Sign in to manage your store.
          </p>
        </div>

        {error && (
          <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-700">
            {error}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="rounded-3xl border border-[#eadfd5] bg-white p-6 shadow-sm sm:p-8"
        >

          {/* Email */}
          <div>
            <label className="text-sm font-semibold text-[#35251d]">
              Email
            </label>

            <input
              type="email"
              value={email}
              onChange={(event) =>
                setEmail(event.target.value)
              }
              placeholder="admin@example.com"
              required
              className="mt-2 w-full rounded-2xl border border-[#eadfd5] px-4 py-3 text-sm outline-none transition focus:border-[#6f1d1b]"
            />
          </div>

          {/* Password */}
          <div className="mt-6">
            <label className="text-sm font-semibold text-[#35251d]">
              Password
            </label>

            <input
              type="password"
              value={password}
              onChange={(event) =>
                setPassword(event.target.value)
              }
              placeholder="Enter your password"
              required
              className="mt-2 w-full rounded-2xl border border-[#eadfd5] px-4 py-3 text-sm outline-none transition focus:border-[#6f1d1b]"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="mt-8 w-full rounded-full bg-[#6f1d1b] px-6 py-4 text-sm font-semibold text-white transition hover:bg-[#581716] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>

        </form>
      </div>
    </main>
  )
}

export default AdminLogin