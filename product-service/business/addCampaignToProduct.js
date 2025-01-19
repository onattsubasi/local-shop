const Product = require("../models/product");
const mongoose = require("mongoose");
const addCampaignToProduct = async (campaigns) => {
  try {
    for (let campaign of campaigns) {
      let productIdList = campaign.productIdList;
      let brandIdList = campaign.brandIdList;
      let categoryIdList = campaign.categoryIdList;
      delete campaign.productIdList;
      delete campaign.categoryIdList;
      delete campaign.brandIdList;
      delete campaign.__v;
      const query = {};

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
        if (!product.campaigns) {
          product.campaigns = campaign;
        } else {
          const index = product.campaigns.findIndex(
            (productItem) => productItem._id === campaign._id
          );
          if (index !== -1) {
            product.campaigns[index] = {
              ...product.campaigns[index],
              ...campaign,
            };
          } else {
            product.campaigns.push(campaign);
          }
        }
        await product.save();
      }
    }
  } catch (error) {
    console.log(error);
  }
};
module.exports = addCampaignToProduct;
