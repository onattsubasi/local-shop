const Checkout = require('../../model/checkout');

const doCreateCheckout=async(objCheckout)=>{
    try{
    const checkout =new Checkout(objCheckout);
    await checkout.save();
    return checkout;
    }
    catch(err){
        console.error('There is an error occured while creating the checkout',err)
    }
};

module.exports=doCreateCheckout;