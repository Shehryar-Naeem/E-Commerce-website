// const express = require("express")
// const { getAllProducts, createProduct, updateSpecificProduct, deleteProduct, getSingleProduct } = require("../Controller/ProductController")
// const router = express.Router()

// router.route("/product/new").post(createProduct)
// router.route("/products").get(getAllProducts)
// router.route("/product/:id").put(updateSpecificProduct).delete(deleteProduct).get(getSingleProduct)


// module.exports= router



const express = require("express");
const {getAllProducts, createAProduct, deleteAProduct, updateAProduct, getASingleProduct} = require("../Controller/ProductController");

const Router= express.Router()

Router.route("/getAllProducts").get(getAllProducts)
Router.route("/createAProduct").post(createAProduct)
Router.route("/products/:id").delete(deleteAProduct).put(updateAProduct).get(getASingleProduct)

module.exports = Router;