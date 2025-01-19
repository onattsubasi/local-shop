const express = require("express");
const router = express.Router();

const createShipmentController = require("../controllers/shipment/create-shipment");
const deleteShipmentController = require("../controllers/shipment/delete-shipment");
const getShipmentController = require("../controllers/shipment/get-shipment");
const getShipmentsController = require("../controllers/shipment/get-shipments");
const updateShipmentController = require("../controllers/shipment/update-shipment");

router.route("/create-shipment").post(createShipmentController.createShipment);

router
  .route("/delete-shipments/:shipmentId")
  .delete(deleteShipmentController.deleteShipment);

router
  .route("/get-shipments/:shipmentId")
  .get(getShipmentController.getShipment);

router.route("/get-shipments").get(getShipmentsController.getShipments);

router
  .route("/update-shipments/:shipmentId")
  .patch(updateShipmentController.updateShipment);

module.exports = router;
