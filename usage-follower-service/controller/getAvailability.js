const doGetAvailability = require("../business/getAvailability");
exports.getAvailability = async (req, res, next) => {
  try {
    const userId = req.body.userId;
    const couponId = req.body.couponId;
    const campaignId = req.body.couponId;
    const resMsg = doGetAvailability(userId, couponId, campaignId);
    res.status(200).send(resMsg);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
};
