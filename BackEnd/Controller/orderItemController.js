const OrderModel = require("../Models/OrderItemModel");
const ErrorHandler = require("../Utils/ErrorHandler");
const AsyncError = require("../MiddlerWare/AsyncError");
const orderModel = require("../Models/OrderItemModel");

const orderProduct = AsyncError(async (req, res, next) => {
  const {
    shippingInfo,
    orderItem,
    paymentInfo,
    itemPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  const orderitem = await OrderModel.create({
    shippingInfo,
    orderItem,
    paymentInfo,
    itemPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    paidAt: Date.now(),
    user: req.user._id,
  });

  res.status(200).json({
    success: true,
    orderitem,
  });
});

// get single order

const getSingleOrder = AsyncError(async (req, res, next) => {
  const order = await orderModel
    .findById(req.params.id)
    .populate("user", "name email");

  if (!order) {
    return next(new ErrorHandler(`order not found on such id`, 404));
  }

  res.status(200).json({
    success: true,
    order,
  });
});

//get ordered of logged in user

const getOrdersOfLogInUser = AsyncError(async (req, res, next) => {
  const orders = await orderModel.find({ user: req.user._id });

  res.status(200).json({
    success: true,
    orders,
  });
});
module.exports = { orderProduct, getSingleOrder, getOrdersOfLogInUser };
