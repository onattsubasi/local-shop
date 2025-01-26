const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const dbConnection = require('./db');
require("dotenv").config({ path: "dev.env" });
const { connectToKafka} = require('./kafka');
const paymentRoute = require('./routes/card');
const cardRefundAllOrderListener = require('./listeners/cardRefundAllOrder');
const cardRefundProductListener = require('./listeners/cardRefundProduct');

app.use(cookieParser());

app.use(express.json());

app.use('/api/payment',paymentRoute);

start = async () => {
    await dbConnection();
    await app.listen(process.env.PAYMENT_SERVICE_PORT, () => {
        console.log("Welcome to payment service " + process.env.PAYMENT_SERVICE_PORT);
    });

    await connectToKafka();
    try {
      await Promise.all([
        cardRefundAllOrderListener(),
        cardRefundProductListener()
      ]);
      } 
      catch (error) {
          console.error("Error:", error);
      }
};

start();