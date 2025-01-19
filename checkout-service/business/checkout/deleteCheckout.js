const Checkout = require('../../model/checkout');

const doDeleteCheckout=async(checkoutId)=>{
    try{
    const checkout=Checkout.findByIdAndDelete(checkoutId)
    return checkout;
    }
    catch(err){
    console.error('There is an error occured while deleting the checkout',err);
    }
};

module.exports=doDeleteCheckout;