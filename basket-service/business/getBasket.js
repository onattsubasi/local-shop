const Basket = require('../models/basket');

const doGetBasket = async(basketId)=>{
    try{
    const basket = Basket.findById(basketId);
    return basket;
    }
    catch(error){
    console.error('There is an error occurred while getting the basket',error);
    }
};

module.exports=doGetBasket;