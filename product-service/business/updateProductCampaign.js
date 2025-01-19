const Product = require("../models/product");
const mongoose = require("mongoose");
const updateProductCampaign = async (campaigns) => {
  try {
    const query = {};
    for (let campaign of campaigns) {
      let productIdList = campaign.productIdList;
      let categoryIdList = campaign.categoryIdList;
      let brandIdList = campaign.brandIdList;
      delete campaign.productIdList;
      delete campaign.categoryIdList;
      delete campaign.brandIdList;
      delete campaign.__v;
      if (productIdList && productIdList.length > 0) {
        query._id = {
          $in: productIdList.map((id) =>
            mongoose.Types.ObjectId.createFromHexString(id)
          ),
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
        let campaignId = campaign._id;
        let indexToUpdate = product.campaigns.findIndex(
          (element) => element._id.toString() === campaignId
        );
        if (indexToUpdate !== -1) {
          product.campaigns[indexToUpdate] = campaign;
        }
        if (product?.appliedCampaign?._id?.toString() === campaignId) {
          product.appliedCampaign = campaign;
        }
        await product.save();
      }
    }
  } catch (error) {
    console.log(error);
  }
};
module.exports = updateProductCampaign;
