const express= require("express")
const { registerUser, userLogin, logOutController } = require("../Controller/UserController")
const router= express.Router()

router.route("/registeruser").post(registerUser)
router.route("/loginuser").post(userLogin)
router.route("/logoutuser").get(logOutController)



module.exports= router