const mongoose = require("mongoose");

const dbConnection = async () => {
  mongoose
    .connect(process.env.MONGO_URL, {
      dbName: "payment--service",
    })
    .then(() => console.log("Database Connected!"))
    .catch((err) => {
      console.log(err);
    });
};

module.exports = dbConnection;
