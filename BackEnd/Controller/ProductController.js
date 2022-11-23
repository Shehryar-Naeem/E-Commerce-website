// const Products = require("../Models/ProductModels")
// const ErrorHandler = require("../Utils/ErrorHandler")
// const AsyncError= require("../MiddlerWare/AsyncError")

// const createProduct= AsyncError(async (req,res,next)=>{
//     const productCreate= await Products.create(req.body)
//     res.status(201).json({
//         sucsess:true,
//         productCreate
//     })
// })
// const getSingleProduct=AsyncError(async (req,res,next)=>{
//     const singleProduct= await Products.findById(req.params.id)

//     if(!singleProduct){
//         // return res.status(500).json({
//         //     success:false,
//         //     message:"Product not found"
//         // })
//         return next(new ErrorHandler("Product not found",404))
//     }
//     res.status(200).json({
//         success:true,
//         singleProduct
//     })
// })
// const getAllProducts=AsyncError(async(req,res,next)=>{
//     const getProducts= await Products.find()

//     res.status(200).json(
//         {
//             sucsess:true,
//             getProducts
//         }
//     )
// })

// const updateSpecificProduct= AsyncError(async(req,res,next)=>{
//     let updateProduct= await Products.findById(req.params.id);

//     if(!updateProduct){
//         // return res.status(500).json({
//         //     success:false,
//         //     message:"Product on found, So not update"
//         // })
//         return next(new ErrorHandler("Product on found, So not update",404))
//     }

//     updateProduct= await Products.findByIdAndUpdate(req.params.id,req.body,{
//         new:true,
//         runValidators:true,
//         useFindAndModify:false
//     })
//     res.status(200).json({
//         success:true,
//         updateProduct
//     })
// })

// const deleteProduct=AsyncError(async(req,res,next)=>{
//     const deleteProduct= await Products.findById(req.params.id)

//     if(!deleteProduct){
//         // return res.status(500).json({
//         //     success:false,
//         //     message:"product not found, So no deleted"
//         // })
//         return next(new ErrorHandler("product not found, So no deleted",404))

//     }

//     deleteProduct.remove()
//     res.status(200).json({
//         success:true,
//         message:"Product successfully deleted"
//     })
// })

// module.exports= {getAllProducts,createProduct,updateSpecificProduct,deleteProduct,getSingleProduct}

const Products = require("../Models/ProductModels");
const ErrorHandler = require("../Utils/ErrorHandler");
const AsyncError = require("../MiddlerWare/AsyncError");
const ApiFeatures = require("../Utils/ApiFeature");
//getAllProductRoute
const getAllProducts = AsyncError(async (req, res, next) => {
  // return next(new ErrorHandler("my new built in error",500))
  const resultPerPage = 8;
  const countProduct = await Products.countDocuments();
  const Apifeature = new ApiFeatures(Products.find(), req.query)
    .search()
    .filter()
    .pagination(resultPerPage);
  const getProducts = await Apifeature.query;

  res.status(201).json({
    success: true,
    getProducts,
    countProduct,
    resultPerPage
  });
});

const createAProduct = AsyncError(async (req, res, next) => {
  req.body.user = req.user.id;
  const createProduct = await Products.create(req.body);

  res.status(201).json({
    success: true,
    createProduct,
  });
});

const deleteAProduct = AsyncError(async (req, res, next) => {
  const deleteProduct = await Products.findById(req.params.id);

  if (!deleteProduct) {
    // return res.status(404).json({
    //     success:false,
    //     message:"Product not found, so you not delete the product"
    // })
    return next(
      new ErrorHandler(`Product not found, so you not delete the product`, 404)
    );
  }
  deleteProduct.remove();
  res.status(201).json({
    success: true,
    message: "product is deleted successfully",
  });
});

