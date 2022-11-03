const express= require("express")
const { registerUser, userLogin, logOutController, foregetPassword, resetUserPassword, getUserDetail } = require("../Controller/UserController")
const {isAuthenticationUser,AuthorizationRole}= require("../MiddlerWare/Authentication")
const router= express.Router()
router.route("/registeruser").post(registerUser)
router.route("/loginuser").post(userLogin)
router.route("/logoutuser").get(logOutController)
router.route("/password/forgot").post(foregetPassword)
router.route("/password/reset/:token").put(resetUserPassword)
router.route("/me").get(isAuthenticationUser,getUserDetail);


module.exports= router 