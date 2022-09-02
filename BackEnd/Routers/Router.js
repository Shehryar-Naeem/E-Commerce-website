const express = require("express")
const { getAllProducts, createProduct, updateSpecificProduct, deleteProduct, getSingleProduct } = require("../Controller/ProductController")
const router = express.Router()

router.route("/product/new").post(createProduct)
router.route("/products").get(getAllProducts)
router.route("/product/:id").put(updateSpecificProduct).delete(deleteProduct).get(getSingleProduct)


module.exports= router