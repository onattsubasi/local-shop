const UsageFollower = require("../models/usageFollower");
const doUpdateFollower = async (tempId, tempObj) => {
  try {
    let usageFollower = await UsageFollower.findByIdAndUpdate(tempId, tempObj, {
      new: true,
    }).lean();
    if (!usageFollower) {
      usageFollower = await UsageFollower.findOneAndUpdate(
        { campaignId: tempId },
        tempObj,
        { new: true }
      ).lean();
      if (!usageFollower) {
        usageFollower = await UsageFollower.findOneAndUpdate(
          { couponId: tempId },
          tempObj,
          { new: true }
        ).lean();
      }
    }
    await usageFollower.save();
    return usageFollower;
  } catch (error) {
    console.error("Error happened in updating follower", error);
    throw Error(error);
  }
};
module.exports = doUpdateFollower;
