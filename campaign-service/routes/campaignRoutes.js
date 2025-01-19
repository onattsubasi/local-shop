const express = require("express");
const router = express();

const addCampaign = require("../controller/campaign/addCampaign");
const activateCampaign = require("../controller/campaign/activateCampaign");
const createCampaign = require("../controller/campaign/createCampaign");
const deactivateCampaign = require("../controller/campaign/deactivateCampaign");
const deleteCampaign = require("../controller/campaign/deleteCampaign");
const getAllCampaigns = require("../controller/campaign/getAllCampaigns");
const getCampaign = require("../controller/campaign/getCampaign");
const removeCampaignFromBasket = require("../controller/campaign/removeCampaignFromBasket");
const removeProductsFromCampaign = require("../controller/campaign/removeProductsFromCampaign");
const updateCampaign = require("../controller/campaign/updateCampaign");

const verifyToken = require("../controller/verifyToken");
const verifyTokenAdmin = require("../controller/verifyTokenAdmin");

router.get("/get-campaign/:campaignId", verifyToken, getCampaign.getCampaign);
router.get("/get-campaign", verifyToken, getAllCampaigns.getAllCampaign);

router.post(
  "/activate-campaign/:campaignId",
  verifyTokenAdmin,
  activateCampaign.activateCampaign
);
router.post("/activate-campaign", activateCampaign.activateCampaign);

router.post(
  "/deactivate-campaign/:campaignId",
  verifyTokenAdmin,
  deactivateCampaign.deactivateCampaign
);
router.post(
  "/deactivate-campaign",
  verifyTokenAdmin,
  deactivateCampaign.deactivateCampaign
);

router.post(
  "/create-campaign",
  verifyTokenAdmin,
  createCampaign.createCampaign
);

router.patch(
  "/update-campaign/:campaignId",
  verifyTokenAdmin,
  updateCampaign.updateCampaign
);

router.patch(
  "/add-campaign/:campaignId",
  verifyTokenAdmin,
  addCampaign.addCampaign
);

router.patch("/add-campaign", verifyTokenAdmin, addCampaign.addCampaign);

router.patch(
  "/remove-campaign-from-basket/:campaignId",
  verifyTokenAdmin,
  removeCampaignFromBasket.removeCampaignFromBasket
);

router.patch(
  "/remove-campaign-from-basket",
  verifyTokenAdmin,
  removeCampaignFromBasket.removeCampaignFromBasket
);

router.patch(
  "/remove-products-from-campaign/:campaignId",
  verifyTokenAdmin,
  removeProductsFromCampaign.removeProductsFromCampaign
);

router.patch(
  "/remove-products-from-campaign",
  verifyTokenAdmin,
  removeProductsFromCampaign.removeProductsFromCampaign
);

router.delete(
  "/delete-campaign/:campaignId",
  verifyTokenAdmin,
  deleteCampaign.deleteCampaign
);

module.exports = router;
