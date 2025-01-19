const Basket = require("../models/basket");
const axios = require("axios");
const doApplyCoupon = async (coupon, user, token) => {
  try {
    let request = {
      couponId: coupon.couponId,
      userId: user.userId,
      usageAmount: 1,
    };
    const response = await axios.post(
      "http://localhost:8056/api/usageFollower/check-availability",
      request,
      {
        headers: { cookie: `token=${token}` },
      }
    );
    if (response.data === 1) {
      const basket = await Basket.findOne({ "user.userId": user.userId });
      if (coupon.discount.requiredPrice < basket.totalPrice) {
        basket.appliedCoupon = coupon;
        await basket.save();
        return "Coupon Applied!";
      } else {
        throw new Error("Required minimum basket amount not reached");
      }
    } else {
      throw new Error("Coupon Limit has been reached!");
    }
  } catch (error) {
    console.error(error);
  }
};
module.exports = doApplyCoupon;
