import React from "react";
import ReactStars from "react-rating-stars-component"
import { Link } from "react-router-dom";

const options ={
    edit:false,
    color:"rgba(20,20,20,0.1)",
    activeColor:"tomato",
    value:2.5,
    isHalf:true,
    size:window.innerWidth< 600? 10 : 25

}
const Product =({product})=>{
    return (
        <>
            <Link to={product._id} className="product_card">
                <img src={product.image[0].url} alt={product.name}/>
                <p>{product.name}</p>
                <div>
                    <ReactStars {...options}/>
                    <span>(256 Reviews)</span>
                </div>
                <span>{product.price}</span>
            </Link> 
        </>
    )
}

export default Product