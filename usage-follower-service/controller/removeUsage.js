const doRemoveUsage = require("../business/removeUsage");
exports.removeUsage = async (req, res, next) => {
  try {
    const userId = req.body.userId;
    const campaignId = req.body.campaignId;
    const couponId = req.body.couponId;
    const requestedUsage = req.body.usageAmount;
    const resMsg = await doRemoveUsage(
      userId,
      requestedUsage,
      campaignId,
      couponId
    );
    res.json(resMsg);
  } catch (error) {
    console.error("Error happened in removeUsage controller: ", error);
    res.status(500).send(error);
  }
};
