const mongoose= require("mongoose")

const productSchema= mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please enter your name"],
        trim:true
    },
    discription:{
        type:String,
        required:[true,"Please enter the discription"]
    },
    price:{
        type:Number,
        required:[true,"Please enter the price"],
        maxlength:[8,"Please not exceed 8 character"]
    },
    rating:{
        type:Number,
        default:0
    },
    images:[
        {
            public_id:{
                type:String,
                required:true
            },
            img_url:{
                type:String,
                required:true
            }
        }
    ],
    category:{
        type:String,
        required:[true,"Please enter the product category"]
    },
    stock:{
        type: Number,
        required:[true,"Please enter the product stock"],
        maxlength:[4,"Please cannot exceed 4 character"],
        default:1
    },
    noOfReviews:{
        type:String,
        default:0
    },
    reveiws:[
        {
            name:{
                type:String,
                required:true
            },
            rating:{
                type:Number,
                required:true
            },
            comments:{
                type:String,
                required:true
            }
        }
    ],
},{
    timestamps:true
})


const products = mongoose.model("producties",productSchema)

module.exports = products