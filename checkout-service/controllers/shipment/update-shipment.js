const Shipment = require("../model/shipment");

exports.updateShipment = async (req, res, next) => {
  try {
    const shipment = await Shipment.findByIdAndUpdate(
      req.params.shipmentId,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!shipment) {
      return res.status(400).json({
        message: "Shipment could not be found.",
        success: false,
      });
    }

    return res.status(200).json({
      shipment,
      success: true,
    });
  } catch (err) {
    res.status(400).json({
      message: err,
      success: false,
    });
  }
};
