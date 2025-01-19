const express = require("express");
const router = express.Router();

const verifyToken = require("../../controllers/verifyToken");

const createCheckoutController = require("../controllers/checkout/create-checkout");
const deleteCheckoutController = require("../controllers/checkout/delete-checkout");
const getCheckoutController = require("../controllers/checkout/get-checkout");
const getCheckoutsController = require("../controllers/checkout/get-checkouts");
const updateCheckoutController = require("../controllers/checkout/update-checkout");

router
  .route("/create-checkout/:basketId")
  .post(verifyToken, createCheckoutController.createCheckout);

router
  .route("/delete-checkout/:checkoutId")
  .delete(deleteCheckoutController.deleteCheckout);

router.route("/getCheckout/:checkoutId").get(getCheckoutController.getCheckout);

router.route("/checkouts").get(getCheckoutsController.getCheckouts);

router
  .route("/update-checkouts/:checkoutId")
  .patch(updateCheckoutController.updateCheckout);

module.exports = router;
