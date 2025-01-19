const doCreateCoupon = require("../../business/coupon/createCoupon");
const { sendMessageToKafka } = require("../../kafka");
exports.createCoupon = async (req, res, next) => {
  try {
    let tempCoupon = req.body;
    let tempCode = tempCoupon.couponCode
    tempCode = tempCode.toUpperCase().trim();
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
    tempCode = tempCode.replace(
      /[ÇĞİÖŞÜçğıöşü]/g,
      (char) => turkishToEnglish[char] || char
    );
    tempCoupon.couponCode = tempCode
    tempCoupon.productIdList = req.body.productIdList ?? [];
    let resMsg = await doCreateCoupon(tempCoupon);
    await sendMessageToKafka("couponService-couponCreated", resMsg);
    console.log("coupon created!")
    res.status(200).send(resMsg);
  } catch (error) {
    console.log(error);
    res.status(500).send("Error happened in coupon controller");
  }
};
