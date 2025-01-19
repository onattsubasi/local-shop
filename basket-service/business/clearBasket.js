const Basket = require("../models/basket");
const { sendMessageToKafka } = require("../kafka");
const doClearBasket = async (basketId, setUsage) => {
  try {
    const basket = await Basket.findById(basketId);
    if (setUsage) {
      let campaignIds = basket.appliedCampaigns?.map((item) => item._id);
      let couponId = basket.appliedCoupon?._id;
      await sendMessageToKafka("basketService-setUsage-active", {
        userId: basket.user.userId,
        campaignIds: campaignIds,
        couponId: couponId,
      });
    }
    basket.products = [];
    basket.appliedCampaigns = [];
    basket.totalPrice = 0;
    await basket.save();
    return basket;
  } catch (error) {
    console.error(
      "There is an error occurred while clearing the basket",
      error
    );
  }
};

module.exports = doClearBasket;
