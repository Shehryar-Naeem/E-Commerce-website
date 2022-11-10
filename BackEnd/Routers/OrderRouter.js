const express= require("express")
const { orderProduct, getSingleOrder, getOrdersOfLogInUser } = require("../Controller/orderItemController")
const { isAuthenticationUser, AuthorizationRole } = require("../MiddlerWare/Authentication")
const Router = express.Router()


Router.route("/orderitem/new").post(isAuthenticationUser,orderProduct)

Router.route("/getsingleOrderbyadmin/:id").get(isAuthenticationUser,AuthorizationRole("admin"),getSingleOrder)
Router.route("/orders/me").get(isAuthenticationUser,getOrdersOfLogInUser)

module.exports= Router