const Product = require('../models/product');

async function updateProductQuantity(productId, quantity){ // Adjusted the parameters
    try {
        const product = await Product.findByIdAndUpdate(productId, { $inc: { quantity: quantity } }, { new: true });

        if (!product) {
            throw new Error("Product not found");
        }

        return product;
    } catch (error) {
        throw new Error(`Error updating quantity for product ${productId}: ${error.message}`);
    }
}

module.exports = updateProductQuantity;
/*async function updateProductQuantity(productId, newQuantity) {
    try {
        const product = await Product.findById(productId);
        if (!product) {
            throw new Error(`Product with ID ${productId} not found`);
        }
        product.quantity = newQuantity;
        await product.save();
        return product;

    } catch (error) {
        console.error('Error updating product quantity:', error);
        throw error;
    }
}
module.exports=updateProductQuantity;*/
