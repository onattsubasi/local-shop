const Basket = require('../models/basket');

const doDeleteBasket=async(basketId)=>{
    try{
    const basket=await Basket.findByIdAndDelete(basketId);
    return basket;
    }
    catch(error){
    console.error('There is an error occurred while deleting the basket',error);
    }
};

module.exports=doDeleteBasket;