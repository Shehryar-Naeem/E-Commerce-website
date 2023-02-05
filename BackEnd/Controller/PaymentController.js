const AsyncError = require("../MiddlerWare/AsyncError")
const stripe = require("stripe");
const Stripe = new stripe("sk_test_51MVeiwJzWIMRS0BQihN4b96WQK2mSvYxIWeReXWyGSDDC56pc8MdsiElXEf3Oq5d7xCEfim6l1ryiwKVrV86vdOF00q5tAVYM1")

const proceedToPayment = AsyncError(async (req, res, next) => {
  const myPayment = await Stripe.paymentIntents.create({
    amount: req.body.amount,
    currency: "pkr",
    metadata: {
      company: "Ecommerce",
    },
    automatic_payment_methods: {enabled: true},
  });
  res
    .status(200)
    .json({ success: true, client_secret: myPayment.client_secret });
});

const sendStripeApiKey = AsyncError(async (req, res, next) => {
  res.status(200).json({ stripeApiKey: process.env.STRIPE_API_KEY });
});
module.exports = {proceedToPayment,sendStripeApiKey}


