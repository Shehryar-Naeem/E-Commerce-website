const mongoose = require("mongoose")

const connectDatabase=()=>{

    mongoose.connect(process.env.db).then((res)=>{
        console.log("Database is connected successfully");
    })

    //below line comment due to unhandled promise rejection due to at server.js file becaue i Handled this type of error handled at server.js file 

    // .catch((err)=>{
    //     console.log("Not connected"+err);
    // })
}

module.exports= connectDatabase