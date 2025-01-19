const Basket = require("../models/basket");
const addCampaignToBasket = async (campaign, basketId) => {
  try {
    let baskets;
    if (basketId) {
      baskets = await Basket.findById(basketId);
      if (baskets.campaigns.length < 1) {
        baskets.campaigns = campaign;
      } else {
        campaign.forEach((campItem) => {
          const index = baskets.campaigns.findIndex(
            (basketItem) => basketItem._id.toString() === campItem._id.toString()
          );
          if (index !== -1) {
            baskets.campaigns[index] = {
              ...baskets.campaigns[index],
              ...campItem,
            };
          } else {
            baskets.campaigns.push(campItem);
          }
        });
      }
      let remainingCampaigns = baskets.revertCampaigns(campaign);
      baskets.revertDiscountsForAdded(remainingCampaigns);
      await baskets.save();
    } else {
      baskets = await Basket.find();

      for (let basket of baskets) {
        if (basket.campaigns.length < 1) {
          basket.campaigns = campaign;
        } else {
          campaign.forEach((campItem) => {
            const index = basket.campaigns.findIndex(
              (basketItem) => basketItem._id.toString() === campItem._id.toString()
            );
            if (index !== -1) {
              basket.campaigns[index] = {
                ...basket.campaigns[index],
                ...campItem,
              };
            } else {
              basket.campaigns.push(campItem);
            }
          });
        }
        let remainingCampaigns = basket.revertCampaigns(campaign);
        basket.revertDiscountsForAdded(remainingCampaigns);
        console.log(basket.products)
        await basket.save();
      }
    }
  } catch (error) {
    console.log(error);
  }
};
module.exports = addCampaignToBasket;
