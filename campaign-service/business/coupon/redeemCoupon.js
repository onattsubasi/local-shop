const Coupon = require("../../models/coupon");

const doRedeemCoupon = async (couponCode) => {
  try {
    let coupon = await Coupon.findOne({ couponCode:couponCode });
    if (!coupon) {
      throw new Error("Coupon not found");
    }
    coupon.metadata.redeemDate = Date.now()
    await coupon.save()
    return coupon
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
};

module.exports = doRedeemCoupon;
