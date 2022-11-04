
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

//Function for restPassword
const resetUserPassword= AsyncError(async (req,res,next)=>{
    const getRestPasswordToken= crypto.createHash("sha256").update(req.params.token).digest("hex")

    const getUserForRestPassword= await User.findOne({
        getRestPasswordToken,
        resetPasswordExpire:{$gt:Date.now()}
    })
    if(!getUserForRestPassword){
        return next(new ErrorHandler(`RestPasswordToken is invalid or has been Expired`,400))
    }
    if(req.body.password!== req.body.confirmPassword){
        return next(new ErrorHandler(`confirm Password does not matched`,400))
    }
    getUserForRestPassword.password= req.body.password
    getUserForRestPassword.resetPasswordToken= undefined
    getUserForRestPassword.resetPasswordExpire= undefined

    await getUserForRestPassword.save()
    saveAndSendCookies(getUserForRestPassword,200,res)
})

const getUserDetail= AsyncError(async(req,res,next)=>{
    const getUser= await User.findById(req.user.id)

    res.status(200).json({
        success:true,
        getUser
    })
})

// update user password
const UpdatePassowrd = AsyncError(async(req,res,next)=>{
    const UpdateUserPassword = await User.findById(req.user.id).select("+password")

    const isPasswordMatch= await UpdateUserPassword.comparePassword(req.body.oldPassword)
    if(!isPasswordMatch){
        return new next(new ErrorHandler('old password is incorrect', 400))
    }
    
    if(req.body.newPassword!== req.body.confirmPassword){
        return new next(new ErrorHandler('password does not match', 400))
        
    }
    UpdateUserPassword.password=req.body.newPassword
    
    await UpdateUserPassword.save()
    saveAndSendCookies(UpdateUserPassword,200,res)
})


// update User profile
const updateUserProfile= AsyncError(async (req,res,next)=>{
    const newUserData={
        name:req.body.name,
        email:req.body.email
    }

    const updateUserData= await User.findByIdAndUpdate(req.user.id,newUserData,{
        new:true,
        runValidators:true,
        useFindAndModify:false
    })

    res.status(200).json({
        success:true
    })
})
// this can access by admin
const getAllUserByAdmin=AsyncError(async (req,res,next)=>{
    const getAllUser= await User.find()

    res.status(200).json({
        success:true,
        getAllUser
    })
})
const getSingleUserByAdmin=AsyncError(async (req,res,next)=>{
    const getSingleUser= await User.findById(req.params.id)

    if(!getSingleUser){
        return new ErrorHandler("such your not found",400)
    }

    res.status(200).json({
        success:true,
        getSingleUser,
    })
})


// give admin role to simple user
const updateUserRole= AsyncError(async (req,res,next)=>{
    const newUserData={
        name:req.body.name,
        email:req.body.email,
        role:req.body.role
    }

    const updateUserData= await User.findByIdAndUpdate(req.params.id,newUserData,{
        new:true,
        runValidators:true,
        useFindAndModify:false
    })

    res.status(200).json({
        success:true
    })
})


// delete the user by admin
const deleteUserByAdmin=AsyncError(async (req,res,next)=>{
    const deleteTheUser= await User.findById(req.params.id)

    if(!deleteTheUser){
        return next(new ErrorHandler("User not found so user not deleted",400))
    }
    await deleteTheUser.remove()

    res.status(200).json({
        success:true,
        message:`${req.user.name} is deleted`
    })
})
module.exports= {registerUser,userLogin,logOutController,foregetPassword,resetUserPassword,getUserDetail,UpdatePassowrd,updateUserProfile,getAllUserByAdmin,getSingleUserByAdmin,updateUserRole,deleteUserByAdmin}


