const Payment = require('../model/Payment');

exports.deletePayment = async(req,res,next)=>{
    try{
    const paymentId = req.params.paymentId;
    const payment =await Payment.findByIdAndDelete(paymentId);

    if(!payment){
       return res.status(404).json('Cannot find Payment for provided ID.')
    }

    res.status(200).json(payment)
    }
    catch(err){
    res.status(500).json(err)
    }
};