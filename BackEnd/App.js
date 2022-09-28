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

App.use(express.json())


// App.get("/",(req,res)=>{
//     res.send("Api created")
// })

App.use("/api/product",Router)
App.use(MiddlerWare)

module.exports = App;