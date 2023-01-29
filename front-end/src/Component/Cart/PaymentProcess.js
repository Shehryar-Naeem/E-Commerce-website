import React,{useState,useEffect,useRef} from "react"
import CheckOutSteps from "../Cart/CheckOutStep"
import { useSelector,useDispatch } from "react-redux"
import MetaData from "../Layout/MetaData"
import { Typography } from "@material-ui/core"
import { useAlert } from "react-alert"
import {CardNumberElement, CardCvcElement, CardExpiryElement, useStripe, useElements} from "@stripe/react-stripe-js"
import axios from "axios"
import CreditCardIcon from "@material-ui/icons/CreditCard"
import EventIcon from "@material-ui/icons/Event"
import VpnKeyIcon from "@material-ui/icons/VpnKey"

const PaymentProcess =()=>{
    return (
        <>

        </>
    )
}

export default PaymentProcess