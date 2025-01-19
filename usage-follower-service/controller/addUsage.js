const doAddUsage = require("../business/addUsage");
exports.addUsage = async (req, res, next) => {
  try {
    const userId = req.body.userId;
    const campaignIds = req.body.campaignId;
    const couponId = req.body.couponId;
    const requestedUsage = req.body.usageAmount;
    const resMsg = await doAddUsage(
      userId,
      campaignIds,
      couponId,
      requestedUsage
    );
    res.json(resMsg);
  } catch (error) {
    console.error("Error happened in addUsage controller: ", error);
    res.status(500).send(error);
  }
};
