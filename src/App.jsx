import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { getUserProfile } from "./store/authSlice";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";

import LoginPage from "./pages/LoginPage/LoginPage";
import Navbar from "./components/Navbar/Navbar";
import AdminRoute from "./components/AdminRoute/AdminRoute";
import AdminPage from "./pages/AdminPage/AdminPage";
import ProductsPage from "./pages/ProductPage/ProductPage";
import ProductDetailPage from "./pages/ProductDetailPage/ProductDetailPage";
import CartPage from "./pages/CartPage/CartPage";
import WishlistPage from "./pages/WishlistPage/WishlistPage";
import CheckoutSuccessPage from "./pages/CheckoutSuccessPage/CheckoutSuccessPage";


function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserProfile());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<h1>Inicio</h1>} />

        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<h1>Registro</h1>} />

        <Route path="/products" element={<ProductsPage />} />
        <Route
          path="/products/:id"
          element={<ProductDetailPage />}
        />

        <Route element={<PrivateRoute />}>
          <Route path="/cart" element={<CartPage />} />
          <Route path="/wishlist" element={<WishlistPage />} />
          <Route path="/checkout" element={<h1>Checkout</h1>} />
          <Route path="/checkout/success" element={<CheckoutSuccessPage />}
          />
        </Route>
          <Route element={<AdminRoute />}>
        <Route
          path="/admin"
          element={<AdminPage />}
        />
      </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;