/* const Campaign = require("../models/campaign");

const doCheckActiveCampaign = async (campaignIds) => {
  try {
    let deActiveCampaigns = [];
    for (let campaignId in campaignIds) {
      const campaign = await Campaign.findById(campaignId);
      const checkActive = campaign.isActive;
      if (!checkActive) {
        deActiveCampaigns.push(campaignId);
      }
    }
    if (deActiveCampaigns) {
      return [false, deActiveCampaigns];
    }
    return checkActive;
  } catch (err) {
    throw Error(err); // TODO: generic bir error handler yap, check mongoose'u da ona göre dğeiştir ekstra ifli checke gerek yok hata bulursa handler'a düşsün, sebebini oradan çekip responselarsın7
    // TODO: error handling express js videosu çak

    throw new Error("lagaluga", {
      cause: err.cause
    }) 
  }
};
 */