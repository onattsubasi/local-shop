const express = require("express");
const app = express();
require("dotenv").config({ path: "dev.env" });

const cookieParser = require("cookie-parser");
const dbConnection = require("./db");
const { connectToKafka } = require("./kafka");

const campaignRoutes = require("./routes/campaignRoutes");
const couponRoutes = require("./routes/couponRoutes");

const newBasketCreatedListener = require("./listeners/newBasketCreatedListener");
const campaignUsageUpdatedListener = require("./listeners/campaignUsageUpdatedListener");
const {
  scheduleCampaignJobs,
} = require("./controller/campaign/expireCampaign");
app.use(cookieParser());
app.use(express.json());
app.use("/api/campaign", campaignRoutes);
app.use("/api/coupon", couponRoutes);

start = async () => {
  await dbConnection();
  app.listen(process.env.CAMPAIGN_SERVICE_PORT);
  console.log(
    "Welcome to campaign service " + process.env.CAMPAIGN_SERVICE_PORT
  );
  await connectToKafka();
  try {
    await Promise.all([
      scheduleCampaignJobs(),
      newBasketCreatedListener(),
      campaignUsageUpdatedListener(),
    ]);
  } catch (error) {
    console.error("Error:", error);
  }
};

start();
