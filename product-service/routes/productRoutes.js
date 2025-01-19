const express = require("express");
const router = express();

const verifyToken = require("../controllers/verifyToken");
const createProductController = require("../controllers/createProduct");
const deleteProductController = require("../controllers/deleteProduct");
const getProductController = require("../controllers/getProduct");
const updateProductController = require("../controllers/updateProduct");

router.get("/getProduct/:productId", getProductController.getProduct);

router.post(
  "/createProduct/:categoryId",
  verifyToken,
  createProductController.createProduct
);

router.delete(
  "/deleteProduct/:productId",
  deleteProductController.deleteProduct
);
router.patch(
  "/updateProduct/:productId",
  updateProductController.updateProduct
);

module.exports = router;
