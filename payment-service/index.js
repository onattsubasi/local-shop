const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const dbConnection = require('./db');
require("dotenv").config({ path: "dev.env" });
const { connectToKafka, sendMessageToKafka} = require('./kafka');
const paymentRoute = require('./routes/card');
const cardRefundAllOrderListener = require('./listeners/cardRefundAllOrder');
const cardRefundProductListener = require('./listeners/cardRefundProduct');

app.use(cookieParser());

app.use(express.json());

app.use('/api/payment',paymentRoute);

start = async () => {
    await dbConnection();
    await app.listen(process.env.PORT, () => {
        console.log(`Connected ${process.env.PORT}`);
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