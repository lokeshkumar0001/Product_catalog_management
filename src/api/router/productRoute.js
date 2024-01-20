const express = require("express");
const { userAuth, isAdmin } = require("../middlewares/auth");
const {
  addProduct,
  getProductById,
  getAllProduct,
} = require("../controllers/productController");

const router = express();

router.route("/add").post(userAuth, isAdmin, addProduct);
router.route("/all").get(userAuth, getAllProduct);
router.route("/:id").get(userAuth, getProductById);

module.exports = router;
