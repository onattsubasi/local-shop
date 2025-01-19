// old product apply

const applyProductCampaign = async (product) => {
  try {
    let campaigns = product.campaigns.filter(
      (element) => !element.applyBasket && element.isActive
    );
    if (campaigns.length > 0) {
        product.discountedPrice = product.price;
        let flatCamps = campaigns.filter(
          (element) => element.discount.type === "flat"
        );
        let percentageCamps = campaigns.filter(
          (element) => element.discount.type === "percentage"
        );
        let flatAmount = 0;
        let percentageAmount = 0;
        let tempFlatCamp;
        let tempPercentageCamp;
        if (flatCamps.length > 0) {
          for (let camp of flatCamps) {
            if (camp.discount.amount > flatAmount) {
              flatAmount = camp.discount.amount;
              tempFlatCamp = camp;
            }
          }
        }
        if (percentageCamps.length > 0) {
          for (let camp of percentageCamps) {
            if (camp.discount.amount > percentageAmount) {
              percentageAmount = camp.discount.amount;
              tempPercentageCamp = camp;
            }
          }
        }
        let flatDiscountedPrice = product.price - flatAmount;
        let percentageDiscountedPrice =
          (product.price * (100 - percentageAmount)) / 100;
        if (percentageDiscountedPrice > flatDiscountedPrice) {
          product.appliedCampaign = tempFlatCamp;
          product.discountedPrice = flatDiscountedPrice;
        } else {
          product.appliedCampaign = tempPercentageCamp;
          product.discountedPrice = percentageDiscountedPrice;
        }
        product.appliedCampaign.campaignApplied = true;
      // }
    }else{
      product.appliedCampaign = {}
      product.discountedPrice = product.price;
    }
    return product;
  } catch (error) {
    console.log(error);
  }
};
module.exports = applyProductCampaign


/* const applyProductCampaign = async (product) => {
  try {
    const activeCampaigns = product.campaigns.filter(
      (campaign) => !campaign.applyBasket && campaign.isActive
    );
    if (activeCampaigns.length < 1) {
      return {
        ...product,
        appliedCampaign: {},
        discountedPrice: product.price,
      };
    }

    const [flatCampaign, percentageCampaign] = ["flat", "percentage"].map(
      (type) =>
        activeCampaigns
          .filter((campaign) => campaign.discount.type === type)
          .reduce(
            (max, campaign) =>
              campaign.discount.amount > max.discount.amount ? campaign : max,
            { discount: { amount: 0 } }
          )
    );

    const flatDiscountedPrice = product.price - flatCampaign.discount.amount;
    const percentageDiscountedPrice =
      product.price * (1 - percentageCampaign.discount.amount / 100);
    const [appliedCampaign, discountedPrice] =
      percentageDiscountedPrice > flatDiscountedPrice
        ? [flatCampaign, flatDiscountedPrice]
        : [percentageCampaign, percentageDiscountedPrice];
    let temp = {
      ...product,
      appliedCampaign: { ...appliedCampaign, campaignApplied: true },
      discountedPrice,
    };
    return temp;
  } catch (error) {
    console.error("Error applying product campaign:", error);
    throw error;
  }
};

module.exports = applyProductCampaign;
 */