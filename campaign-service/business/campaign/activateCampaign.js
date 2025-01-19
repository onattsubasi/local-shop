const Campaign = require("../../models/campaign.js");
const doActivateCampaign = async (campaignIds) => {
  try {
    let productCampaigns = [];
    let basketCampaigns = [];
    for (let campaignId of campaignIds) {
      const campaign = await Campaign.findById(campaignId);
      if (!campaign) {
        return Error(`Campaign with ID: ${campaignId} is not found`);
      }
      campaign.isActive = true;
      await campaign.save();
      if (campaign.applyBasket) {
        basketCampaigns.push(campaign);
      }
      productCampaigns.push(campaign);
    }
    return [basketCampaigns, productCampaigns];
  } catch (error) {
    console.log(error);
  }
};
module.exports = doActivateCampaign
