const express = require("express");
const router = express();
const verifyToken = require("../controllers/verifyToken");
const applyCoupon = require("../controllers/applyCoupon");
const createBasket = require("../controllers/createBasket");
const removeCoupon = require("../controllers/removeCoupon");
const updateBasket = require("../controllers/updateBasket");
const deleteBasket = require("../controllers/deleteBasket");
const getBasket = require("../controllers/getBasket");

router.get("/getBasket/:basketId", verifyToken, getBasket.getBasket);

router.post("/createBasket/:productId", verifyToken, createBasket.createBasket);

router.patch("/apply-coupon", verifyToken, applyCoupon.applyCoupon);
router.patch("/remove-coupon", verifyToken, removeCoupon.removeCoupon);
router.patch("/updateBasket/:basketId", verifyToken, updateBasket.updateBasket);

router.delete(
  "/deleteBasket/:basketId",
  verifyToken,
  deleteBasket.deleteBasket
);

module.exports = router;