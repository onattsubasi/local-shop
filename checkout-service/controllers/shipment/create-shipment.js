const doCreateShipment = require("../../business/shipment/createShipment");

exports.createShipment = async (req, res, next) => {
  try {
    const shipmentObj = {};
    shipmentObj.name = req.body.name;
    shipmentObj.price = req.body.price;

    const shipment = await doCreateShipment(shipmentObj);
    if (!shipment) {
      return res.status(400).json({
        message: "Shipment is not created.",
        success: false,
      });
    }
    return res.status(201).json({
      message: "Shipment is created.",
      success: true,
    });
  } catch (err) {
    res.status(400).json({
      message: err,
      success: false,
    });
  }
};
