const mongoose = require("mongoose");
const dbConnection = async () => {
  mongoose
    .connect(process.env.MONGO_URI, {
      dbName: "usageFollower-service",
    })
    .then(() => {
      console.log("Connected to DB!");
    })
    .catch((error) => {
      console.log(error);
    });
};

module.exports = dbConnection;
