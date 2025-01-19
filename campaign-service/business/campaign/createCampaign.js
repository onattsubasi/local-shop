const Campaign = require("../../models/campaign");
const doCheckDiscountDescription = require("../../helpers/checkDiscountDescription")
const doCreateCampaign = async (tempCamp) => {
  try {
    tempCamp.discount.description = await doCheckDiscountDescription(tempCamp)
    let campaign = new Campaign(tempCamp);
    await campaign.save();
    return campaign;
  } catch (error) {
    console.error("Error happened in creating campaign",error)
    throw Error(error);
  }
};
module.exports = doCreateCampaign