import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import Navbar from "./components/Navbar";
import { useLocation } from "react-router-dom";
import { AppContext } from "./context/AppContext";
import { useContext } from "react";
import Auth from "./modals/Auth";

import MyOrders from "./pages/MyOrders";
const App = () => {
  const isSellerPath = useLocation().pathname.includes("seller");
  const { isSeller, showUserLogin } = useContext(AppContext);
  return (
    <>
      <div className="text-default">
        {isSellerPath ? null : <Navbar />}
        {showUserLogin ? <Auth /> : null}
      </div>
      <div className={"px-6 md:px-16 lg:px-24 xl:px-32"}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/my-orders" element={<MyOrders />} />
        </Routes>
      </div>
    </>
  );
};

export default App;
