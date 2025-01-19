const  doDeleteShipment  = require('../../business/shipment/deleteShipment');

exports.deleteShipment = async (req, res, next) => {
  try {
    const shipmentId=req.params.shipmentId;
    const shipment = await doDeleteShipment(shipmentId);
    if (!shipment) {
      return res.status(400).json({
        message: "Shipment could not be found with this id.",
        success: false,
      });
    }
    return res.status(200).json({
      message: "Shipment is deleted.",
      success: true,
    });
  } catch (err) {
    res.status(400).json({
      message: err,
      success: false,
    });
  }
};
