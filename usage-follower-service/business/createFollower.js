const UsageFollower = require("../models/usageFollower");
const doCreateFollower = async (tempObj) => {
  try {
    let usageFollower = new UsageFollower(tempObj);
    await usageFollower.save();
    return usageFollower;
  } catch (error) {
    console.error("Error happened in creating follower", error);
    throw Error(error);
  }
};
module.exports = doCreateFollower;
