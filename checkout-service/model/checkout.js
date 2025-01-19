const mongoose = require("mongoose");

const checkoutSchema = new mongoose.Schema(
  {
    basketId: {
      type: mongoose.Types.ObjectId,
      required: true
    },
    userId: {
      type: mongoose.Types.ObjectId,
      required: true
    },
    address: {
      type: String,
      required:true
    },
    isGift: {
      type: Boolean,
      default: false,
    },
    shipmentId: {
      type: mongoose.Types.ObjectId,
      ref: "Shipment",
      required:true
    },
    totalPrice: {
      type: Number,
      required:true
    },
    status: {
      type: String,
      default: "Pending",
    },
    address: {
      type:String,
      required: true
    },
    isActive:{
      type:Boolean
    },
    products:[]
  }
);

checkoutSchema.set("versionKey", "recordVersion");
checkoutSchema.set("timestamps", true);

module.exports = mongoose.model("Checkout", checkoutSchema);
