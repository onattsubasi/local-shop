const express = require("express");
const app = express();
const dbConnection = require("./db");
const { connectToKafka } = require("./kafka");
require("dotenv").config({ path: "dev.env" });
const cookieParser = require("cookie-parser");

const orderRoute = require("./routes/order");
const paymentAcceptedListener = require("./listeners/paymentAcceptedListener");

app.use(cookieParser());
app.use(express.json());
app.use("/api/order", orderRoute);


start = async () => {
  await dbConnection();
  await app.listen(process.env.PORT, () => {
    console.log(`Connected ${process.env.PORT}`);
  });

  await connectToKafka();
  try {
    await Promise.all([paymentAcceptedListener()]);
  } catch (error) {
    console.error("Error:", error);
  }
};

start();
