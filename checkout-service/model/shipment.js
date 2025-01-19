const mongoose = require("mongoose");

const ShipmentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true
    },
  }
);

ShipmentSchema.set("versionKey", "recordVersion");
ShipmentSchema.set("timestamps", true);

module.exports = mongoose.model("Shipment", ShipmentSchema);
