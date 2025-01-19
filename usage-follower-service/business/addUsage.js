//TODO: add- rmeove usage => checkoutta ya da orderda sayıları artıp azalacak!
const UsageFollower = require("../models/usageFollower");

const doAddUsage = async (userId, campaignIds, couponId, requestedUsage) => {
  try {
    for (let campaign of campaignIds) {
      let usageFollower = await UsageFollower.findOne();
    }
  } catch (error) {}
};
module.exports = doAddUsage;
