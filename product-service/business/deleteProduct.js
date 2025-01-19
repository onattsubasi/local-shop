const Product = require('../models/product');

const doDeleteProduct=async(productId)=>{
    try{
    const product=Product.findByIdAndDelete(productId);
    return product;
    }
    catch(err){
    console.error('There is an error occured while deleting the product',err);
    }
};

module.exports=doDeleteProduct;