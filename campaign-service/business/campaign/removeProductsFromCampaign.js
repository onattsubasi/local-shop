const Campaign = require("../../models/campaign");
const doRemoveProductsFromCampaign = async (
  campaignIds,
  categoryIdList,
  brandIdList,
  productIdList
) => {
  try {
    let productCampaigns = [];
    let basketCampaigns = [];
    for (let campaignId of campaignIds) {
      let campaign = await Campaign.findById(campaignId);
      if (!campaign) {
        return Error(`Campaign with ID: ${campaignId} is not found`);
      }
      let tempBrandIdList = campaign.brandIdList;
      let tempCategoryIdList = campaign.categoryIdList;
      let tempProductIdList = campaign.productIdList;
      if (campaign.categoryIdList && campaign.categoryIdList.length > 0) {
        tempCategoryIdList = tempCategoryIdList.filter((item) => {
          return !categoryIdList.some((el) => el === item.toString());
        });
      }
      if (campaign.brandIdList && campaign.brandIdList.length > 0) {
        tempBrandIdList = tempBrandIdList.filter((item) => {
          return !brandIdList.some((el) => el === item.toString());
        });
      }
      if (campaign.productIdList && campaign.productIdList.length > 0) {
        tempProductIdList = tempProductIdList.filter((item) => {
          return !productIdList.some((el) => el === item.toString());
        });
      }
      campaign.categoryIdList = tempCategoryIdList;
      campaign.brandIdList = tempBrandIdList;
      campaign.productIdList = tempProductIdList;
      await campaign.save();

      console.log(campaign);
      if (campaign.applyBasket) {
        basketCampaigns.push(campaign);
      }
      let tempCamp = {
        _id: campaign._id,
        categoryIdList: categoryIdList,
        brandIdList: brandIdList,
        productIdList: productIdList,
      };
      productCampaigns.push(tempCamp);
    }
    return [basketCampaigns, productCampaigns];
  } catch (error) {
    console.log(error);
  }
};
module.exports = doRemoveProductsFromCampaign;