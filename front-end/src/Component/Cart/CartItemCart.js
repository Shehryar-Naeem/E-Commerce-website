import React from "react"
import { Link } from "react-router-dom"
import "./cartItemCart.css"
const CartItemCart =({item,deleteCartItem})=>{
    return (
        <>
            <div className="cart_item_cart">
                <img src={item.image} alt="profile"/>
                <div>
                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                    <span>{item.price}</span>
                    <p onClick={()=>deleteCartItem(item.product)}>Remove</p>
                </div>
            </div>
        </>
    )
}
export default CartItemCart