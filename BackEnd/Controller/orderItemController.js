const OrderModel = require("../Models/OrderItemModel");
const ErrorHandler = require("../Utils/ErrorHandler");
const AsyncError = require("../MiddlerWare/AsyncError");
const orderModel = require("../Models/OrderItemModel");
const Product  = require("../Models/ProductModels")

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


// get all order by admin
const getAllOrder=AsyncError(async (req,res,next)=>{

  const getOrderByAdmin = await orderModel.find();

  let totalAmount=0
  getOrderByAdmin.forEach((order)=>
    totalAmount+= order.totalPrice
  )

  res.status(200).json({
    success:true,
    getOrderByAdmin,
    totalAmount 
  })
})

// update order status by admin
const updateOrder=AsyncError(async (req,res,next)=>{
  const order= await orderModel.findById(req.params.id)

   if(!order){
    return next(new ErrorHandler(`Order not found on this Id`,404))
  }

  if(order.orderStatus==="Delivered"){
    return next(new ErrorHandler("You have already delivered this order",400))
  }

  order.orderItem.forEach(async (od)=>{
    await updateStock(od.product,od.quantity)
  })

  order.orderStatus= req.body.status


  if(req.body.status==="Delivered"){
    order.deliveredAt= Date.now()
  }
  await order.save({validateBeforeSave:false})
  res.status(200).json({
    success:true
  })
})


async function updateStock(productId,quantity){
  const product = await Product.findById(productId)

  product.stock= product.stock-quantity

  await product.save({validatorBeforeSave:false})
}

// delete order


const deleteOrder =AsyncError(async (req,res,next)=>{
  const order = await orderModel.findById(req.params.id)

  if(!order){
    return next(new ErrorHandler(`Order not found on this Id`,404))
  }

  await order.remove()


  res.status(200).json({
    success:true
  })
}) 
module.exports = { orderProduct, getSingleOrder, getOrdersOfLogInUser,deleteOrder,updateOrder,getAllOrder };
