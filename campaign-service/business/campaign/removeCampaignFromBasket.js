const Campaign = require("../../models/campaign");

const doRemoveCampaignFromBasket = async (campaignIds) => {
  try {
    const removedCampaigns = {};
    const campaigns = [];
    // let tempCategory = categoryIdList;
    // let tempBrand = brandIdList;
    // let tempProduct = productIdList;
    for (let campaignId of campaignIds) {
      const campaign = await Campaign.findById(campaignId);
      if (!campaign) {
        return Error(`Campaign with ID: ${campaignId} is not found`);
      }
      let tempCamp = {
        _id: campaign._id,
      };
      campaigns.push(tempCamp);
    }

    removedCampaigns.campaign = campaigns;
    return removedCampaigns;
  } catch (error) {
    throw Error(error);
  }
};
module.exports = doRemoveCampaignFromBasket