const express = require("express");
const router = express();

const createFollower = require("../controller/createFollower");
const deleteFollower = require("../controller/deleteFollower");
const updateFollower = require("../controller/updateFollower");
const getAvailability = require("../controller/getAvailability");
const checkAvailability = require("../controller/checkAvailability");

const verifyToken = require("../controller/verifyToken");
const verifyTokenAdmin = require("../controller/verifyTokenAdmin");

router.post(
  "/create-follower",
  verifyTokenAdmin,
  createFollower.createFollower
);

router.delete(
  "/delete-follower/:usageFollowerId",
  verifyTokenAdmin,
  deleteFollower.deleteFollower
);

router.patch(
  "/update-follower/:usageFollowerId",
  verifyTokenAdmin,
  updateFollower.updateFollower
);

router.post(
  "/get-availability/:campaignId",
  getAvailability.getAvailability
);

router.post(
  "/get-availability/:couponId",
  getAvailability.getAvailability
);

router.post(
  "/check-availability",
  checkAvailability.checkAvailability
);

module.exports = router;
