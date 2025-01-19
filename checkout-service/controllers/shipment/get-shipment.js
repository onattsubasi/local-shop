const Shipment = require("../model/shipment");

exports.getShipment = async (req, res, next) => {
  let shipmentId = req.params.shipmentId;

    if (!shipmentId) {
      shipmentId = req.body.shipmentId;
    }
    try {
      const shipment = await Shipment.findById(shipmentId);
      if (!shipment) {
        return res.status(404).json("Shipment not Found.");
      }
      res.status(200).json(shipment);
    } catch (err) {
      res.status(500).json(err);
    }
};
