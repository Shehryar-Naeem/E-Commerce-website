import React from "react";
import Headers from "./Component/Layout/Header/Headers.js";
import { BrowserRouter as Router } from "react-router-dom";
import WebFont from "webfontloader";
import Footer from "./Component/Layout/Footer/Footer.js";
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
      </Router>
      <Footer/>
    </>
  );
};

export default App;
