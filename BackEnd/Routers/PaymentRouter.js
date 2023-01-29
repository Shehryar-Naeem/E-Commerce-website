const express = require("express")
const { proceedToPayment, sendStripeApiKey } = require("../Controller/PaymentController")
const { isAuthenticationUser } = require("../MiddlerWare/Authentication")
const router = express.Router()

router.route("/process/payment").post(isAuthenticationUser,proceedToPayment)
router.route("/stripeapikey").get(isAuthenticationUser,sendStripeApiKey)
module.exports = router