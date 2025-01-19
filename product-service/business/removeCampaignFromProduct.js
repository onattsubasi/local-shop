const Product = require("../models/product");
const mongoose = require("mongoose");
const removeCampaignFromProduct = async (campaign) => {
  try {
    const query = {};
    for (let camp of campaign) {
      let productIdList = camp.productIdList;
      let categoryIdList = camp.categoryIdList;
      let brandIdList = camp.brandIdList;
      if (productIdList && productIdList.length > 0) {
        query._id = {
          $in: productIdList.map((id) => mongoose.Types.ObjectId.createFromHexString(id)),
        };
      }

      if (categoryIdList && categoryIdList.length > 0) {
        query["category.categoryId"] = { $in: categoryIdList };
      }

      if (brandIdList && brandIdList.length > 0) {
        query["brand.brandId"] = { $in: brandIdList };
      }
      const products = await Product.find(query);
      for (let product of products) {
        let campaignId = camp._id;
        let indexToRemove = product.campaigns.findIndex(
          (element) => element._id.toString() === campaignId
        );
        if (indexToRemove !== -1) {
          product.campaigns.splice(indexToRemove, 1);
        }
        if (product?.appliedCampaign?._id?.toString() === campaignId) {
          product.appliedCampaign = {};
        }
        await product.save();
      }
    }
  } catch (error) {
    console.log(error);
  }
};
module.exports = removeCampaignFromProduct;
