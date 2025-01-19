const doRemoveCoupon = require("../business/removeCoupon");
exports.removeCoupon = async (req, res, next) => {
  try {
    const user = req.user;
    const resMsg = await doRemoveCoupon(user);
    res.status(200).send(resMsg);
  } catch (error) {
    console.error("Error in removeCoupon:", error);
    res.status(500).send("Error happened, try again!");
  }
};
