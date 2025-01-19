const mongoose = require("mongoose");
const applyProductCampaign = require("../business/applyProductCampaign");
const { sendMessageToKafka } = require("../kafka");

const productSchema = new mongoose.Schema({
  sellerId: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
    validate: {
      validator: function (value) {
        return value > 0;
      },
      message: "Price must be greater than 0",
    },
  },
  quantity: {
    type: Number,
    required: true,
    default: 1,
    validate: {
      validator: function (value) {
        return value >= 0;
      },
      message: "Quantity must be greater or equal to 0",
    },
  },
  name: {
    type: String,
    required: true,
  },
  brand: {
    brandName: {
      type: String,
      required: true,
    },
    brandId: {
      type: String,
      required: true,
    },
  },
  category: {
    categoryName: {
      type: String,
      required: true,
    },
    categoryId: {
      type: String,
      required: true,
    },
  },
  isRefunded: {
    type: Boolean,
    required: true,
    default: false,
  },
  refundedQuantity: {
    type: Number,
    required: true,
    default: 0,
  },
  discountedPrice: {
    type: Number,
    required: false,
    default: null,
  },
  appliedCampaign: { type: Object, default: {} },
  campaigns: [],
});

productSchema.pre("save", async function (next) {
  await applyProductCampaign(this);
  next();
});

productSchema.post("save", async function () {
  await sendMessageToKafka("productService-productUpdated", { product: this });
});

module.exports = mongoose.model("Product", productSchema);
