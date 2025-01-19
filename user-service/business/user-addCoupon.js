const User = require("../models/user");
const doAddCoupon = async (parsedMessage) => {
  try {
    const userId = parsedMessage?.userId;
    const coupon = parsedMessage?.resMsg;
    let user = await User.findById(userId);
    if (
      !user.coupons.some(
        (existingCoupon) =>
          existingCoupon._id.toString() === coupon._id.toString()
      )
    ) {
      user.coupons.push(coupon);
      await user.save();
    } else {
      return new Error("Coupon have been already redeemed!");
    }
    console.log("user coupon added!");
  } catch (error) {
    console.error(error);
  }
};
module.exports = doAddCoupon;
