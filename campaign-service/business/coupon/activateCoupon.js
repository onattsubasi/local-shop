const Coupon = require("../../models/coupon");
const doActivateCoupon = async (couponCode) => {
  try {
    let coupon = await Coupon.findOne({ couponCode: couponCode });
    coupon.isActive = true;
    await coupon.save();
    return coupon;
  } catch (error) {
    console.log(error);
  }
};

module.exports = doActivateCoupon;
