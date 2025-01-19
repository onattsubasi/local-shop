const mongoose = require("mongoose");
const applyBasketCampaign = require("../business/applyBasketCampaign");
const checkDiscountedQuantity = require("../business/checkDiscountedQuantity")
const basketSchema = new mongoose.Schema(
  {
    user: {
      userId: {
        type: String,
        required: true,
        index: true,
      },
      userType: {
        type: [String],
        default: ["default"],
      },
    },
    products: [
      {
        productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
        _id: false,
        quantity: Number,
        price: Number,
        isRefunded: Boolean,
        refundedQuantity: Number,
        sellerId: String,
        categoryId: String,
        brandId: String,
        discountedPrice: Number,
        appliedCampaign: {},
        discountSource: {
          type: String,
          enum: ["campaign", "product"],
          default: "product",
        },
      },
    ],
    totalPrice: {
      type: Number,
    },
    totalDiscountedPrice: {
      type: Number,
    },
    totalDiscountAmount: {
      type: Number,
    },
    campaigns: [],
    appliedCampaigns: [],
    appliedCoupon: {},
  },
  { versionKey: false }
);

basketSchema.pre("save", async function (next) {
  
  await checkDiscountedQuantity(this)
  await applyBasketCampaign(this);
  next();
});

basketSchema.methods.revertCampaigns = function (campaigns) {
  let basketAppliedCampaigns1 = this.appliedCampaigns;
  let basketAppliedCampaigns2 = basketAppliedCampaigns1;
  let basketCampaigns = this.campaigns;
  basketAppliedCampaigns1 = basketAppliedCampaigns1?.filter(
    (basketAppliedCampaign) => {
      return campaigns.every(
        (campaign) => basketAppliedCampaign.priority > campaign.priority
      );
    }
  );

  basketAppliedCampaigns2 = basketAppliedCampaigns2?.filter(
    (basketAppliedCampaign) => {
      return campaigns.every(
        (campaign) => basketAppliedCampaign.priority <= campaign.priority
      );
    }
  );
  basketAppliedCampaigns2.forEach((campaign) => {
    const index = basketCampaigns.findIndex(
      (basketItem) => basketItem._id.toString() === campaign._id.toString()
    );
    if (index !== -1) {
      basketCampaigns[index].campaignApplied = false;
      delete basketCampaigns[index].discountAmount;
      delete basketCampaigns[index].discountPercentage;
      delete basketCampaigns[index].totalPrice;
      console.log(basketCampaigns[index]);
    }
  });
  this.campaigns = basketCampaigns;
  this.appliedCampaigns = basketAppliedCampaigns1;
  return basketAppliedCampaigns1;
};

basketSchema.methods.revertDiscountsForAdded = function (campaign) {
  let campaigns = [];
  campaigns = campaign;
  campaigns.map((camp) => camp._id.toString());
  for (let product of this.products) {
    if (
      product.appliedCampaign &&
      !campaigns.includes(product.appliedCampaign._id.toString()) &&
      product.discountSource === "campaign"
    ) {
      product.discountedPrice = null;
      product.appliedCampaign = null;
      product.discountSource = "product";
    }
  }
};
basketSchema.methods.revertDiscountsForDeleted = function (campaign) {
  for (let product of this.products) {
    if (
      product.appliedCampaign &&
      product.appliedCampaign._id.toString() === campaign._id.toString() &&
      product.discountSource === "campaign"
    ) {
      product.discountedPrice = null;
      product.appliedCampaign = null;
      product.discountSource = "product";
    }
  }
};

module.exports = mongoose.model("Basket", basketSchema);