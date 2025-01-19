const Product = require('../models/product');

const doCreateProduct=async(objProduct)=>{
    try{
    const product =new Product(objProduct);
    await product.save();
    return product;
    }
    catch(err){
        console.error('There is an error occured while creating the product',err)
    }
};

module.exports=doCreateProduct;