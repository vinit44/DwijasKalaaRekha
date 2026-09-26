import { useEffect, useState } from 'react'
import { getProducts } from '../services/productService'
import { Link } from 'react-router-dom'
import API_URL from '../config/api'

function AdminProducts() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [deletingProductId, setDeletingProductId] = useState('')

  useEffect(() => {
    loadProducts()
  }, [])

  async function loadProducts() {
    try {
      setLoading(true)
      setError('')

      const data = await getProducts()
      setProducts(data)
    } catch (error) {
      console.error(error)
      setError('Failed to load products')
    } finally {
      setLoading(false)
    }
  }

  async function handleDelete(productId, productName) {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${productName}"?`
    )

    if (!confirmed) {
      return
    }

    try {
      setDeletingProductId(productId)
      setError('')

      const response = await fetch(
        `${API_URL}/api/products/${productId}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('adminToken')}`,
          },
        }
      )

      const data = await response.json()

      if (!response.ok) {
        throw new Error(
          data.message || 'Failed to delete product'
        )
      }

      setProducts((currentProducts) =>
        currentProducts.filter(
          (product) => product.productId !== productId
        )
      )
    } catch (error) {
      console.error(error)
      setError(error.message)
    } finally {
      setDeletingProductId('')
    }
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-[#faf7f2] px-6 py-12">
        <div className="mx-auto max-w-7xl text-center">
          <p className="text-[#6f625a]">
            Loading products...
          </p>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-[#faf7f2] px-6 py-12">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="mb-10 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#9a806b]">
              Admin
            </p>

            <h1 className="mt-2 text-4xl font-bold text-[#35251d]">
              Product Management
            </h1>

            <p className="mt-3 text-[#6f625a]">
              Manage your DwijasKalaRekha products.
            </p>
          </div>

          {/* Add Product Button */}
          <Link
            to="/admin/products/add"
            className="inline-flex items-center justify-center rounded-full bg-[#6f1d1b] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#581716]"
          >
            + Add Product
          </Link>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-700">
            {error}
          </div>
        )}

        {/* Product Count */}
        <div className="mb-6 rounded-2xl border border-[#eadfd5] bg-white px-5 py-4">
          <span className="text-sm text-[#6f625a]">
            Total Products:{' '}
          </span>

          <span className="font-semibold text-[#35251d]">
            {products.length}
          </span>
        </div>

        {/* Product Table */}
        <div className="overflow-hidden rounded-3xl border border-[#eadfd5] bg-white">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[950px]">

              <thead className="bg-[#f8f3ed]">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-[#9a806b]">
                    Product
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-[#9a806b]">
                    Category
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-[#9a806b]">
                    Price
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-[#9a806b]">
                    Stock
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-[#9a806b]">
                    Product ID
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-[#9a806b]">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>
                {products.map((product) => (
                  <tr
                    key={product.productId}
                    className="border-t border-[#eadfd5]"
                  >

                    {/* Product */}
                    <td className="px-6 py-5">
                      <p className="font-semibold text-[#35251d]">
                        {product.name}
                      </p>

                      <p className="mt-1 text-sm text-[#9a806b]">
                        {product.collection}
                      </p>
                    </td>

                    {/* Category */}
                    <td className="px-6 py-5 text-sm text-[#6f625a]">
                      {product.category}
                    </td>

                    {/* Price */}
                    <td className="px-6 py-5 font-semibold text-[#6f1d1b]">
                      ₹{product.price}
                    </td>

                    {/* Stock */}
                    <td className="px-6 py-5 text-sm text-[#6f625a]">
                      {product.stock}
                    </td>

                    {/* Product ID */}
                    <td className="px-6 py-5 text-sm font-medium text-[#35251d]">
                      {product.productId}
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-2">

                        {/* Edit Button */}
                        <Link
                          to={`/admin/products/edit/${product.productId}`}
                          className="rounded-full border border-[#6f1d1b] px-4 py-2 text-xs font-semibold text-[#6f1d1b] transition hover:bg-[#f4ebe2]"
                        >
                          Edit
                        </Link>

                        {/* Delete Button */}
                        <button
                          type="button"
                          onClick={() =>
                            handleDelete(
                              product.productId,
                              product.name
                            )
                          }
                          disabled={
                            deletingProductId === product.productId
                          }
                          className="rounded-full border border-red-200 px-4 py-2 text-xs font-semibold text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          {deletingProductId === product.productId
                            ? 'Deleting...'
                            : 'Delete'}
                        </button>

                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>

            </table>
          </div>
        </div>

      </div>
    </main>
  )
}

export default AdminProducts