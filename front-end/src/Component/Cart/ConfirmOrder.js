import React from "react"
import "./ConfirmOrder.css"
import CheckOutStep from "./CheckOutStep"
import MetaData from "../Layout/MetaData"
import { useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { Typography } from "@material-ui/core"

const ConfirmOrder=()=>{
  const navigate = useNavigate()
    const {cartitems,shippingInfo} = useSelector(state=>state.Cart)
    const {user} = useSelector(state=>state.loginUser)
    const subTotal = cartitems.reduce((acc,item)=> acc + item.quantity * item.price,0)
    
    const shippingCharges = subTotal < 1000 ? 0 :200
    const tax= subTotal * 0.10
    const totalPrice = subTotal + shippingCharges + tax 
    const address = `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.state}, ${shippingInfo.pinCode} ${shippingInfo.country}`
    const proceedToPayment=(e)=>{
      const data={
        shippingCharges,
        tax,
        totalPrice,
        address
      }
      sessionStorage.setItem("orderInfo",JSON.stringify(data))
      navigate("/process/payment")
    }
    return (
        <>
          <MetaData title="Confirm Order" />
      <CheckOutStep activeStep={1} />
      <div className="confirm_order_page">
        <div>
          <div className="confirm_shipping_area">
            <Typography>Shipping Info</Typography>
            <div className="confirm_shipping_area_box">
              <div>
                <p>Name:</p>
                <span>{user.name}</span>
              </div>
              <div>
                <p>Phone:</p>
                <span>{shippingInfo.phone}</span>
              </div>
              <div>
                <p>Address:</p>
                <span>{address}</span>
              </div>
            </div>
          </div>
          <div className="confirm_cartItems">
            <Typography>Your Cart Items:</Typography>
            <div className="confirm_cartItems_container">
              {cartitems &&
                cartitems.map((item) => (
                  <div key={item.product}>
                    <img src={item.image} alt="Product" />
                    <Link to={`/singleproduct/${item.product}`}>
                      {item.name}
                    </Link>{" "}
                    <span>
                      {item.quantity} X ₹{item.price} ={" "}
                      <b>₹{item.price * item.quantity}</b>
                    </span>
                  </div>
                ))}
            </div>
          </div>
        </div>
        {/*  */}
        <div>
          <div className="order_summary">
            <Typography>Order Summery</Typography>
            <div>
              <div>
                <p>Subtotal:</p>
                <span>₹{subTotal}</span>
              </div>
              <div>
                <p>Shipping Charges:</p>
                <span>₹{shippingCharges}</span>
              </div>
              <div>
                <p>GST:</p>
                <span>₹{tax}</span>
              </div>
            </div>

            <div className="order_summary_total">
              <p>
                <b>Total:</b>
              </p>
              <span>₹{totalPrice}</span>
            </div>

            <button onClick={proceedToPayment}>Proceed To Payment</button>
          </div>
        </div>
      </div>

        </>
    )
}
export default ConfirmOrder