// const express = require("express")
// const App =express();
// const product = require("./Routers/Router")
// const MiddlewareErrorHandler = require("./MiddlerWare/ErrorMiddleWare")
// // Router 
// App.use(express.json())
// App.use("/api/p1",product)

// //MiddlerWare for Error
// App.use(MiddlewareErrorHandler)

// module.exports = App





const express= require("express")
const App = express()
const Router = require("./Routers/Router")
const MiddlerWare = require("./MiddlerWare/ErrorMiddleWare")
const userRouter = require("./Routers/UserRouter")
const orderRoute = require("./Routers/OrderRouter")
const paymentRoute = require("./Routers/PaymentRouter")
const cookieParser = require("cookie-parser") 
const bodyParser = require("body-parser")
const fileUpload = require("express-fileupload")
const dotenv= require("dotenv")

dotenv.config({path:"BackEnd/config.env"})

App.use(express.json())
App.use(cookieParser())
App.use(bodyParser.urlencoded({extended:true}))
App.use(fileUpload())

// App.get("/",(req,res)=>{
//     res.send("Api created")
// })


App.use("/api/product",Router)
App.use("/api/user",userRouter)
App.use("/api/order",orderRoute)
App.use("/api/payment",paymentRoute)
App.use(MiddlerWare)

module.exports = App;