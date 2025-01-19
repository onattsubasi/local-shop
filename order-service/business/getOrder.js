const Order = require('../models/order');

const doGetOrder = async(orderId)=>{
    try{
    const order = Order.findById(orderId);
    return order;
    }
    catch(err){
    console.error('There is an error occured while getting the order',err);
    }
};

module.exports=doGetOrder;