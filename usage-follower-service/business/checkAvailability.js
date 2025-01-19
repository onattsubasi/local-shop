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
    let usageAmount = (await usageFollower?.userUsageCount?.get(userId)) ?? 0;

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

    /*    //TODO: burası, sepet ödenip, siparişe dönüştüğünde olmalı => sepetteki ürün ve dundan dolayı kampanya kullanım değişiklikleri etki etmemeli!
=> checkout'a geçince yapılabilir?
*/
    let userUsage = usableAmount;
    await usageFollower.tempUsageCount?.set(userId, userUsage);
    //usageFollower.totalUsageCount += usableAmount;

    await usageFollower.save();
    return usableAmount;
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
};
module.exports = doCheckAvailability;
