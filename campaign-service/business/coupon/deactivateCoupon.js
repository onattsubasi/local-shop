const Coupon = require("../../models/coupon");
const doDeactivateCoupon = async (couponCode) => {
  try {
    let coupon = await Coupon.findOne({ couponCode: couponCode });
    coupon.isActive = false;
    await coupon.save();
    return coupon;
  } catch (error) {
    console.log(error);
  }
};

module.exports = doDeactivateCoupon;
