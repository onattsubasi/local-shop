const Checkout = require('../../model/checkout');

const doUpdateCheckout=async(checkoutId,checkoutObj)=>{
    try{
    const checkout =await Checkout.findByIdAndUpdate(checkoutId,checkoutObj,{ new: true }).lean();
    return checkout;
    }
    catch(err){
        console.error('There is an error occured while updating the checkout',err)
    }
};

module.exports=doUpdateCheckout;