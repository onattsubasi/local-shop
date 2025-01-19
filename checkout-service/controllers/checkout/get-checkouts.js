const Checkout = require("../model/checkout");

exports.getCheckouts = async (req, res, next) => {
  try {
    const checkouts = await Checkout.find();

    if (checkouts.length === 0) {
      return res.status(400).json({
        message: "No checkout is found.",
        success: false,
      });
    }

    return res.status(200).json({
      checkouts,
      success: true,
    });
  } catch (err) {
    res.status(400).json({
      message: err,
      success: false,
    });
  }
};
