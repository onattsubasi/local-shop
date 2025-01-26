const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
const dbConnection = require("./db");
require("dotenv").config({ path: "dev.env" });
const userRoute = require("./routes/user");
const { connectToKafka} = require("./kafka");
const userCouponRedeemedListener = require("./listeners/userCouponRedeemedListener.js");

app.use(cookieParser());
app.use(express.json());
app.use("/api/user", userRoute);

start = async () => {
  await dbConnection();
  await app.listen(process.env.USER_SERVICE_PORT, () => {
    console.log("Welcome to user service " + process.env.USER_SERVICE_PORT);
  });
  await connectToKafka();
  try {
    await Promise.all([userCouponRedeemedListener()]);
  } catch (error) {
    console.error("Error:", error);
  }
};

start();
