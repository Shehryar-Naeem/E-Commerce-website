import React from "react";
import { Link } from "react-router-dom";
import {CgMouse} from "react-icons/cg"
import Product from "./Product.js"
import MetaData from "../Layout/MetaData.js";
import "./Home.css"


const product ={
    name: "laptop workstation",
    image:[{url:"https://www.tejar.pk/media/catalog/product/cache/3/image/9df78eab33525d08d6e5fb8d27136e95/m/i/microsoft_surface_laptop_4_-_intel_core_i5_512gb_8gb_-_13.5_inch_-_ice_blue_-_1tejar_2.jpg"}],
    price:"$3000",
    _id:"bsf2000745"
}
const Home =()=>{
    return (
        <>
        <MetaData title="E-commerce"/>
            <div className="banner">
                <p>Welcome to Ecommerce</p>
                <h1>Find Amazing product below</h1>

                <Link to="/home">
                    <button>
                        Scroll <CgMouse/>
                    </button>
                </Link>
            </div>
            <h2 className="home_heading">
                Featured Product
            </h2>
            <div className="product_container" id="product_container">
                <Product product={product}/>
                <Product product={product}/>
                <Product product={product}/>
                <Product product={product}/>

                <Product product={product}/>
                <Product product={product}/>
                <Product product={product}/>
                <Product product={product}/>
                
            </div>
        </>
    )
}
export default Home;