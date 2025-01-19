const doUpdateCoupon = require("../../business/coupon/updateCoupon");
const { sendMessageToKafka } = require("../../kafka");
exports.updateCoupon = async (req, res, next) => {
  try {
    const couponCode = req.body.couponCode;
    let couponObj = {};
    couponObj = req.body;
    let resMsg = await doUpdateCoupon(couponCode, couponObj);
    await sendMessageToKafka("couponService-couponUpdated",resMsg)
    res.status(200).send(resMsg);
  } catch (error) {
    console.log(error);
    res.status(500).send("Error happened in coupon controller");
  }
};
