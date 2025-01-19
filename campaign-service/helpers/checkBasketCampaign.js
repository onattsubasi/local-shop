const Campaign = require("../models/campaign");

const doCheckBasketCampaign = async (campaignIds) => {
  try {
    let basketCampaigns = [];
    for (let campaignId of campaignIds) {
      const campaign = await Campaign.findById(campaignId);
      const checkBasket = campaign.applyBasket;
      if (checkBasket) {
        basketCampaigns.push(campaignId);
      }
    }
    if (basketCampaigns) {
      return [true, basketCampaigns];
    }
    return [checkBasket,basketCampaigns];
  } catch (error) {
    throw Error(error);
  }
};
module.export = doCheckBasketCampaign
