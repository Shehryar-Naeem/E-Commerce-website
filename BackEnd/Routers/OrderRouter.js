const express = require("express");
const {
  orderProduct,
  getSingleOrder,
  getOrdersOfLogInUser,
  getAllOrder,
  updateOrder,
  deleteOrder,
} = require("../Controller/orderItemController");
const {
  isAuthenticationUser,
  AuthorizationRole,
} = require("../MiddlerWare/Authentication");
const Router = express.Router();

Router.route("/orderitem/new").post(isAuthenticationUser, orderProduct);

Router.route("/getsingleOrder/:id").get(
  isAuthenticationUser,
  // AuthorizationRole("admin"),
  getSingleOrder
);
Router.route("/orders/me").get(isAuthenticationUser, getOrdersOfLogInUser);
Router.route("/admin/getallproudct").get(
  isAuthenticationUser,
  AuthorizationRole("admin"),
  getAllOrder
);  
Router.route("/admin/order/:id")
  .put(isAuthenticationUser, AuthorizationRole("admin"), updateOrder)
  .delete(isAuthenticationUser, AuthorizationRole("admin"), deleteOrder);
module.exports = Router;
