import { createContext, useContext, useEffect, useState } from 'react'

const WishlistContext = createContext()

export function WishlistProvider({ children }) {
  const [wishlistItems, setWishlistItems] = useState(() => {
    const savedWishlist = localStorage.getItem(
      'dwijasKalaRekhaWishlist'
    )

    return savedWishlist ? JSON.parse(savedWishlist) : []
  })

  useEffect(() => {
    localStorage.setItem(
      'dwijasKalaRekhaWishlist',
      JSON.stringify(wishlistItems)
    )
  }, [wishlistItems])

  function toggleWishlist(product) {
    setWishlistItems((currentItems) => {
      const exists = currentItems.some(
        (item) => item.productId === product.productId
      )

      if (exists) {
        return currentItems.filter(
          (item) => item.productId !== product.productId
        )
      }

      return [...currentItems, product]
    })
  }

  function isInWishlist(productId) {
    return wishlistItems.some(
      (item) => item.productId === productId
    )
  }

  return (
    <WishlistContext.Provider
      value={{
        wishlistItems,
        toggleWishlist,
        isInWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  )
}

export function useWishlist() {
  return useContext(WishlistContext)
}