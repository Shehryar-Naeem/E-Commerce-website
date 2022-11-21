import React from "react";
import Headers from "./Component/Layout/Header/Headers.js";
import { BrowserRouter as Router,Routes,Route } from "react-router-dom";
import WebFont from "webfontloader";
import Footer from "./Component/Layout/Footer/Footer.js";
import Home from "./Component/Home/Home.js"
import ProductDetails from "./Component/Product/ProductDetails.js"
import "./App.css"

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
          <Route path="/products/:id" element={<ProductDetails/>}/>
        </Routes>
      <Footer/>
      </Router>
    </>
  );
};

export default App;
