const Basket = require("../models/basket");
const removeCampaignFromBasket = async (campaign) => {
  try {
    const baskets = await Basket.find();
    for (let basket of baskets) {
      for (let camp of campaign) {
        let campaignId = camp._id.toString();
        let indexToRemove = basket.campaigns.findIndex(
          (element) => element._id.toString() === campaignId
        );
        if (indexToRemove !== -1) {
          basket.campaigns.splice(indexToRemove, 1);
          basket.revertDiscountsForDeleted(camp);
        }
        indexToRemove = basket.appliedCampaigns.findIndex(
          (element) => element._id.toString() === campaignId
        );
        if (indexToRemove !== -1) {
          basket.appliedCampaigns.splice(indexToRemove, 1);
        }
      }
      await basket.save();
    }
  } catch (error) {
    console.log(error);
  }
};
module.exports = removeCampaignFromBasket;
