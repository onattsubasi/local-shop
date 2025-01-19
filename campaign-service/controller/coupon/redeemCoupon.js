const doRedeemCoupon = require("../../business/coupon/redeemCoupon");
const { sendMessageToKafka } = require("../../kafka");

exports.redeemCoupon = async (req, res, next) => {
  try {
    const userId = req.user.userId;
    let couponCode = req.body.couponCode;

    couponCode = couponCode.toUpperCase().trim();

    if (couponCode.length < 7) {
      return res.status(400).json({ error: "Coupon code must be at least 7 characters long" });
    }

    const turkishToEnglish = {
      Ç: "C",
      Ğ: "G",
      İ: "I",
      Ö: "O",
      Ş: "S",
      Ü: "U",
      ç: "c",
      ğ: "g",
      ı: "i",
      ö: "o",
      ş: "s",
      ü: "u",
    };
    couponCode = couponCode.replace(
      /[ÇĞİÖŞÜçğıöşü]/g,
      (char) => turkishToEnglish[char] || char
    );

    const resMsg = await doRedeemCoupon(couponCode);
    await sendMessageToKafka("couponService-couponRedeemed", {
      resMsg,
      userId,
    });
    res
      .status(200)
      .json({ message: "Coupon redeemed successfully", data: resMsg });
  } catch (error) {
    console.error("Error in coupon redemption:", error);
    res
      .status(500)
      .json({ error: "An error occurred while redeeming the coupon" });
  }
};
