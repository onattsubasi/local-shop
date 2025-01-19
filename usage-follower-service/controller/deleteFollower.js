const doDeleteFollower = require("../business/deleteFollower");
exports.deleteFollower = async (req, res, next) => {
  try {
    const usageFollowerId = req.params.usageFollowerId
    const resMsg = await doDeleteFollower(usageFollowerId,"usageFollower");
    res.status(200).send(resMsg);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};
