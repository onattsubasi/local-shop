const Card = require('../model/CreditCard')

exports.deleteCreditCard = async(req,res,next)=>{
    try{
    const cardId = req.params.cardId;
    const card=await Card.findByIdAndDelete(cardId);

    if(!card){
       return res.status(404).json('Cannot find Card for provided ID.')
    }

    res.status(200).json(card)
    }
    catch(err){
    res.status(500).json(err)
    }
};