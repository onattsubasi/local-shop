const doDeactivateCoupon = require("../../business/coupon/deactivateCoupon");
const Coupon = require("../../models/coupon")
exports.expireCoupon = async () => {
  try {
   const currentDate = new Date();
    const expiredCoupons = await Coupon.find({
      endDate: { $lte: currentDate },
    });
  } catch (error) {
    console.log(error);
  }
};
