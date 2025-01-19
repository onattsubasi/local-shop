const Coupon = require("../../models/coupon");
const doDeleteCoupon = async (couponCode) => {
  try {
    const coupon = await Coupon.findOneAndDelete({ couponCode: couponCode });
    return coupon;
  } catch (error) {
    console.log(error);
  }
};
module.exports = doDeleteCoupon;
