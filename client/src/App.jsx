import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import Navbar from "./components/Navbar";
import { useLocation } from "react-router-dom";
import { AppContext } from "./context/AppContext";
import { useContext } from "react";
import Auth from "./modals/Auth";
import ProductCategory from "./pages/ProductCategory";
import ProductDetails from "./pages/ProductDetails";
import Footer from "./components/Footer";
import MyOrders from "./pages/MyOrders";
import { Toaster } from "react-hot-toast";


const App = () => {
  const isSellerPath = useLocation().pathname.includes("seller");
  const { isSeller, showUserLogin } = useContext(AppContext);
  return (
    <>
      <div className="text-default">
        {isSellerPath ? null : <Navbar />}
        {showUserLogin ? <Auth /> : null}
      <Toaster />
      </div>
      <div className={"px-6 md:px-16 lg:px-24 xl:px-32"}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/product/:category/:id" element={<ProductDetails />} />
          <Route path="/products/:category" element={<ProductCategory />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/my-orders" element={<MyOrders />} />
        </Routes>
      </div>
            {isSellerPath ? null : <Footer />}
    </>
  );
};

export default App;
