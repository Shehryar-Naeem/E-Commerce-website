
const User = require("../Models/UserModel")
const AsyncError = require("../MiddlerWare/AsyncError")
const ErrorHandler = require("../Utils/ErrorHandler")
const saveAndSendCookies = require("../Utils/JWtSaveCookies")
const sendEmail= require("../Utils/sendEmail")
const crypto = require("crypto")
const registerUser= AsyncError(async(req,res,next)=>{
    const {name,email,password}= req.body

    const user= await User.create({
        name,email,password,avatar:{
            public_id:"5sts",
            img_url:"https://p.kindpng.com/picc/s/24-248253_user-profile-default-image-png-clipart-png-download.png"
        }
    })
    // const token = user.getJWTToken();
    // res.status(201).json({
    //     success:true,
    //     token
    // })

    saveAndSendCookies(user,201,res)
})

const userLogin= AsyncError(async (req,res,next)=>{
    const {email,password}= req.body;

    if(!email || !password){
        return next(new ErrorHandler("Please enter your email or password",400))
    }
    const user= await User.findOne({email}).select("+password")

    if(!user){
        return next(new ErrorHandler("Invalid Email or password"),401)
    }

    const isPasswordMatch= await user.comparePassword(password);

    if(!isPasswordMatch){
        return next(new ErrorHandler("Invalid Email or password"),401)
    }

    // const token = user.getJWTToken()

    // res.status(200).json({
    //     success:true,
    //     user,
    //     token
    // })
    saveAndSendCookies(user,200,res)

})


// logOutController

const logOutController = AsyncError(async (req,res,next)=>{
    const options={
        expires: new Date(Date.now()),
        httpOnly:true
    }

    res.cookie("token",null,options)
    res.status(200).json({
        success:true,
        message:"logout Successfully"
    })
    next()
})


//Controler for foreget password

const foregetPassword= AsyncError(async (req,res,next)=>{
    const userFindForRestPassword= await User.findOne({email:req.body.email})

    if(!userFindForRestPassword){
        return next(new ErrorHandler("Such user not found",404))
    }
  

    //get reset password token
    const resetToken = userFindForRestPassword.getRestPasswordToken()

    await userFindForRestPassword.save({validateBeforeSave:false})

    const resetPasswordUrl= `${req.protocol}//${req.get("host")}/api/user/password/reset/${resetToken}`


    const message= `Your password token is :- \n\n ${resetPasswordUrl} \n\n if you have not requested this email then, please ignore it `


    try{

        await sendEmail({
            email:userFindForRestPassword.email,
            subject:`Ecommerce password recovery`,
            message
        })
        res.status(200).json({
            success:true,
            message:`Email sent to ${userFindForRestPassword.email} successfully`
        })
    }catch(error){
        userFindForRestPassword.resetPasswordToken=undefined
        userFindForRestPassword.resetPasswordExpire= undefined
        
        await userFindForRestPassword.save({validateBeforeSave:false})

        return next(new ErrorHandler(error.message, 500))
    }
});

//reset password
const resetUserPassword=AsyncError(async(req,res,next)=>{
    // create token hash
    const restTokenForPassword= crypto.createHash("sha256").update(req.params.token)

    const UserRestPassword= await User.findOne({
        restTokenForPassword,
        resetPasswordExpire:{$gt:Date.now()}
    })
    if(!UserRestPassword){
       return next(new ErrorHandler(`Reset password Token is invalid or has been expired`,400))
    }
    if(req.body.password!==req.body.confirmPassword){
        return next(new ErrorHandler(`Password does not rematch`,400))
    }
    UserRestPassword.password= req.body.password;
    UserRestPassword.restPasswordToken= undefined
    UserRestPassword.resetPasswordExpire= undefined

    await UserRestPassword.save()
    saveAndSendCookies(UserRestPassword,200,res )
     
})


const getUserDetail= AsyncError(async(req,res,next)=>{
    const getUser= await User.findById(req.user.id)

    res.status(200).json({
        success:true,
        getUser
    })
})
module.exports= {registerUser,userLogin,logOutController,foregetPassword,resetUserPassword,getUserDetail}


