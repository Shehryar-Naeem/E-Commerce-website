const ErrorHandler =require("../Utils/ErrorHandler")

module.exports= (err,req,res,next)=>{
    err.statusCode= err.statusCode||500,
    err.message= err.message||"internal Server Error"

    if(err.name === "CastError"){
        const message= `You put wrong id at postmen url ${err.path}`
        err = new ErrorHandler(message,400)
    }
    res.status(err.statusCode).json({
        success:false,
        error:err.message
    })
}