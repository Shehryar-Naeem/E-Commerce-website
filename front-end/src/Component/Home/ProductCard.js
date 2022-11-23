import React from "react";
import ReactStars from "react-rating-stars-component"
import { Link } from "react-router-dom";

const ProductCard =({product})=>{
    const options ={
        edit:false,
        color:"rgba(20,20,20,0.1)",
        activeColor:"tomato",
        value:product.ratings,
        isHalf:true,
        size:window.innerWidth< 600? 10 : 20
    
    }
    return (
        <>
            <Link to={`singleproduct/${product._id}`} className="product_card">
                <img src={product.images[0].img_url} alt={product.name}/>
                <p>{product.name}</p>
                <div>
                    <ReactStars {...options}/>
                    <span>{product.noOfReviews} reviews</span>
                </div>
                <span>{`₹${product.price}`}</span>
            </Link> 
        </>
    )
}

export default ProductCard;