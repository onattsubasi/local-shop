const Campaign = require("../../models/campaign");

const doDeleteCampaign = async (campaignId) => {
  try {
    const campaign = await Campaign.findByIdAndDelete(campaignId);
    let checkListEmpty = true;
    // even though campaign is deleted, it returns deleted campaigns properties => returns the _id of campaign
    if(campaign?.productIdList||campaign?.brandIdList||campaign?.categoryIdList){
      checkListEmpty = false;
    }
    return [campaign, campaign?.applyBasket, checkListEmpty];
  } catch (error) {
    console.log(error)
  }
};
module.exports = doDeleteCampaign