const updateAProduct = AsyncError(async (req, res, next) => {
  let updateProduct = await Products.findById(req.params.id);

  if (!updateProduct) {
    // return res.status(404).json({
    //     success:false,
    //     message:"Product not found, so you may not update a product"
    // })
    return next(
      new ErrorHandler(
        `Product not found, so you may not update a product`,
        404
      )
    );
  }
  updateProduct = await Products.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  res.status(201).json({
    message: true,
    updateProduct,
  });
});

const getASingleProduct = AsyncError(async (req, res, next) => {
  const getSingleProduct = await Products.findById(req.params.id);

  if (!getSingleProduct) {
    // return res.status(404).json({
    //     success:false,
    //     message:"Product not found"
    // })

    return next(new ErrorHandler(`Product not found`, 404));
  }

  res.status(201).json({
    success: true,
    getSingleProduct,
  });
});

//Product reviews
const reviewsAboutProduct = AsyncError(async (req, res, next) => {
  // const { rating  , comment, productId } = req.body;
  // const review = {
  //   user: req.user._id,
  //   name: req.user.name,
  //   rating: Number(rating),
  //   comment,
  // };
  

  // const product = await Products.findById(productId);
  // const isReviewed = product.reviews.find(
  //   (rev) => rev.user.toString() === req.user._id.toString()
  // );

  // if (isReviewed) {
  //   product.reviews.forEach((rev) => {
  //     if (rev.user.toString() === req.user._id.toString()) {
  //       (rev.rating = rating), (rev.comment = comment);
  //     }
  //   });
  // } else {
  //   product.reviews.push(review);
  //   product.noOfReviews = product.reviews.length;
  // }
  // let avg = 0;

  // product.reviews.forEach((rev) => {
  //     avg += rev.rating;
  //   }) 
  // product.ratings = avg / product.reviews.length;

  // await product.save({ runValidators: false });

  // res.status(200).json({
  //   success: true,
  // });
  const {rating,comment,productId} = req.body
  const review ={
    user:req.user._id,
    name:req.user.name,
    rating:Number(rating),
    comment
  }
  const product= await Products.findById(productId)
  const isReviewed= product.reviews.find((rev)=>rev.user.toString()===req.user._id.toString())
  if(isReviewed){
    product.reviews.forEach((rev)=>{
      if(rev.user.toString()===rev.user._id.toString()){
        rev.comment=comment,
        rev.rating= rating
      }
    })
  }else{
    product.reviews.push(review)
    product.noOfReviews= product.reviews.length
  }

  let avg=0;
  product.reviews.forEach((rev)=>{
    avg+=rev.rating
  })
  product.ratings= avg/ product.reviews.length
  await product.save({runValidators:false})
  res.status(200).json({
    success:true
  })
});

//getAllReviews about product
const getAllReviewsAboutProduct= AsyncError(async (req,res,next)=>{
  const product= await Products.findById(req.query.id)
  
  if(!product){
    return next(new ErrorHandler(`product not find`,404))
  }

  res.status(200).json({
    message:true,
    reviews:product.reviews
  })
})

// delete reviews
const deleteReviews= AsyncError(async (req,res,next)=>{
  const product= await Products.findById(req.query.productId)

  if(!product){
    return next(new ErrorHandler(`Product not found`,404))
  }

  const reviews = product.reviews.filter(rev=>rev._id.toString() !== req.query.id.toString())


  let avg=0;

  reviews.forEach((rev)=>{
    avg+=rev.rating
  })  
  const ratings = avg / reviews.length
  const noOfReviews= reviews.length;

  await Products.findByIdAndUpdate(req.query.productId,{
    reviews,
    ratings,
    noOfReviews
  },
  {
    new:true,
    runValidators:true,
    useFindAndModify:false
  })

  res.status(200).json({
    message:true,
    reviews,
    ratings,
    noOfReviews

  })
})
module.exports = {
  getAllProducts,
  createAProduct,
  deleteAProduct,
  updateAProduct,
  getASingleProduct,
  reviewsAboutProduct,
  deleteReviews,
  getAllReviewsAboutProduct
};
