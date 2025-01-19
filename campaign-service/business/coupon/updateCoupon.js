const Coupon = require("../../models/coupon");
const doUpdateCoupon = async (couponCode, couponObj) => {
  try {
    couponCode.metadata.updateDate = Date.now();
    couponCode.version += 1;
    let coupon = await Coupon.findOneAndUpdate(
      { couponCode: couponCode },
      couponObj
    ).lean();
    return coupon;
  } catch (error) {
    console.log(error);
  }
};
module.exports = doUpdateCoupon;
