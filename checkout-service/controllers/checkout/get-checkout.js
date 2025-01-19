const Checkout = require("../model/checkout");

exports.getCheckout = async (req, res, next) => {
  let checkoutId = req.params.checkoutId;

  if (!checkoutId) {
    checkoutId = req.body.checkoutId;
  }
  try {
    const checkout = await Checkout.findById(checkoutId);
    if (!checkout) {
      return res.status(404).json("Checkout not Found.");
    }
    res.status(200).json(checkout);
  } catch (err) {
    res.status(500).json(err);
  }
};
