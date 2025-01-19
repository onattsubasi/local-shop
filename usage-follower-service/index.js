const express = require("express");
const app = express();
require("dotenv").config({ path: "dev.env" });
const cookieParser = require("cookie-parser");
const dbConnection = require("./db");
const { connectToKafka } = require("./kafka");

const campaignCreatedListener = require("./listeners/campaignCreatedListener");
const campaignDeletedListener = require("./listeners/campaignDeletedListener");
const campaignUpdatedListener = require("./listeners/campaignUpdatedListener");
const couponCreatedListener = require("./listeners/couponCreatedListener");
const couponDeletedListener = require("./listeners/couponDeletedListener");
const couponRedeemedListener = require("./listeners/couponRedeemedListener");
const couponUpdatedListener = require("./listeners/couponUpdatedListener");
const usageFollowerRoute = require("./routes/usageFollowerRoutes");

app.use(cookieParser())
app.use(express.json());
app.use("/api/usageFollower", usageFollowerRoute);

start = async () => {
  await dbConnection();
  app.listen(process.env.USAGE_FOLLOWER_SERVICE_PORT);
  await connectToKafka();
  try {
    await Promise.all([
      campaignCreatedListener(),
      campaignDeletedListener(),
      campaignUpdatedListener(),
      couponCreatedListener(),
      couponDeletedListener(),
      couponRedeemedListener(),
      couponUpdatedListener(),
    ]);
  } catch (error) {
    console.error("Error:", error);
  }
};

start();
