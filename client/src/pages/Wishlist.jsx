import { Link } from 'react-router-dom'
import ProductCard from '../components/ProductCard'
import { useWishlist } from '../context/WishlistContext'

function Wishlist() {
  const { wishlistItems } = useWishlist()

  return (
    <main className="min-h-screen bg-[#faf7f2] px-6 py-12">
      <div className="mx-auto max-w-7xl">

        {/* Page Header */}
        <div className="mb-10">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#9a806b]">
            Your Saved Designs
          </p>

          <h1 className="mt-2 text-4xl font-bold text-[#35251d]">
            Wishlist
          </h1>

          <p className="mt-3 text-[#6f625a]">
            Save your favourite rangoli designs and come back to them anytime.
          </p>
        </div>

        {/* Empty Wishlist */}
        {wishlistItems.length === 0 ? (
          <div className="rounded-3xl border border-[#eadfd5] bg-white px-6 py-20 text-center">
            <div className="text-6xl">♡</div>

            <h2 className="mt-5 text-2xl font-semibold text-[#35251d]">
              Your wishlist is empty
            </h2>

            <p className="mx-auto mt-2 max-w-md text-[#6f625a]">
              Save the rangoli designs you love and they will appear here.
            </p>

            <Link
              to="/shop"
              className="mt-7 inline-block rounded-full bg-[#6f1d1b] px-7 py-3 text-sm font-semibold text-white transition hover:bg-[#581716]"
            >
              Explore Rangoli
            </Link>
          </div>
        ) : (
          <>
            {/* Wishlist Count */}
            <div className="mb-6 text-sm text-[#6f625a]">
              You have{' '}
              <span className="font-semibold text-[#35251d]">
                {wishlistItems.length}
              </span>{' '}
              saved{' '}
              {wishlistItems.length === 1 ? 'design' : 'designs'}.
            </div>

            {/* Wishlist Products */}
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {wishlistItems.map((product) => (
                <ProductCard
                  key={product.productId}
                  product={product}
                />
              ))}
            </div>
          </>
        )}

      </div>
    </main>
  )
}

export default Wishlist