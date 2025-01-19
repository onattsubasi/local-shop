const Campaign = require("../../models/campaign");
const doCheckDiscountDescription = require("../../helpers/checkDiscountDescription");

const doUpdateCampaign = async (campaignId, campaignObj) => {
  try {
    campaignObj.metadata.updateDate = Date.now();
    campaignObj.metadata.version += 1;
    let campaign = await Campaign.findByIdAndUpdate(campaignId, campaignObj, {
      new: true,
    }).lean();
    campaign.discount.description = await doCheckDiscountDescription(tempCamp);
    await campaign.save();
    return [[campaign], campaign.applyBasket];
  } catch (error) {
    console.log(error);
  }
};
module.exports = doUpdateCampaign;
