const axios = require("axios");
const doApplyCoupon = require("../business/applyCoupon");
exports.applyCoupon = async (req, res, next) => {
  try {
    let token = req.cookies.token;
    const couponCode = req.body.couponCode;
    const couponResponse = await axios.get(
      `http://localhost:8055/api/coupon/get-coupon/${couponCode}`,
      {
        headers: { cookie: `token=${token}` },
      }
    );
    const coupon = couponResponse.data;
    const user = req.user;
    if (coupon.isActive) {
      const resMsg = await doApplyCoupon(coupon, user, token);
      res.status(200).send(resMsg);
    } else {
      console.error("Coupon is not active!");
      res.status(401).send("Coupon is not active!");
    }
  } catch (error) {
    console.error("Error in applyCoupon:", error);
    res.status(500).send("Error happened, try again!");
  }
};
