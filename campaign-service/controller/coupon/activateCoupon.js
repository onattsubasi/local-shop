const doActivateCoupon = require("../../business/coupon/activateCoupon");
exports.activateCoupon = async (req, res, next) => {
  try {
    let couponCode = req.body.couponCode;
    let resMsg = await doActivateCoupon(couponCode);
    res.status(200).send(resMsg);
  } catch (error) {
    console.log(error);
    res.status(500).send("Error happened in coupon controller");
  }
};
