// const ErrorHandler =require("../Utils/ErrorHandler")

// module.exports= (err,req,res,next)=>{
//     err.statusCode= err.statusCode||500,
//     err.message= err.message||"internal Server Error"

//     if(err.name === "CastError"){
//         const message= `You put wrong id at postmen url ${err.path}`
//         err = new ErrorHandler(message,400)
//     }
//     res.status(err.statusCode).json({
//         success:false,
//         error:err.message
//     })
// }

const ErrorHandler = require("../Utils/ErrorHandler")

module.exports =(err,req,res,next)=>{
    err.statusCode= err.statusCode || 500,
    err.message= err.message || "Internal server Error"
    // psot man error in digit
    if(err.name==="CastError"){
        const message = `You put wrong id on postment ${err.path}`
        err=new ErrorHandler(message,400)
    }
    // duplication email or key error
    if(err.code===11000){
        const message= `You Duplication ${Object.keys(err.keyValue)} Entered`
        err= new ErrorHandler(message,400)
    }
    // // wrong JWT Error
    // if(err.name==="jwtwebtokenError"){

    //     const message= `json webtoken is invalid, try again`
    //     err= new ErrorHandler(message,400)
    // }
    if(err.name === "jwtwebtokenError"){
        const message= `json webtoken is invalid try again`
        err= new ErrorHandler(message,400)
    }

    if(err.name=== "tokenExpireError"){
        const message= `json webtoken is Expired, try again`
        err= new ErrorHandler(message,400)
    }


    res.status(err.statusCode).json({
        success:false,
        error:err.message
    })
}