import React from "react";
import Headers from "./Component/Layout/Header/Headers.js";
import { BrowserRouter as Router,Routes,Route } from "react-router-dom";
import WebFont from "webfontloader";
import Footer from "./Component/Layout/Footer/Footer.js";
import Home from "./Component/Home/Home.js"
import ProductDetails from "./Component/Product/ProductDetails.js"
import Products from "./Component/Product/Products.js"
import Search from "./Component/Product/Search.js"
import "./App.css"
import SingUpLogin from "./Component/User/SignUPLogin.js";
import Store from "./Store"
import { LoadLoginUser } from "./Actions/UserAction.js";
import { useSelector } from "react-redux";
import UserOption from "./Component/Layout/Header/UserOption.js";
import Account from "./Component/User/Account.js"
import ProtectedRoute from "./Component/Route/ProtectedRoute.js";
import UpdateProfile from "./Component/User/UpdateProfile.js"
import UpdatePassword from "./Component/User/UpdatePassword.js"
const App = () => {
  const {isAuthenicated,user}= useSelector(state=>state.loginUser)
  React.useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"]
      },
    });
    Store.dispatch(LoadLoginUser())
  },[]);
  return (
    <> 
      <Router>
        <Headers />
        {isAuthenicated && <UserOption user={user}/>}
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/singleproduct/:id" element={<ProductDetails/>}/>
          <Route path="/products" element={<Products/>}/>
          <Route path="/products/:keyword" element={<Products/>}/>
          <Route element={<ProtectedRoute/>}>

          <Route path="/account" element={<Account/>}/>
          </Route>
          <Route element={<ProtectedRoute/>}>
            <Route path="/me/update" element={<UpdateProfile/>}/>
          </Route>
          <Route element={<ProtectedRoute/>}>
            <Route path="/update/password" element={<UpdatePassword/>}/>
          </Route>
          <Route path="/search" element={<Search/>} />
          <Route path="/login" element={<SingUpLogin/>}/>
        </Routes>
      <Footer/>
      </Router>
    </>
  );
};

export default App;
