import React from "react";
import CheckCircleIcon from "@material-ui/icons/CheckCircle"
import "./orderSuccess.css"
import { Typography } from "@material-ui/core";
import { Link } from "react-router-dom";

const OrderSuccess=()=>{
    return (
        <>
            <div className="order_success">
                <CheckCircleIcon/>
                <Typography>Your order has been successfully placed.</Typography>
                <Link to="/order/me">View Order</Link>
            </div>
        </> 
    )
}

export default OrderSuccess