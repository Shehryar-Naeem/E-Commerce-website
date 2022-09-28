// // this for validation
// module.exports= thefunc=>
//     (req,res,next)=>
//         Promise.resolve(thefunc(req,res,next)).catch(next)



module.exports= (theFunc)=>(req,res,next)=> Promise.resolve(theFunc(req,res,next)).catch(next)