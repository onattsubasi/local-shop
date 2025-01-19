const UsageFollower = require("../models/usageFollower");
const doRedeemFollower = async (parsedMessage) => {
  try {
    const userId = parsedMessage.userId;
    const coupon = parsedMessage.resMsg;
    let usageFollower = await UsageFollower.findOne({
      couponId: coupon._id,
    });
    usageFollower.userUsageCount.set(userId, 0);
    await usageFollower.save();
  } catch (error) {
    console.error(error);
  }
};
module.exports = doRedeemFollower