import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { CartProvider } from './context/CartContext'
import { WishlistProvider } from './context/WishlistContext'
import OrderSuccess from './pages/OrderSuccess'
import Wishlist from './pages/Wishlist'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Shop from './pages/Shop'
import ProductDetails from './pages/ProductDetails'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import AdminProducts from './admin/AdminProducts'
import AddProduct from './admin/AddProduct'
import EditProduct from './admin/EditProduct'
import AdminLogin from './admin/AdminLogin'
import ProtectedAdminRoute from './admin/ProtectedAdminRoute'
import AdminOrders from './admin/AdminOrders'
import AdminOrderDetails from './admin/AdminOrderDetails'
import OrderPending from './pages/OrderPending'
function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <WishlistProvider>

          <Navbar />

          <Routes>
<Route
  path="/order-pending"
  element={<OrderPending />}
/>
            {/* Customer Routes */}
            <Route path="/" element={<Home />} />

            <Route path="/shop" element={<Shop />} />

            <Route
              path="/product/:id"
              element={<ProductDetails />}
            />

            <Route path="/cart" element={<Cart />} />

            <Route
              path="/wishlist"
              element={<Wishlist />}
            />

            {/* Admin Login */}
            <Route
              path="/admin/login"
              element={<AdminLogin />}
            />

            {/* Protected Admin Routes */}

            <Route
              path="/admin/products"
              element={
                <ProtectedAdminRoute>
                  <AdminProducts />
                </ProtectedAdminRoute>
              }
            />

            <Route
              path="/admin/products/add"
              element={
                <ProtectedAdminRoute>
                  <AddProduct />
                </ProtectedAdminRoute>
              }
            />

            <Route
              path="/admin/products/edit/:id"
              element={
                <ProtectedAdminRoute>
                  <EditProduct />
                </ProtectedAdminRoute>
              }
            />
<Route path="/checkout" element={<Checkout />} />
<Route
  path="/order-success"
  element={<OrderSuccess />}
/>
<Route
  path="/admin/orders"
  element={
    <ProtectedAdminRoute>
      <AdminOrders />
    </ProtectedAdminRoute>
  }
/>
<Route
  path="/admin/orders/:orderId"
  element={
    <ProtectedAdminRoute>
      <AdminOrderDetails />
    </ProtectedAdminRoute>
  }
/>

          </Routes>

          <Footer />

        </WishlistProvider>
      </CartProvider>
    </BrowserRouter>
  )
}

export default App