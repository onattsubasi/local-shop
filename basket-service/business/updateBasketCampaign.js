const Basket = require("../models/basket");
const updateBasketCampaign = async (campaign) => {
  try {
    let baskets = await Basket.find();
    for (let basket of baskets) {
      for (let camp of campaign) {
        let campaignId = camp._id.toString();
        let indexToUpdate = basket.campaigns.findIndex(
          (element) => element._id.toString() === campaignId
        );
        if (indexToUpdate !== -1) {
          basket.campaigns[indexToUpdate] = camp;
        }
      }

      await basket.save();
    }
  } catch (error) {
    console.log(error);
  }
};
module.exports = updateBasketCampaign;
