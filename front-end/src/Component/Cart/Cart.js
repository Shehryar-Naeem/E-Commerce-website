import React from "react";
import "./Cart.css";
import CartItemCart from "./CartItemCart.js";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCartAction,
  removeCartItemAction,
} from "../../Actions/CartAction";
import {Typography} from "@material-ui/core"
import RemoveShoppingCart from '@material-ui/icons/RemoveShoppingCart';

import { Link, useNavigate } from "react-router-dom";
import MetaData from "../Layout/MetaData";
const Cart = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const { cartitems } = useSelector((state) => state.Cart);
  const increamentQuantity = (id, quantity, stock) => {
    const newQuantity = quantity + 1;
    if (stock <= quantity) return;

    dispatch(addToCartAction(id, newQuantity));
  };
  const decreamentQuantity = (id, quantity) => {
    const newQuantity = quantity - 1;

    if (1 > newQuantity) return;
    dispatch(addToCartAction(id, newQuantity));
  };
  const deleteCartItem = (id) => {
    dispatch(removeCartItemAction(id));
  };
  const checkOutHandler =()=>{
    navigate("/login?redirect=shipping")
  }
  return (
    <>
    <MetaData title="Add to cart product page"/>
      {cartitems.length === 0 ? (
        <div className="empty_cart">
          <RemoveShoppingCart/>
          <Typography>No product in your cart</Typography>
          <Link to="/products">view product</Link>
        </div>
      ) : (
        <>
          <div className="cart_page">
            <div className="cart_heading">
              <span>Product</span>
              <span>Quantity</span>
              <span>SubTotal</span>
            </div>
            {cartitems &&
              cartitems.map((item) => {
                // console.log(item);
                return (
                  <div className="cart_container" key={item.product}>
                    <CartItemCart item={item} deleteCartItem={deleteCartItem} />
                    <div className="card_input">
                      <button
                        onClick={() =>
                          increamentQuantity(
                            item.product,
                            item.quantity,
                            item.stock
                          )
                        }
                      >
                        +
                      </button>
                      <input type="number" readOnly value={item.quantity} />
                      <button
                        onClick={() =>
                          decreamentQuantity(item.product, item.quantity)
                        }
                      >
                        -
                      </button>
                    </div>
                    <p className="cart_subtotal">{`${
                      item.price * item.quantity
                    }`}</p>
                  </div>
                );
              })}
            <div className="cart_gross_profit">
              <div></div>
              <div className="cart_gross_profit_box">
                <p>Gross profit</p>
                <p>{`₹${cartitems.reduce(
                  (acc, item) => acc + item.quantity * item.price,
                  0
                )}`}</p>
              </div>
              <div></div>
              <div className="checkout_btn">
                <button onClick={checkOutHandler}>check out</button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Cart;
