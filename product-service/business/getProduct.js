const Product = require('../models/product');

const doGetProduct = async(productId)=>{
    try{
    const product = Product.findById(productId);
    return product;
    }
    catch(err){
    console.error('There is an error occured while getting the product',err);
    }
};

module.exports=doGetProduct;