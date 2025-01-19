const Checkout = require("../model/checkout");

exports.updateCheckout = async (req, res, next) => {
  try {
    const checkout = await Checkout.findByIdAndUpdate(
      req.params.checkoutId,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!checkout) {
      return res.status(400).json({
        message: "checkout could not be found.",
        success: false,
      });
    }

    return res.status(200).json({
      checkout,
      success: true,
    });
  } catch (err) {
    res.status(400).json({
      message: err,
      success: false,
    });
  }
};
