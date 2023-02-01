import React, { useState } from "react";
import Headers from "./Component/Layout/Header/Headers.js";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import WebFont from "webfontloader";
import Footer from "./Component/Layout/Footer/Footer.js";
import Home from "./Component/Home/Home.js";
import ProductDetails from "./Component/Product/ProductDetails.js";
import Products from "./Component/Product/Products.js";
import Search from "./Component/Product/Search.js";
import "./App.css";
import SingUpLogin from "./Component/User/SignUPLogin.js";
import Store from "./Store";
import { LoadLoginUser } from "./Actions/UserAction.js";
import { useSelector } from "react-redux";
import UserOption from "./Component/Layout/Header/UserOption.js";
import Account from "./Component/User/Account.js";
import ProtectedRoute from "./Component/Route/ProtectedRoute.js";
import UpdateProfile from "./Component/User/UpdateProfile.js";
import UpdatePassword from "./Component/User/UpdatePassword.js";
import ForgetPassword from "./Component/User/ForgetPassword.js";
import ResetPassword from "./Component/User/ResetPassword.js";
import Cart from "./Component/Cart/Cart.js";
import Shipping from "./Component/Cart/Shipping.js";
import ConfirmOrder from "./Component/Cart/ConfirmOrder.js";
import PaymentProcess from "./Component/Cart/PaymentProcess.js";
import axios from "axios";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
const App = () => {
  const { isAuthenicated, user } = useSelector((state) => state.loginUser);
  const [stripeApiKey, setStripeApiKey] = useState("");
  const [stripeSecretKey, setStripeSecretKey] = useState("");
  const getStripeApiKey= async()=>{
    const { data } = await axios.get("/api/payment/stripeapikey");
    setStripeApiKey(data.stripeApiKey)
    setStripeSecretKey(data.stripeSecretKey)
  }
  React.useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });
    Store.dispatch(LoadLoginUser());
    getStripeApiKey();
  }, []);
  return (
    <>
      <Router>
        <Headers />
        {isAuthenicated && <UserOption user={user} />}
        {
          stripeApiKey && <Elements stripe={loadStripe(stripeApiKey)}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/singleproduct/:id" element={<ProductDetails />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:keyword" element={<Products />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/account" element={<Account />} />
            </Route>
            <Route element={<ProtectedRoute />}>
              <Route path="/me/update" element={<UpdateProfile />} />
            </Route>
            <Route element={<ProtectedRoute />}>
              <Route path="/update/password" element={<UpdatePassword />} />
            </Route>
            <Route element={<ProtectedRoute />}>
              <Route path="/shipping" element={<Shipping />} />
            </Route>
            <Route element={<ProtectedRoute />}>
              <Route path="/order/confirm" element={<ConfirmOrder />} />
            </Route>
              <Route element={<ProtectedRoute />}>
                
                <Route path="/process/payment" element={<PaymentProcess stripeSecretKey={stripeSecretKey}/>} />
                
              </Route>
    
            <Route path="/password/forget" element={<ForgetPassword />} />
            <Route path="/password/reset/:token" element={<ResetPassword />} />
            <Route path="/search" element={<Search />} />
            <Route path="/login" element={<SingUpLogin />} />
            <Route path="/Cart" element={<Cart />} />
          </Routes>
          </Elements>
        }
        <Footer />
      </Router>
    </>
  );
};

export default App;
