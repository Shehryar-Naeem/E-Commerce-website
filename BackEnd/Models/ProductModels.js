// const mongoose= require("mongoose")

// const productSchema= mongoose.Schema({
//     name:{
//         type:String,
//         required:[true,"Please enter your name"],
//         trim:true
//     },
//     discription:{
//         type:String,
//         required:[true,"Please enter the discription"]
//     },
//     price:{
//         type:Number,
//         required:[true,"Please enter the price"],
//         maxlength:[8,"Please not exceed 8 character"]
//     },
//     rating:{
//         type:Number,
//         default:0
//     },
//     images:[
//         {
//             public_id:{
//                 type:String,
//                 required:true
//             },
//             img_url:{
//                 type:String,
//                 required:true
//             }
//         }
//     ],
//     category:{
//         type:String,
//         required:[true,"Please enter the product category"]
//     },
//     stock:{
//         type: Number,
//         required:[true,"Please enter the product stock"],
//         maxlength:[4,"Please cannot exceed 4 character"],
//         default:1
//     },
//     noOfReviews:{
//         type:String,
//         default:0
//     },
//     reveiws:[
//         {
//             name:{
//                 type:String,
//                 required:true
//             },
//             rating:{
//                 type:Number,
//                 required:true
//             },
//             comments:{
//                 type:String,
//                 required:true
//             }
//         }
//     ],
// },{
//     timestamps:true
// })


// const products = mongoose.model("producties",productSchema)

// module.exports = products



const mongoose=require("mongoose")

const ProductSchema =new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please Enter the product Name"],
        trim:true
    },
    discription:{
        type:String,
        required:[true,"Please Enter the discription"]
    },
    price:{
        type:Number,
        required:[true,"Please Enter the price"],
        maxlength:[8,"Please not exceed 8 character"]
    },
    ratings:{
        type:Number,
        default:0
    },
    images:[
        {
            public_id:{
                type:String,
                required:true,
                default:45
            },
            img_url:{
                type:String,
                default:"https://cdn.allbirds.com/image/upload/f_auto,q_auto,w_1110/cms/4O4cOXrGLvTEI4P7nU24qI/5e4ef885b61b17068fdd7d5b5f6388c0/AA003MM_SHOE_LEFT_GLOBAL_MENS_TREE_DASHER2_HAZY_INDIGO_BLIZZARD_.png",
                required:true
            }
        }
    ],
    category:{
        type:String,
        required:[true,"Please Enter the product category"]
    },
    stock:{
        type:Number,
        required:[true,"Please enter the product stock"],
        maxlength:[4,"Please cannot exceed 4 character"],
        default:1
    },
    noOfReviews:{
        type:Number,
        default:0
    },
    reviews:[
       {
        user:{
            type:mongoose.Schema.ObjectId,
            ref:"User",
            required:true
        },
        name:{
            type:String,
            required:true
        },
        rating:{
            type:Number,
            required:true,
            default:0
        },
        comment:{
            type:String,
            required:true
        }
       }
    ],
    user:{
        type:mongoose.Schema.ObjectId,
        ref:"User",
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now,
    }
},{
    timestamps:true
})


const products= mongoose.model("products",ProductSchema)

module.exports = products