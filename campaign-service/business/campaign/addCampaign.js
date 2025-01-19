const Campaign = require("../../models/campaign");
const doCheckListAndPush = require("../../helpers/checkListAndPush");
const doAddCampaign = async (
  campaignIds,
  categoryIdList,
  brandIdList,
  productIdList
) => {
  try {
    let productCampaigns = [];
    let basketCampaigns = [];
    for (let campaignId of campaignIds) {
      const campaign = await Campaign.findById(campaignId);
      if (!campaign) {
        throw new Error(`Campaign with ID: ${campaignId} is not found`);
      } else {
        let updatedCategoryIdList = doCheckListAndPush(
          categoryIdList,
          campaign.categoryIdList
        );

        let updatedBrandIdList = doCheckListAndPush(
          brandIdList,
          campaign.brandIdList
        );

        let updatedProductIdList = doCheckListAndPush(
          productIdList,
          campaign.productIdList
        );

        campaign.categoryIdList = updatedCategoryIdList;
        campaign.brandIdList = updatedBrandIdList;
        campaign.productIdList = updatedProductIdList;
        await campaign.save();
        if (campaign.applyBasket) {
          basketCampaigns.push(campaign);
        }
        productCampaigns.push(campaign);
      }
    }
    return [basketCampaigns, productCampaigns];
  } catch (error) {
    console.log(error);
  }
};
module.exports = doAddCampaign;
