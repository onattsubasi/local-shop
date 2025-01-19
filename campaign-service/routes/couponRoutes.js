const express = require("express");
const router = express();

const activateCoupon = require("../controller/coupon/activateCoupon");
const createCoupon = require("../controller/coupon/createCoupon");
const deactivateCoupon = require("../controller/coupon/deactivateCoupon");
const deleteCoupon = require("../controller/coupon/deleteCoupon");
const getCoupon = require("../controller/coupon/getCoupon");
const redeemCoupon = require("../controller/coupon/redeemCoupon");
const updateCoupon = require("../controller/coupon/updateCoupon");

const verifyToken = require("../controller/verifyToken");
const verifyTokenAdmin = require("../controller/verifyTokenAdmin");

router.get("/get-coupon/:couponCode", verifyToken, getCoupon.getCoupon);

router.post(
  "/activate-coupon",
  verifyTokenAdmin,
  activateCoupon.activateCoupon
);

router.post(
  "/deactivate-coupon",
  verifyTokenAdmin,
  deactivateCoupon.deactivateCoupon
);

router.post("/create-coupon", verifyTokenAdmin, createCoupon.createCoupon);

router.post("/redeem-coupon", verifyToken, redeemCoupon.redeemCoupon);

router.patch("/update-coupon", verifyTokenAdmin, updateCoupon.updateCoupon);

router.delete("/delete-coupon", verifyTokenAdmin, deleteCoupon.deleteCoupon);

module.exports = router;
