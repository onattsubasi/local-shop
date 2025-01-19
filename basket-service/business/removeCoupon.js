const Basket = require("../models/basket");
const doRemoveCoupon = async (user) => {
  try {
    const basket = await Basket.findOne({ "user.userId": user.userId });
    basket.appliedCoupon = {};
    await basket.save();
    return "Coupon Removed!";
  } catch (error) {
    console.error(error);
  }
};
module.exports = doRemoveCoupon;
