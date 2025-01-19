const UsageFollower = require("../models/usageFollower");

const doDeleteFollower = async (tempId, type) => {
  try {
    let usageFollower;
    switch (type) {
      case "campaign":
        usageFollower = await UsageFollower.findOneAndDelete(
          tempId
        );
        break;
      case "coupon":
        usageFollower = await UsageFollower.findOneAndDelete({
          couponId: tempId,
        });
        break;
      case "usageFollower":
        usageFollower = await UsageFollower.findByIdAndDelete(tempId);
        break;
      default:
        throw new Error("Invalid type provided");
    }
    return usageFollower;
  } catch (error) {
    console.error("Error happened in deleting follower", error);
    throw Error(error);
  }
};

module.exports = doDeleteFollower;
