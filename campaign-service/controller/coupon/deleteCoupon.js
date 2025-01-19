const doDeleteCoupon = require("../../business/coupon/deleteCoupon");
const { sendMessageToKafka } = require("../../kafka");
exports.deleteCoupon = async (req, res, next) => {
  try {
    let couponCode = req.body.couponCode;
    let resMsg = await doDeleteCoupon(couponCode);
    await sendMessageToKafka("couponService-couponDeleted",resMsg)
    res.status(200).send(resMsg);
  } catch (error) {
    console.log(error);
    res.status(500).send("Error happened in coupon controller");
  }
};
