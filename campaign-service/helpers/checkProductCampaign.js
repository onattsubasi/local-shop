const Campaign = require("../models/campaign");

const doCheckProductCampaign = async (campaignIds) => {
  try {
    let productCampaigns = [];
    for (let campaignId of campaignIds) {
      let campaign = await Campaign.findById(campaignId);
      if (!campaign.applyBasket) {
        productCampaigns.push(campaignId);
      }
    }
    if (productCampaigns.length>0) {
      return [true, productCampaigns];
    }
    return [false,productCampaigns];
  } catch (error) {
    throw Error(error);
  }
};
module.exports = doCheckProductCampaign