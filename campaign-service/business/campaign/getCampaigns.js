const Campaign = require("../../models/campaign");

const doGetCampaigns = async (campaignIds) => {
  try {
    if (campaignIds === "all") {
      const campaigns = await Campaign.find();
      return campaigns;
    } else {
      const campaigns = [];
      for (let campaignId of campaignIds) {
        const campaign = await Campaign.findById(campaignId);
        campaigns.push(campaign);
      }
      return campaigns;
    }
  } catch (error) {
    throw Error(error);
  }
};
module.exports = doGetCampaigns