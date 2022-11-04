const express= require("express")
const { registerUser, userLogin, logOutController, foregetPassword, resetUserPassword, getUserDetail, UpdatePassowrd, updateUserProfile, getSingleUserByAdmin, getAllUserByAdmin } = require("../Controller/UserController")
const {isAuthenticationUser,AuthorizationRole}= require("../MiddlerWare/Authentication")
const router= express.Router()
router.route("/registeruser").post(registerUser)
router.route("/loginuser").post(userLogin)
router.route("/logoutuser").get(logOutController)
router.route("/password/forgot").post(foregetPassword)
router.route("/password/reset/:token").put(resetUserPassword)
router.route("/me").get(isAuthenticationUser,getUserDetail);
router.route("/password/update").put(isAuthenticationUser,UpdatePassowrd)
router.route("/me/update").put(isAuthenticationUser,updateUserProfile)
router.route("/admin/allusers").get(isAuthenticationUser,AuthorizationRole("admin"),getAllUserByAdmin)
router.route("/admin/getSingleUser/:id").get(isAuthenticationUser,AuthorizationRole("admin"),getSingleUserByAdmin)


module.exports= router 