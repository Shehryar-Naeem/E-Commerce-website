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

const App = () => {
  React.useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"]
      },
    });
  },[]);
  return (
    <> 
      <Router>
        <Headers />
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/singleproduct/:id" element={<ProductDetails/>}/>
          <Route path="/products" element={<Products/>}/>
          <Route path="/products/:keyword" element={<Products/>}/>

          <Route path="/search" element={<Search/>} />
          <Route path="/login" element={<SingUpLogin/>}/>
        </Routes>
      <Footer/>
      </Router>
    </>
  );
};

export default App;
