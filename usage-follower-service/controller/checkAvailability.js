const doCheckAvailability = require("../business/checkAvailability");
exports.checkAvailability = async (req, res, next) => {
  try {
    const userId = req.body.userId;
    const campaignId = req.body.campaignId;
    const couponId = req.body.couponId;
    const requestedUsage = req.body.usageAmount;
    const resMsg = await doCheckAvailability(
      userId,
      requestedUsage,
      campaignId,
      couponId
    );
    res.json(resMsg);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
};
