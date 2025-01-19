const Coupon = require("../../models/coupon");
const doGetCoupon = async (couponCode) => {
  try {
    let coupon = await Coupon.findOne({ couponCode: couponCode });
    return coupon;
  } catch (error) {
    console.log(error);
  }
};

module.exports = doGetCoupon;
