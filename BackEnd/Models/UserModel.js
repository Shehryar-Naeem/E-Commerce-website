const mongoose = require("mongoose")
const validator = require("validator")
const bcrypt= require("bcryptjs")
const jwt = require("jsonwebtoken")
const crypto = require("crypto")

const userModel= new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please enter your name"],
        maxlength:[30,"Your name is to big, you only add 30 letter"],
        minilength:[3,"name should be more than 3 or more letter"]
    },
    email:{
        type:String,
        required:[true,"Please enter your email"],
        unique:true,
        validate:[validator.isEmail,"Please enter the valid email"]
    },
    password:{
        type:String,
        required:[true,"Please enter your password"],
        minilength:[8,"Your password should be greator than 8 characer"],
        select:false // this line mean when simple user enter his password and when admin check this user specification admin will not be able to access this simpler user password
    },
    avatar:{
        public_id:{
            type:String,
            required:true
        },
        img_url:{
            type:String,
            required:true,
            default:"https://p.kindpng.com/picc/s/24-248253_user-profile-default-image-png-clipart-png-download.png"
        }
    },
    role:{
        type:String,
        default:"user"
    },
    resetPasswordToken:String,
    resetPasswordExpire:Date,
})

userModel.pre("save",async function(next){
    if(!this.isModified("password")){
        next()
    }
    this.password= await bcrypt.hash(this.password,10)
})


userModel.methods.getJWTToken= function(){
    return jwt.sign({id:this._id},process.env.JWT_SECRET,{
        expiresIn:process.env.JWT_EXPIRE
    })
}

userModel.methods.comparePassword= async function(enterPassword){
    return await bcrypt.compare(enterPassword,this.password)
}


// for reset Password
userModel.methods.getRestPasswordToken= function(){
    const restTokenForPassword= crypto.randomBytes(20).toString("hex")

    this.restPasswordToken= crypto.createHash("sha256").update(restTokenForPassword).digest("hex")

    this.resetPasswordExpire= Date.now() + 15 * 60 * 1000
    return restTokenForPassword;
}
const User = mongoose.model("user",userModel)

module.exports= User;