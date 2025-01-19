const Shipment = require('../../model/shipment');

const doCreateShipment=async(objShipment)=>{
    try{
    const shipment =new Shipment(objShipment);
    await shipment.save();
    console.log(shipment);
    return shipment;
    }
    catch(err){
        console.error('There is an error occured while creating the shipment',err)
    }
};

module.exports=doCreateShipment;