const UsageFollower = require("../models/usageFollower");
const doCheckAvailability = async (
  userId,
  requestedUsage,
  campaignId,
  couponId
) => {
  try {
    let query = {};
    query = couponId ? { couponId: couponId } : { campaignId: campaignId };

    let usageFollower = await UsageFollower.findOne(query);
    let usageAmount = (usageFollower?.userUsageCount?.get(userId)) ?? 0;

    if (usageFollower.maxLimitInBasket) {
      requestedUsage =
        requestedUsage < usageFollower.maxLimitInBasket
          ? requestedUsage
          : usageFollower.maxLimitInBasket;
    }
    let usableAmount =
      usageAmount + requestedUsage < usageFollower.maxLimitPerCustomer
        ? requestedUsage
        : usageFollower.maxLimitPerCustomer - usageAmount;

    usableAmount =
      usableAmount + usageFollower.totalUsageCount < usageFollower.maxTotalLimit
        ? usableAmount
        : usageFollower.maxTotalLimit - usageFollower.totalUsageCount;

    let userUsage = usableAmount;
    usageFollower.tempUsageCount?.set(userId, userUsage);

    await usageFollower.save();
    return usableAmount;
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
};
module.exports = doCheckAvailability;
