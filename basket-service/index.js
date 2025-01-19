const express = require("express");
const cookieParser = require("cookie-parser");
require("dotenv").config({ path: "dev.env" });
const { dbConnection } = require("./db");
const { connectToKafka } = require("./kafka");
const app = express();

const basketRoutes = require("./routes/basketRoutes");

const basketDeleteListener = require("./listeners/basketDeleteListener");
const basketCampaignAddedListener = require("./listeners/basketCampaignAddedListener");
const basketCampaignAddedToNewListener = require("./listeners/basketCampaignAddedToNewListener");
const basketCampaignCreatedListener = require("./listeners/basketCampaignCreatedListener");
const basketCampaignDeactivatedListener = require("./listeners/basketCampaignDeactivatedListener");
const basketCampaignDeletedListener = require("./listeners/basketCampaignDeletedListener");
const basketCampaignProductsRemovedListener = require("./listeners/basketCampaignProductsRemovedListener");
const basketCampaignRemovedListener = require("./listeners/basketCampaignRemovedListener");
const basketCampaignUpdatedListener = require("./listeners/basketCampaignUpdatedListener");
const basketProductDeletedListener = require("./listeners/basketProductDeletedListener");
const basketProductUpdatedListener = require("./listeners/basketProductUpdatedListener");

app.use(cookieParser());

app.use(express.json());

app.use("/api/basket", basketRoutes);

start = async () => {
  dbConnection();
  await app.listen(process.env.BASKET_SERVICE_PORT);
  console.log("Welcome to basket service " + process.env.BASKET_SERVICE_PORT);
  await connectToKafka();
  try {
    await Promise.all([
      basketDeleteListener(),
      basketCampaignAddedListener(),
      basketCampaignAddedToNewListener(),
      basketCampaignCreatedListener(),
      basketCampaignDeactivatedListener(),
      basketCampaignDeletedListener(),
      basketCampaignProductsRemovedListener(),
      basketCampaignRemovedListener(),
      basketCampaignUpdatedListener(),
      basketProductDeletedListener(),
      basketProductUpdatedListener(),
    ]);
  } catch (error) {
    console.error("Error:", error);
  }
};

start();
