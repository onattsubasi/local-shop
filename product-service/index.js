const express = require("express");
require("dotenv").config({ path: "dev.env" });
const mongoose = require("mongoose");
const { dbConnection } = require("./db");
const { connectToKafka } = require("./kafka");
const cookieParser = require("cookie-parser");

const productRoutes = require("./routes/productRoutes");

const productQuantityDecreaseListener = require("./listeners/productQuantityDecreaseListener");
const productsRefundedIncreaseQuantityListener = require("./listeners/productsRefundedIncreaseQuantityListener");
const productRefundedIncreaseQuantityListener = require("./listeners/productRefundedIncreaseQuantityListener");
const productCampaignActivatedListener = require("./listeners/productCampaignActivatedListener");
const productCampaignAddedListener = require("./listeners/productCampaignAddedListener");
const productCampaignCreatedListener = require("./listeners/productCampaignCreatedListener");
const productCampaignDeactivatedListener = require("./listeners/productCampaignDeactivatedListener");
const productCampaignDeletedListener = require("./listeners/productCampaignDeletedListener");
const productCampaignRemovedListener = require("./listeners/productCampaignRemovedListener");
const productCampaignUpdatedListener = require("./listeners/productCampaignUpdatedListener");
const app = express();

app.use(cookieParser());

app.use(express.json());

app.use("/api/product", productRoutes);

start = async () => {
  dbConnection();
  await app.listen(process.env.PRODUCT_SERVICE_PORT);
  console.log("Welcome to product service " + process.env.PRODUCT_SERVICE_PORT);
  await connectToKafka();
  try {
    await Promise.all([
      productCampaignActivatedListener(),
      productQuantityDecreaseListener(),
      productsRefundedIncreaseQuantityListener(),
      productRefundedIncreaseQuantityListener(),
      productCampaignAddedListener(),
      productCampaignCreatedListener(),
      productCampaignDeactivatedListener(),
      productCampaignDeletedListener(),
      productCampaignRemovedListener(),
      productCampaignUpdatedListener(),
    ]);
  } catch (error) {
    console.error("Error:", error);
  }
};

start();
