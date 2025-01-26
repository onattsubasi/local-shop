const mongoose = require("mongoose");

const dbConnection = () => {
  mongoose
    .connect(process.env.MONGO_URI, {
      dbName: "product-service",
    })
    .then(() => {
      console.log("Connection to DB succesful");
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = { dbConnection };
