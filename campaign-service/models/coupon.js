const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const couponSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    endDate: {
      type: Date,
      required: true,
    },
    discount: {
      type: {
        type: String,
        enum: ["flat", "percentage"],
      },
      amount: {
        type: Number,
        required: true,
      },
      requiredPrice: {
        type: Number,
        required: true,
      },
    },
    couponCode: {
      type: String,
      required: true,
      minlength: 7,
      unique: true,
    },
    isActive: {
      type: Boolean,
      required: true,
    },
    maxTotalLimit: {
      type: Number,
      required: true,
    },
    maxLimitPerCustomer: {
      type: Number,
      required: true,
    },
    metadata: {
      redeemDate: {
        type: Date,
      },
      createDate: {
        type: Date,
        default: Date.now(),
      },
      updateDate: {
        type: Date,
      },
      version: {
        type: Number,
        default: 1,
      },
      default: {},
    },
  },
  {
    versionKey: false,
  }
);
const Coupon = mongoose.model("Coupon", couponSchema);
module.exports = Coupon;
