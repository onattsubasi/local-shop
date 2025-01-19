const Shipment = require("../model/shipment");

exports.getShipments = async (req, res, next) => {
  try {
    const shipments = await Shipment.find();

    if (!shipments || shipments.length === 0) {
      return res.status(400).json({
        message: "Shipments cannot be found.",
        success: false,
      });
    }

    return res.status(200).json({
      shipments,
      success: true,
    });
  } catch (err) {
    res.status(400).json({
      message: err,
      success: false,
    });
  }
};
