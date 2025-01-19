const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const usageFollowerSchema = new Schema(
  {
    couponId: {
      type: mongoose.Schema.ObjectId,
      spars: true,
      _id: false,
    },
    campaignId: {
      type: mongoose.Schema.ObjectId,
      sparse: true,
      _id: false,
    },
    maxLimitInBasket: { type: Number },
    maxTotalLimit: { type: Number },
    maxLimitPerCustomer: { type: Number },
    totalUsageCount: {
      type: Number,
      default: 0,
    },
    userUsageCount: {
      type: Map,
      of: Number,
      default: {},
    },
    tempUsageCount: {
      type: Map,
      of: Number,
      default: {},
    },
  },
  { versionKey: false }
);
const usageFollower = mongoose.model("usageFollower", usageFollowerSchema);
module.exports = usageFollower;
