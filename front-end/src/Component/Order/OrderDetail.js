import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import { Link, useParams } from "react-router-dom";
import {
  clearErrorAction,
  orderDetailAction,
} from "../../Actions/orderItemAction";
import { Typography } from "@material-ui/core";
import MetaData from "../Layout/MetaData";
import LoadingComp from "../Layout/Loader/Loading";
import "./orderDetail.css"
const OrderDetail = () => {
  const { loading, error, order } = useSelector(
    (state) => state.getOrderDetail
  );
  const alert = useAlert();
  const dispatch = useDispatch();
  const { id } = useParams();
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrorAction());
    }
    dispatch(orderDetailAction(id));
  }, [error, id, alert, dispatch]);
  return (
    <>
      {loading ? (
        <LoadingComp />
      ) : (
        <>
          <MetaData title={"order detail"} />
          <div className="order_details_page">
            <div className="order_details_container">
              <Typography component={"h1"}>
                Order # {order && order._id}
              </Typography>
              <Typography>Shipping Info</Typography>
              <div className="order_details_container_box">
                <div>
                  <p>Name</p>
                  <span>{order.user && order.user.name}</span>
                </div>
                <div>
                  <p>Phone No</p>
                  <span>{order.shippingInfo && order.shippingInfo.phone}</span>
                </div>
                <div>
                  <p>Address</p>
                  <span>
                    {order.shippingInfo &&
                      `${order.shippingInfo.address}, ${order.shippingInfo.city}, ${order.shippingInfo.state}, ${order.shippingInfo.postalCode} ${order.shippingInfo.country}}`}
                  </span>
                </div>
              </div>
              <Typography>Payment</Typography>
              <div className="order_details_container_box">
                <div>
                  <p
                    className={
                      order.shippingInfo &&
                      order.shippingInfo.status === "succeeded"
                        ? "greenColor"
                        : "redColor"
                    }
                  >
                    {order.shippingInfo &&
                    order.shippingInfo.status === "succeeded"
                      ? "Paid"
                      : "No Paid"}
                  </p>
                </div>
                <div>
                  <p>Amount</p>
                  <span>{order.totalPrice && order.totalPrice}</span>
                </div>
              </div>
              <Typography>Order Status</Typography>
              <div className="order_details_container_box">
                <div>
                  <p
                    className={
                      order.orderStatus && order.orderStatus === "deliverd"
                        ? "greenColor"
                        : "redColor"
                    }
                  >
                    {order.orderStatus && order.orderStatus}
                  </p>
                </div>
              </div>
            </div>
            <div className="order_details_cart_items">
                <Typography>Order Items</Typography>
                <div className="order_details_cart_items_container">
                    {
                        order.orderItem && order.orderItem.map((item)=>(
                            <div key={item.product}>
                                <img src={item.image} alt="product"/>
                                <Link to={`/product/${item.product}`}>
                                    {item.name}
                                </Link>
                                <span>
                                    {item.quantity}  x ₹{item.price} - 
                                    <b>₹ {item.price * item.quantity}</b>
                                </span>
                            </div>
                        ))
                    }
                </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default OrderDetail;
