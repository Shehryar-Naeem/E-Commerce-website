// const products = require("../Models/ProductModels")
// const ErrorHandler = require("../Utils/ErrorHandler")
// const AsyncError= require("../MiddlerWare/AsyncError")




// const createProduct= AsyncError(async (req,res,next)=>{
//     const productCreate= await products.create(req.body)
//     res.status(201).json({
//         sucsess:true,
//         productCreate
//     })
// })
// const getSingleProduct=AsyncError(async (req,res,next)=>{
//     const singleProduct= await products.findById(req.params.id)

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
//     const getProducts= await products.find()

//     res.status(200).json(
//         {
//             sucsess:true,
//             getProducts
//         }
//     )
// })

// const updateSpecificProduct= AsyncError(async(req,res,next)=>{
//     let updateProduct= await products.findById(req.params.id);

//     if(!updateProduct){
//         // return res.status(500).json({
//         //     success:false,
//         //     message:"Product on found, So not update"
//         // })
//         return next(new ErrorHandler("Product on found, So not update",404))
//     }

//     updateProduct= await products.findByIdAndUpdate(req.params.id,req.body,{
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
//     const deleteProduct= await products.findById(req.params.id)

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




const products = require("../Models/ProductModels")

//getAllProductRoute
const getAllProducts=async(req,res,next)=>{
    const getAllProducts= await products.find()

    res.status(201).json({
        success:true,
        getAllProducts
    })

}


const createAProduct= async(req,res,next)=>{
    const createProduct= await products.create(req.body)

    res.status(201).json({
        success:true,
        createProduct
    })
}

const deleteAProduct= async(req,res,next)=>{
    const deleteProduct= await products.findById(req.params.id)

    if(!deleteProduct){
        return res.status(404).json({
            success:false,
            message:"Product not found, so you not delete the product"
        })
    }
    deleteProduct.remove()
    res.status(201).json({
        success:true,
        message:"product is deleted successfully"
    })
}

const updateAProduct= async(req,res,next)=>{
    let updateProduct= await products.findById(req.params.id)

    if(!updateProduct){
        return res.status(404).json({
            success:false,
            message:"Product not found, so you may not update a product"
        })
    }
    updateProduct= await products.findByIdAndUpdate(req.params.id,req.body,{
        new:true,
        runValidators:true,
        useFindAndModify:false
    })
    res.status(201).json({
        message:true,
        updateProduct
    })
}

const getASingleProduct=async(req,res,next)=>{
    const getSingleProduct= await products.findById(req.params.id)

    if(!getSingleProduct){
        return res.status(404).json({
            success:false,
            message:"Product not found"
        })
    }
    
    res.status(201).json({
        success:true,
        getSingleProduct
    })
}

module.exports= {getAllProducts,createAProduct,deleteAProduct,updateAProduct,getASingleProduct};