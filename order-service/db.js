const mongoose = require("mongoose");

const dbConnection = async () => {
  mongoose
    .connect(process.env.MONGO_URI, {
      dbName: "order--service",
    })
    .then(() => console.log("Database Connected!"))
    .catch((err) => {
      console.log(err);
    });
};

module.exports = dbConnection;
