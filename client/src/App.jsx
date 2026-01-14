import { Routes, Route, useLocation } from "react-router-dom";
import { useContext } from "react";
import { Toaster } from "react-hot-toast";

import Home from "./pages/Home";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import Navbar from "./components/Navbar";
import Auth from "./modals/Auth";
import ProductCategory from "./pages/ProductCategory";
import ProductDetails from "./pages/ProductDetails";
import Footer from "./components/Footer";
import MyOrders from "./pages/MyOrders";
import AddAddress from "./pages/AddAddress";

import SellerLayout from "./pages/seller/SellerLayout";
import SellerLogin from "./components/seller/SellerLogin";
import AddProduct from "./pages/seller/AddProduct";
import ProductList from "./pages/seller/ProductList";
import Orders from "./pages/seller/Orders";

import { AppContext } from "./context/AppContext";

const App = () => {
  const location = useLocation();
  const isSellerPath = location.pathname.includes("seller");
  const { isSeller, showUserLogin } = useContext(AppContext);

  return (
    <>
      <div className="text-default">
        {!isSellerPath && <Navbar />}
        {showUserLogin && <Auth />}
        <Toaster />
      </div>

      <div className="px-6 md:px-16 lg:px-24 xl:px-32">
        <Routes>
          {/* USER ROUTES */}
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:category" element={<ProductCategory />} />
          <Route path="/product/:category/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/my-orders" element={<MyOrders />} />
          <Route path="/add-address" element={<AddAddress />} />

          {/* SELLER ROUTES */}
          <Route
            path="/seller"
            element={isSeller ? <SellerLayout /> : <SellerLogin />}
          >
            <Route index element={<AddProduct />} />
            <Route path="product-list" element={<ProductList />} />
            <Route path="orders" element={<Orders />} />
          </Route>
        </Routes>
      </div>

      {isSellerPath ? null : <Footer />}
    </>
  );
};

export default App;
