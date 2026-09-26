import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import API_URL from '../config/api'

const initialFormData = {
  productId: '',
  name: '',
  price: '',
  mrp: '',
  discount: '',
  image: '',
  category: '',
  collection: '',
  description: '',
  stock: '',
}

function AddProduct() {
  const navigate = useNavigate()

  const [formData, setFormData] = useState(initialFormData)

  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})

  const [loading, setLoading] = useState(false)
  const [uploadingImage, setUploadingImage] = useState(false)

  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  function validateField(name, value, currentData = formData) {
    const trimmedValue =
      typeof value === 'string'
        ? value.trim()
        : value

    switch (name) {
      case 'productId':
        if (!trimmedValue) {
          return 'Product ID is required.'
        }

        if (trimmedValue.length < 3) {
          return 'Product ID must be at least 3 characters.'
        }

        if (!/^[A-Za-z0-9_-]+$/.test(trimmedValue)) {
          return 'Use only letters, numbers, hyphens or underscores.'
        }

        return ''

      case 'name':
        if (!trimmedValue) {
          return 'Product name is required.'
        }

        if (trimmedValue.length < 3) {
          return 'Product name must be at least 3 characters.'
        }

        if (trimmedValue.length > 100) {
          return 'Product name cannot exceed 100 characters.'
        }

        return ''

      case 'price': {
        if (trimmedValue === '') {
          return 'Price is required.'
        }

        const price = Number(trimmedValue)

        if (!Number.isFinite(price) || price <= 0) {
          return 'Price must be greater than ₹0.'
        }

        if (price > 1000000) {
          return 'Price is too high.'
        }

        if (!Number.isInteger(price)) {
          return 'Enter price as a whole number.'
        }

        if (
          currentData.mrp !== '' &&
          Number(currentData.mrp) > 0 &&
          price > Number(currentData.mrp)
        ) {
          return 'Price cannot be greater than MRP.'
        }

        return ''
      }

      case 'mrp': {
        if (trimmedValue === '') {
          return 'MRP is required.'
        }

        const mrp = Number(trimmedValue)

        if (!Number.isFinite(mrp) || mrp <= 0) {
          return 'MRP must be greater than ₹0.'
        }

        if (mrp > 1000000) {
          return 'MRP is too high.'
        }

        if (!Number.isInteger(mrp)) {
          return 'Enter MRP as a whole number.'
        }

        if (
          currentData.price !== '' &&
          Number(currentData.price) > mrp
        ) {
          return 'MRP must be equal to or greater than price.'
        }

        return ''
      }

      case 'discount': {
        if (trimmedValue === '') {
          return ''
        }

        const discount = Number(trimmedValue)

        if (!Number.isFinite(discount)) {
          return 'Enter a valid discount.'
        }

        if (discount < 0 || discount > 100) {
          return 'Discount must be between 0 and 100.'
        }

        if (!Number.isInteger(discount)) {
          return 'Discount must be a whole number.'
        }

        return ''
      }

      case 'category':
        if (!trimmedValue) {
          return 'Category is required.'
        }

        if (trimmedValue.length < 2) {
          return 'Category must be at least 2 characters.'
        }

        if (trimmedValue.length > 50) {
          return 'Category cannot exceed 50 characters.'
        }

        return ''

      case 'collection':
        if (!trimmedValue) {
          return 'Collection is required.'
        }

        if (trimmedValue.length < 2) {
          return 'Collection must be at least 2 characters.'
        }

        if (trimmedValue.length > 50) {
          return 'Collection cannot exceed 50 characters.'
        }

        return ''

      case 'stock': {
        if (trimmedValue === '') {
          return 'Stock is required.'
        }

        const stock = Number(trimmedValue)

        if (!Number.isInteger(stock) || stock < 0) {
          return 'Stock must be a whole number of 0 or more.'
        }

        if (stock > 1000000) {
          return 'Stock value is too high.'
        }

        return ''
      }

      case 'description':
        if (trimmedValue.length > 1000) {
          return 'Description cannot exceed 1000 characters.'
        }

        return ''

      default:
        return ''
    }
  }

  function validateForm() {
    const fields = [
      'productId',
      'name',
      'price',
      'mrp',
      'discount',
      'category',
      'collection',
      'stock',
      'description',
    ]

    const newErrors = {}

    fields.forEach((field) => {
      const fieldError = validateField(
        field,
        formData[field],
        formData
      )

      if (fieldError) {
        newErrors[field] = fieldError
      }
    })

    if (!formData.image) {
      newErrors.image = 'Product image is required.'
    }

    setErrors(newErrors)

    setTouched({
      productId: true,
      name: true,
      price: true,
      mrp: true,
      discount: true,
      category: true,
      collection: true,
      stock: true,
      description: true,
      image: true,
    })

    return Object.keys(newErrors).length === 0
  }

  function handleChange(event) {
    const { name, value } = event.target

    let nextValue = value

    if (
      ['price', 'mrp', 'discount', 'stock'].includes(name)
    ) {
      nextValue = value.replace(/\D/g, '')
    }

    const nextData = {
      ...formData,
      [name]: nextValue,
    }

    setFormData(nextData)

    if (touched[name]) {
      setErrors((currentErrors) => ({
        ...currentErrors,
        [name]: validateField(
          name,
          nextValue,
          nextData
        ),
      }))
    }

    setError('')
    setMessage('')
  }

  function handleBlur(event) {
    const { name, value } = event.target

    setTouched((currentTouched) => ({
      ...currentTouched,
      [name]: true,
    }))

    setErrors((currentErrors) => ({
      ...currentErrors,
      [name]: validateField(
        name,
        value,
        formData
      ),
    }))
  }

  async function handleImageUpload(event) {
    const file = event.target.files?.[0]

    if (!file) {
      return
    }

    setError('')
    setMessage('')
    setErrors((currentErrors) => ({
      ...currentErrors,
      image: '',
    }))

    const allowedTypes = [
      'image/jpeg',
      'image/png',
      'image/webp',
      'image/jpg',
    ]

    if (!allowedTypes.includes(file.type)) {
      setErrors((currentErrors) => ({
        ...currentErrors,
        image: 'Only JPG, PNG or WebP images are allowed.',
      }))
      return
    }

    if (file.size > 10 * 1024 * 1024) {
      setErrors((currentErrors) => ({
        ...currentErrors,
        image: 'Image size must be 10 MB or less.',
      }))
      return
    }

    setUploadingImage(true)

    try {
      const uploadData = new FormData()
      uploadData.append('image', file)

      const response = await fetch(
        `${API_URL}/api/upload`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${localStorage.getItem(
              'adminToken'
            )}`,
          },
          body: uploadData,
        }
      )

      const data = await response.json()

      if (!response.ok) {
        throw new Error(
          data.message || 'Failed to upload image'
        )
      }

      setFormData((currentData) => ({
        ...currentData,
        image: data.imageUrl,
      }))

      setTouched((currentTouched) => ({
        ...currentTouched,
        image: true,
      }))

      setMessage('Image uploaded successfully.')
    } catch (error) {
      console.error(error)

      setErrors((currentErrors) => ({
        ...currentErrors,
        image: error.message,
      }))
    } finally {
      setUploadingImage(false)
    }
  }

  async function handleSubmit(event) {
    event.preventDefault()

    setMessage('')
    setError('')

    if (!validateForm()) {
      setError(
        'Please fix the highlighted fields before adding the product.'
      )
      return
    }

    try {
      setLoading(true)

      const response = await fetch(
        `${API_URL}/api/products`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem(
              'adminToken'
            )}`,
          },
          body: JSON.stringify({
            ...formData,
            productId: formData.productId.trim(),
            name: formData.name.trim(),
            category: formData.category.trim(),
            collection: formData.collection.trim(),
            description: formData.description.trim(),
            price: Number(formData.price),
            mrp: Number(formData.mrp),
            discount:
              Number(formData.discount) || 0,
            stock:
              Number(formData.stock) || 0,
          }),
        }
      )

      const data = await response.json()

      if (!response.ok) {
        throw new Error(
          data.error ||
            data.message ||
            'Failed to create product'
        )
      }

      setMessage('Product added successfully.')

      setTimeout(() => {
        navigate('/admin/products')
      }, 800)
    } catch (error) {
      console.error(error)
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  function getInputClass(name) {
    const hasError =
      touched[name] && errors[name]

    return `mt-2 w-full rounded-xl border bg-[#FFFCF7] px-4 py-3 text-sm text-[#351B19] outline-none transition placeholder:text-[#A2948D] ${
      hasError
        ? 'border-[#C97878] focus:border-[#A94B4B] focus:ring-4 focus:ring-[#A94B4B]/10'
        : 'border-[#DCCDC0] focus:border-[#54244F] focus:ring-4 focus:ring-[#54244F]/10'
    }`
  }

  function renderError(name) {
    if (!touched[name] || !errors[name]) {
      return null
    }

    return (
      <p className="mt-1.5 text-xs font-medium text-[#A94B4B]">
        {errors[name]}
      </p>
    )
  }

  return (
    <main className="min-h-screen bg-[#F8F1E5] px-4 py-6 md:px-8 md:py-8">

      <div className="mx-auto max-w-5xl">

        {/* HEADER */}
        <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">

          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#B85C38]">
              Admin • Products
            </p>

            <h1 className="mt-2 text-3xl font-bold tracking-tight text-[#351B19] md:text-4xl">
              Add Product
            </h1>

            <p className="mt-2 max-w-xl text-sm leading-6 text-[#806F67]">
              Add a new rangoli product to your DwijasKalaRekha
              store.
            </p>
          </div>

          <button
            type="button"
            onClick={() => navigate('/admin/products')}
            className="w-fit rounded-xl border border-[#D9C9BA] bg-[#FFFDF8] px-4 py-2.5 text-sm font-semibold text-[#54244F] transition hover:border-[#54244F] hover:bg-[#54244F] hover:text-white"
          >
            ← Products
          </button>

        </div>

        {/* SUCCESS */}
        {message && (
          <div className="mb-5 rounded-2xl border border-[#D8E3CC] bg-[#EEF4E8] px-5 py-4 text-sm font-semibold text-[#52613B]">
            {message}
          </div>
        )}

        {/* ERROR */}
        {error && (
          <div className="mb-5 rounded-2xl border border-[#E7CACA] bg-[#FBEEEE] px-5 py-4 text-sm font-medium text-[#8A4141]">
            {error}
          </div>
        )}

        {/* FORM */}
        <form
          onSubmit={handleSubmit}
          noValidate
          className="overflow-hidden rounded-[28px] border border-[#E4D6C8] bg-[#FFFDF8] shadow-[0_12px_40px_rgba(75,45,35,0.06)]"
        >

          <div className="h-2 bg-[#54244F]" />

          {/* BASIC INFORMATION */}
          <section className="border-b border-[#E9DED4] p-5 md:p-7">

            <div className="mb-6">
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#B85C38]">
                01
              </p>

              <h2 className="mt-1 text-xl font-bold text-[#351B19]">
                Basic Information
              </h2>

              <p className="mt-1 text-sm text-[#806F67]">
                Give the product a clear identity.
              </p>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">

              {/* PRODUCT ID */}
              <div>
                <label
                  htmlFor="productId"
                  className="text-sm font-semibold text-[#40312D]"
                >
                  Product ID
                  <span className="ml-1 text-[#B85C38]">
                    *
                  </span>
                </label>

                <input
                  id="productId"
                  type="text"
                  name="productId"
                  value={formData.productId}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="RNG-002"
                  maxLength={40}
                  className={getInputClass('productId')}
                />

                {renderError('productId')}
              </div>

              {/* NAME */}
              <div>
                <label
                  htmlFor="name"
                  className="text-sm font-semibold text-[#40312D]"
                >
                  Product Name
                  <span className="ml-1 text-[#B85C38]">
                    *
                  </span>
                </label>

                <input
                  id="name"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Royal Peacock Rangoli"
                  maxLength={100}
                  className={getInputClass('name')}
                />

                {renderError('name')}
              </div>

            </div>

          </section>

          {/* PRICING */}
          <section className="border-b border-[#E9DED4] p-5 md:p-7">

            <div className="mb-6">
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#B85C38]">
                02
              </p>

              <h2 className="mt-1 text-xl font-bold text-[#351B19]">
                Pricing
              </h2>

              <p className="mt-1 text-sm text-[#806F67]">
                Set the selling price and stock value.
              </p>
            </div>

            <div className="grid gap-5 sm:grid-cols-3">

              {/* PRICE */}
              <div>
                <label
                  htmlFor="price"
                  className="text-sm font-semibold text-[#40312D]"
                >
                  Selling Price
                  <span className="ml-1 text-[#B85C38]">
                    *
                  </span>
                </label>

                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm font-semibold text-[#806F67]">
                    ₹
                  </span>

                  <input
                    id="price"
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="449"
                    min="1"
                    max="1000000"
                    inputMode="numeric"
                    className={`${getInputClass(
                      'price'
                    )} pl-9`}
                  />
                </div>

                {renderError('price')}
              </div>

              {/* MRP */}
              <div>
                <label
                  htmlFor="mrp"
                  className="text-sm font-semibold text-[#40312D]"
                >
                  MRP
                  <span className="ml-1 text-[#B85C38]">
                    *
                  </span>
                </label>

                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm font-semibold text-[#806F67]">
                    ₹
                  </span>

                  <input
                    id="mrp"
                    type="number"
                    name="mrp"
                    value={formData.mrp}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="599"
                    min="1"
                    max="1000000"
                    inputMode="numeric"
                    className={`${getInputClass(
                      'mrp'
                    )} pl-9`}
                  />
                </div>

                {renderError('mrp')}
              </div>

              {/* DISCOUNT */}
              <div>
                <label
                  htmlFor="discount"
                  className="text-sm font-semibold text-[#40312D]"
                >
                  Discount
                </label>

                <div className="relative">
                  <input
                    id="discount"
                    type="number"
                    name="discount"
                    value={formData.discount}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="20"
                    min="0"
                    max="100"
                    inputMode="numeric"
                    className={`${getInputClass(
                      'discount'
                    )} pr-9`}
                  />

                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-semibold text-[#806F67]">
                    %
                  </span>
                </div>

                {renderError('discount')}
              </div>

            </div>

          </section>

          {/* CATEGORY */}
          <section className="border-b border-[#E9DED4] p-5 md:p-7">

            <div className="mb-6">
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#B85C38]">
                03
              </p>

              <h2 className="mt-1 text-xl font-bold text-[#351B19]">
                Classification
              </h2>

              <p className="mt-1 text-sm text-[#806F67]">
                Organize the product for your shop.
              </p>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">

              <div>
                <label
                  htmlFor="category"
                  className="text-sm font-semibold text-[#40312D]"
                >
                  Category
                  <span className="ml-1 text-[#B85C38]">
                    *
                  </span>
                </label>

                <input
                  id="category"
                  type="text"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Floral"
                  maxLength={50}
                  className={getInputClass('category')}
                />

                {renderError('category')}
              </div>

              <div>
                <label
                  htmlFor="collection"
                  className="text-sm font-semibold text-[#40312D]"
                >
                  Collection
                  <span className="ml-1 text-[#B85C38]">
                    *
                  </span>
                </label>

                <input
                  id="collection"
                  type="text"
                  name="collection"
                  value={formData.collection}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Diwali"
                  maxLength={50}
                  className={getInputClass('collection')}
                />

                {renderError('collection')}
              </div>

            </div>

          </section>

          {/* STOCK + IMAGE */}
          <section className="border-b border-[#E9DED4] p-5 md:p-7">

            <div className="mb-6">
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#B85C38]">
                04
              </p>

              <h2 className="mt-1 text-xl font-bold text-[#351B19]">
                Inventory & Image
              </h2>

              <p className="mt-1 text-sm text-[#806F67]">
                Add available stock and the product photo.
              </p>
            </div>

            {/* STOCK */}
            <div className="max-w-sm">
              <label
                htmlFor="stock"
                className="text-sm font-semibold text-[#40312D]"
              >
                Stock
                <span className="ml-1 text-[#B85C38]">
                  *
                </span>
              </label>

              <input
                id="stock"
                type="number"
                name="stock"
                value={formData.stock}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="10"
                min="0"
                max="1000000"
                inputMode="numeric"
                className={getInputClass('stock')}
              />

              {renderError('stock')}
            </div>

            {/* IMAGE */}
            <div className="mt-6">

              <label
                htmlFor="productImage"
                className="text-sm font-semibold text-[#40312D]"
              >
                Product Image
                <span className="ml-1 text-[#B85C38]">
                  *
                </span>
              </label>

              <input
                id="productImage"
                type="file"
                accept="image/jpeg,image/png,image/webp"
                onChange={handleImageUpload}
                disabled={uploadingImage}
                className="mt-2 block w-full cursor-pointer rounded-xl border border-[#DCCDC0] bg-[#FFFCF7] text-sm text-[#675953] file:mr-4 file:border-0 file:bg-[#F3E9DD] file:px-4 file:py-3 file:text-sm file:font-semibold file:text-[#54244F] hover:file:bg-[#E9DDD0]"
              />

              <p className="mt-2 text-xs text-[#91827A]">
                JPG, PNG or WebP • Maximum 10 MB
              </p>

              {uploadingImage && (
                <div className="mt-4 rounded-xl border border-[#E7D6A8] bg-[#FFF6DF] px-4 py-3 text-sm font-medium text-[#8B6A25]">
                  Uploading image...
                </div>
              )}

              {touched.image && errors.image && (
                <p className="mt-2 text-xs font-medium text-[#A94B4B]">
                  {errors.image}
                </p>
              )}

              {formData.image && !uploadingImage && (
                <div className="mt-5 overflow-hidden rounded-2xl border border-[#E4D6C8] bg-[#F8F1E5]">

                  <div className="border-b border-[#E4D6C8] px-4 py-3">
                    <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#806F67]">
                      Image Preview
                    </p>
                  </div>

                  <div className="p-4">
                    <img
                      src={formData.image}
                      alt="Product preview"
                      className="h-64 w-full rounded-xl object-cover sm:h-80"
                    />
                  </div>

                </div>
              )}

            </div>

          </section>

          {/* DESCRIPTION */}
          <section className="p-5 md:p-7">

            <div className="mb-6">
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#B85C38]">
                05
              </p>

              <h2 className="mt-1 text-xl font-bold text-[#351B19]">
                Product Story
              </h2>

              <p className="mt-1 text-sm text-[#806F67]">
                Tell customers what makes this rangoli special.
              </p>
            </div>

            <label
              htmlFor="description"
              className="text-sm font-semibold text-[#40312D]"
            >
              Description
            </label>

            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Describe the rangoli design, material, handmade details, reusability, size, or ideal occasion..."
              rows={6}
              maxLength={1000}
              className={`${getInputClass(
                'description'
              )} resize-none`}
            />

            <div className="mt-2 flex justify-between gap-4">
              {renderError('description') || (
                <span className="text-xs text-[#91827A]">
                  Optional
                </span>
              )}

              <span className="text-xs text-[#91827A]">
                {formData.description.length}/1000
              </span>
            </div>

          </section>

          {/* SUBMIT */}
          <div className="border-t border-[#E9DED4] bg-[#F8F1E5] p-5 md:p-7">

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

              <div>
                <p className="text-sm font-semibold text-[#40312D]">
                  Ready to add this product?
                </p>

                <p className="mt-1 text-xs text-[#806F67]">
                  Required fields are marked with *
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">

                <button
                  type="button"
                  onClick={() =>
                    navigate('/admin/products')
                  }
                  className="rounded-xl border border-[#D9C9BA] bg-[#FFFDF8] px-6 py-3.5 text-sm font-semibold text-[#675953] transition hover:border-[#54244F] hover:text-[#54244F]"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={loading || uploadingImage}
                  className="rounded-xl bg-[#54244F] px-7 py-3.5 text-sm font-bold text-white transition hover:bg-[#421B3E] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading
                    ? 'Adding Product...'
                    : uploadingImage
                      ? 'Uploading Image...'
                      : 'Add Product'}
                </button>

              </div>

            </div>

          </div>

        </form>

      </div>
    </main>
  )
}

export default AddProduct