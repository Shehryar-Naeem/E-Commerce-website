// const App = require("./App")
// const dotenv = require("dotenv")
// const connectDatabase = require("./Config/database")

// // Uncaugth promise rejection Error for mongodbUrl if mongodbUrl wrong
// process.on("uncaughtException",(err)=>{
//     console.log(`Error ${err.message}`);
//     console.log("Shutting down the server due to uncaught Error");
//     process.exit(1)
// })

// dotenv.config({path:"BackEnd/config.env"})



// connectDatabase()
// const PORT= process.env.PORT || 8000;
// const server=App.listen(PORT,()=>{
//     console.log(`server is created on ${PORT}`);
// }) 



// // Unhandled promise rejection Error for mongodbUrl if mongodbUrl wrong
// process.on("unhandledRejection",(err)=>{
//     console.log(`Mongodb URL Error ${err.message}`);
//     console.log("shutting down the server due to unhandled rejection");
//     server.close(()=>{
//         process.exit(1)
//     })
// })




const App= require("./App")
const dotenv= require("dotenv")
const connectDatabase = require("./Config/database")
dotenv.config({path:"BackEnd/config.env"})


//Uncaught Error
process.on("uncaughtException",(err)=>{
    console.log(`Uncaught Error ${err.path}`);
    console.log(`such variable not declared`);
    process.exit(1)
})

connectDatabase()
const PORT = process.env.PORT || 8000
const server=App.listen(PORT,()=>{
    console.log(`Server is created at port ${PORT}`);
})




//UnHandlePromiseRejection

process.on("unhandledRejection",(err)=>{
    console.log(`Mongodb url Error ${err.path}`);
    console.log(`Shutdown the server`);
    server.close(()=>{
        process.exit(1)
    })
})