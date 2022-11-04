// // this for when user login in website we specific the access of login user mean only login user can access the product and create a products

const ErrorHandler = require("../Utils/ErrorHandler");
const AsyncError = require("./AsyncError");
const jwt = require("jsonwebtoken");
const User = require("../Models/UserModel");
const isAuthenticationUser= AsyncError(async (req,res,next)=>{
    const {token} = req.cookies;

    // console.log(token);

    if(!token){
        return next(new ErrorHandler("You could access the resources before login",401))
    }
    const deCodedData= jwt.verify(token,process.env.JWT_SECRET)

    req.user= await User.findById(deCodedData.id)
    next()
})

// 403 for server cannot understand user request server rejected this request
const AuthorizationRole=(...roles)=>{
    return (req,res,next)=>{
        if(!roles.includes(req.user.role)){
            next(new ErrorHandler(`Role ${req.user.role} is not allowed to access their resources`,403))
        }
        next()
    }
}

module.exports = {isAuthenticationUser,AuthorizationRole};