const Shipment = require('../../model/shipment');

const doDeleteShipment=async(shipmentId)=>{
    try{
    const shipment=Shipment.findByIdAndDelete(shipmentId)
    return shipment;
    }
    catch(err){
    console.error('There is an error occured while deleting the shipment',err);
    }
};

module.exports=doDeleteShipment;