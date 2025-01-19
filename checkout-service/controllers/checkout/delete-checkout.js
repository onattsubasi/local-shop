const doDeleteCheckout = require("../../business/checkout/deleteCheckout");

exports.deleteCheckout = async (req, res, next) => {
  try {
    const checkoutId = req.params.checkoutId;
    const checkout = await doDeleteCheckout(checkoutId);
    if (!checkout) {
      return res.status(400).json({
        message: "No checkout is found.",
        success: false,
      });
    }
    return res.status(200).json({
      message: "Checkout is deleted.",
      success: true,
    });
  } catch (err) {
    res.status(400).json({
      message: err,
      success: false,
    });
  }
};
