const doGetCoupon = require("../../business/coupon/getCoupon");

exports.getCoupon = async (req, res, next) => {
  try {
    let couponCode = req.params.couponCode;
    couponCode = couponCode.toUpperCase().trim();

    if (couponCode.length < 7) {
      return res
        .status(400)
        .json({ error: "Coupon code must be at least 7 characters long" });
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

    let resMsg = await doGetCoupon(couponCode);
    res.status(200).send(resMsg);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};
