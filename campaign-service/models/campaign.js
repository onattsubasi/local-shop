const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const campaignSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    discount: {
      type: {
        type: String,
        enum: [
          "percentage",
          "flat",
          "BuyXPayY",
          "BuyXGetTotalPercentage",
          "BuyXGetPercentage",
          "BuyXGetFlat",
          "MinXAmountToYPercentage",
          "MinXAmountToYFlat",
          // "SpecificProducts"
        ],
        required: true,
      },
      amount: {
        type: Number,
        required: function () {
          return this.discount.type !== "BuyXPayY";
        },
        min: [0, "Discount amount must be greater than 0"],
        description: { type: String, required: false },
      },
      BuyX: {
        type: Number,
        required: function () {
          return (
            this.discount.type !== "percentage" &&
            this.discount.type !== "flat" &&
            this.discount.type !== "MinXAmountToYPercentage" &&
            this.discount.type !== "MinXAmountToYFlat"
          );
        },
        min: [1, "Buy X must be at least 1"],
      },
      PayY: {
        type: Number,
        required: function () {
          return this.discount.type === "BuyXPayY";
        },
        min: [1, "Get Y must be at least 1"],
      },
      minTotalBasketPrice: {
        type: Number,
        required: function () {
          return (
            this.discount.type !== "percentage" && this.discount.type !== "flat"
          );
        },
      },
      description: { type: String, default: {} },
      maxDiscountAmount: {
        type: Number,
        required: function () {
          return (
            this.discount.type === "BuyXGetTotalPercentage" ||
            this.discount.type === "MinXAmountToYPercentage"
          );
        },
      },
    },
    priority: {
      type: Number,
      required: true,
    },
    categoryIdList: [
      {
        type: Schema.Types.ObjectId,
        ref: "Category",
        _id: false,
      },
    ],
    brandIdList: [
      {
        type: Schema.Types.ObjectId,
        ref: "Brand",
        _id: false,
      },
    ],
    productIdList: [
      {
        type: Schema.Types.ObjectId,
        ref: "Product",
        _id: false,
      },
    ],
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    isActive: {
      type: Boolean,
      required: true,
    },
    applyBasket: {
      type: Boolean,
      required: true,
      default: function () {
        return (
          this.discount.type !== "percentage" && this.discount.type !== "flat"
        );
      },
    },
    maxLimitInBasket: {
      type: Number,
      required: function () {
        return (
          this.discount.type !== "percentage" &&
          this.discount.type !== "flat" &&
          this.discount.type !== "MinXAmountToYPercentage" &&
          this.discount.type !== "MinXAmountToYFlat"
        );
      },
      default: function () {
        if (
          this.discount.type === "BuyXGetTotalPercentage" ||
          this.discount.type === "MinXAmountToYPercentage"
        ) {
          return 1;
        }
      },
    },
    maxLimitInProduct: {
      type: Number,
      required: function () {
        return (
          this.discount.type === "percentage" || this.discount.type === "flat"
        );
      },
    },
    maxTotalLimit: {
      type: Number,
      required: true,
    },
    maxLimitPerCustomer: {
      type: Number,
      required: true,
    },
    campaignApplied: {
      type: Boolean,
      required: false,
      default: false,
    },
    // mergeWithOtherCampaigns: { // => with this, basket campaigns merge with product campaigns. such that if a product has a flat discount, it can be carried out to basket campaign.
    //   type: Boolean,
    //   required: true,
    // },
    targetUserType: {
      type: String,
      required: true,
      enum: ["default", "academic", "member"],
    },
    metadata: {
      createDate: {
        type: Date,
        default: Date.now(),
      },
      updateDate: {
        type: Date,
      },
    },
  },
  { versionKey: false }
);
const Campaign = mongoose.model("Campaign", campaignSchema);
module.exports = Campaign;
