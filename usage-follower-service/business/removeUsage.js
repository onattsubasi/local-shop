const UsageFollower = require("../models/usageFollower");

const doRemoveUsage = async (userId, campaignIds, couponId, requestedUsage) => {
  try {
    for (let campaign of campaignIds) {
      let campaignUsageFollower = await UsageFollower.findOne({
        campaignId: campaign,
      });
      let usageAmount = campaignUsageFollower?.tempUsageCount?.get(userId) ?? 0;
      let usedAmount = campaignUsageFollower?.userUsageCount?.get(userId) ?? 0;
      campaignUsageFollower.totalUsageCount -= usageAmount;
      campaignUsageFollower.userUsageCount.set(
        userId,
        usedAmount - usageAmount
      );
      await campaignUsageFollower.save();
    }
    if (couponId) {
      let couponUsageFollower = await UsageFollower.findOne({
        couponId: couponId,
      });
      let usageAmount = couponUsageFollower?.tempUsageCount?.get(userId) ?? 0;
      let usedAmount = couponUsageFollower?.userUsageCount?.get(userId) ?? 0;
      couponUsageFollower.totalUsageCount -= usageAmount;
      couponUsageFollower.userUsageCount.set(userId, usedAmount - usageAmount);
      await couponUsageFollower.save();
    }
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};
module.exports = doRemoveUsage;
