const mongoose = require("mongoose");
const doCreateCheckout = require('../../business/checkout/createCheckout');
const Axios = require("axios");
const Shipment = require("../model/shipment");

exports.createCheckout = async (req, res, next) => {
  try {
    const checkObj = {};
    
    const basketId = req.params.basketId;
    const basketResponse = await Axios.get(`http://localhost:8000/api/getBasket/${basketId}`);
    const gainedBasket = basketResponse.data;
    
    if (!gainedBasket) {
      throw new Error(`Basket with ID ${basketId} does not exist`);
    }
    if(gainedBasket.products.length==0||null)
      {
        throw new Error(`Basket with ID ${basketId} is empty`);
      }

    const shipmentId = req.body.shipmentId;

    if (!mongoose.Types.ObjectId.isValid(shipmentId)) {
      res.status(400).send(`Invalid shipment ID: ${shipmentId}`);
      return;
    }

    const gainedShipment = await Shipment.findById(shipmentId);
    
    if (!gainedShipment) {
      res.status(400).send(`Shipment with ID ${shipmentId} does not exist`);
      return;
    }

    checkObj.basketId = basketId;
    checkObj.userId = req.user.userId;
    checkObj.address = req.body.address;
    checkObj.isGift = req.body.isGift;
    checkObj.shipmentId = req.body.shipmentId;
    checkObj.address = req.body.address;
    checkObj.totalPrice = gainedBasket.totalPrice;
    checkObj.status = req.body.status;
    checkObj.products=gainedBasket.products;
    checkObj.isActive=true;
    

    const checkout = await doCreateCheckout(checkObj);
    res.status(200).send(checkout);
  } catch (err) {
    console.error('Error fetching basket:', err.message);
    res.status(err.response ? err.response.status : 500).json({ error: err.message });
  }
};
