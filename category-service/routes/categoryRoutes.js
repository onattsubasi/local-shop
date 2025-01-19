const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryControllers.js');
const verifyToken = require('../controllers/verifyToken');

router.post("/createCategory", verifyToken,categoryController.createCategory);
router.get('/', categoryController.getCategories);
router.delete("/deleteCategory/:categoryId", verifyToken, categoryController.deleteCatgeory);
router.get("/getCategory/:categoryId",categoryController.getCategory);
router.patch("/updateCategory/:categoryId", verifyToken, categoryController.updateCategory);

module.exports = router;