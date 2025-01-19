const doDeactivateCoupon = require("../../business/coupon/deactivateCoupon");
exports.deactivateCoupon = async (req, res, next) => {
  try {
    let couponCode = req.body.couponCode;
    let resMsg = await doDeactivateCoupon(couponCode);
    res.status(200).send(resMsg);
  } catch (error) {
    console.log(error);
    res.status(500).send("Error happened in coupon controller");
  }
};
