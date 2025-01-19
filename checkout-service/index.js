const express = require("express");
require("dotenv").config({ path: "dev.env" });
const dbConnection = require("./db");
const { connectToKafka } = require("./kafka");
const cookieParser = require("cookie-parser");
const app = express();
app.use(express.static("public"));
app.use(cookieParser());
app.use(express.json());

//* Route Files
const checkoutRoutes = require("./routes/checkoutRoutes");
const shipmentRoutes = require("./routes/shipmentRoutes");

const checkoutIsActiveOrderListener = require("./listeners/checkoutIsActiveOrderListener");

app.use("/api/checkouts", checkoutRoutes);
app.use("/api/checkouts", shipmentRoutes);

app.use(express.json());
app.get("/success", (req, res) => {
  res.sendFile("success.html");
});

app.get("/failed", (req, res) => {
  res.sendFile("failed.html");
});
app.get("*", (req, res) => {
  res.status(200).json({
    message: "Hello to checkout service",
  });
});

start = async () => {
    await dbConnection();
    app.listen(process.env.CHECKOUT_SERVICE_PORT);
    console.log(`Listening from port ${process.env.CHECKOUT_SERVICE_PORT}`);
    await connectToKafka();
	try {  
	await Promise.all([checkoutIsActiveOrderListener()]);
  } catch (error) {
    console.error("Error:", error);
  }
};

start();
