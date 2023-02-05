import React,{useState,useEffect,useRef} from "react"
import CheckOutSteps from "../Cart/CheckOutStep"
import { useSelector,useDispatch } from "react-redux"
import MetaData from "../Layout/MetaData"
import { Typography } from "@material-ui/core"
import { useAlert } from "react-alert"
import {CardNumberElement, CardCvcElement, CardExpiryElement, useStripe, useElements} from "@stripe/react-stripe-js"
import {useNavigate} from "react-router-dom"
import axios from "axios"
import CreditCardIcon from "@material-ui/icons/CreditCard"
import EventIcon from "@material-ui/icons/Event"
import VpnKeyIcon from "@material-ui/icons/VpnKey"
import "./payment.css"
import { clearErrorAction, orderItemAction } from "../../Actions/orderItemAction"


const PaymentProcess =( )=>{
    const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"))
    const dispatch = useDispatch()
    const alert = useAlert()
    const stripe = useStripe()
    const elements = useElements();
    const payBtn= useRef()
    const navigate = useNavigate()

    const {shippingInfo,cartitems} = useSelector(state => state.Cart);
    const {user} = useSelector(state=>state.loginUser)
    const {error} = useSelector(state=>state.newOrder)
    const order={
      shippingInfo,
      orderItem:cartitems,
      itemPrice:orderInfo.subTotal,
      taxPrice:orderInfo.tax,
      shippingCharges: orderInfo.shippingCharges,
      totalPrice:orderInfo.totalPrice
    }
    const paymentData = {
      amount:Math.round(orderInfo.totalPrice*100)
    }

    useEffect(()=>{
      if(error){
        alert.error(error)
        dispatch(clearErrorAction())
      }
    },[error,alert,dispatch])

    const submitHandler = async (e) => {
        e.preventDefault();
    
        payBtn.current.disabled = true;
    
        try {
          const config = {
            headers: {
             
                
              "Content-Type": "application/json",
            },
          };
          const { data } = await axios.post(
            "/api/payment/process/payment",
            paymentData,
            config
          );
    
          const client_secret = data.client_secret;
          if (!stripe || !elements) return;
          const result = await stripe.confirmCardPayment(client_secret,{     payment_method: {
            card: elements.getElement(CardNumberElement),
            billing_details:{
              name:user.name,
              email:user.email,
              address:{
                line1:shippingInfo.address,
                city:shippingInfo.city,
                state:shippingInfo.state,
                postal_code:shippingInfo.postalCode,
                country:shippingInfo.country
              }
            }
          }}
       
      );
          console.log(result);
          if (result.error) {
              payBtn.current.disabled = false;    
              alert.error(result.error.message);
          } else {
            if (result.paymentIntent.status === "succeeded") {
              order.paymentInfo={
                id:result.paymentIntent.id,
                status: result.paymentIntent.status
              }
              dispatch(orderItemAction(order))
              navigate("/success");
            } else {
              alert.error("There's some issue while processing payment ");
            }
          }
        } catch (error) {
          payBtn.current.disabled = false;

          alert.error(error.response.data.error);
        }
      };
    
    return (
        <>
            <MetaData title="Payment process"/>
            <CheckOutSteps activeStep={2}/>
            <div className="payment_container">
                <form className="payment_form" onSubmit={(e)=>submitHandler(e)}>
                    <Typography>Payment Info</Typography>
                    <div>
                        <CreditCardIcon/>
                        <CardNumberElement className="payment_input"/>
                    </div>
                    <div>
                        <EventIcon/>
                        <CardExpiryElement className="payment_input"/>
                    </div>
                    <div>
                        <VpnKeyIcon/>
                        <CardCvcElement className="payment_input"/>
                    </div>
                    <input 
                        type="submit"
                        value={`Pay - ₹ ${orderInfo && orderInfo.totalPrice}`}
                        ref={payBtn}
                        className="payment_form_btn"
                        />
                </form>
            </div>   
        </>
    )
}

export default PaymentProcess