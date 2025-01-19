const express = require("express");
const cookieParser = require("cookie-parser");
require("dotenv").config({ path: "dev.env" });
const categoriesRouter = require("./routes/categories");
const { connectToKafka} = require("./kafka");
const { dbConnection } = require("./db");

const app = express();
app.use(cookieParser());
app.use(express.json());

app.use("/api/categories", categoriesRouter);

start = async () => {
  try {
    dbConnection();
    await app.listen(process.env.CATEGORY_SERVICE_PORT);
    console.log(
      "Welcome to category service " + process.env.CATEGORY_SERVICE_PORT
    );
    await connectToKafka();
  } catch (error) {
    console.error("Error:", error);
  }
};
start();
