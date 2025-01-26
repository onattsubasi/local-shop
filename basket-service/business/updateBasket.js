const Basket = require('../models/basket');
const Axios = require("axios");

const doUpdateBasket = async (basketId, basketObj) => {
    try {
        const existingBasket = await Basket.findById(basketId);
        if (!existingBasket) {
            throw new Error('basket not found');
        }
    
        let basketPrice = 0;
        for (const product of basketObj.products) {
            const productId = product.productId;
            const productResponse = await Axios.get(`http://localhost:${process.env.PRODUCT_SERVICE_PORT}/api/product/getProduct/${productId}`);
            const foundProduct = productResponse.data;
            if (!foundProduct) {
                throw new Error(`Product with ID ${productId} not found`);
            }

            const price = foundProduct.price;
            product.price = price;
            basketPrice += price * product.quantity;
    
            
            const productInBasket = existingBasket.products.find(prod => prod.productId.toString() === productId);
            if (productInBasket) {
                const quantityDifference = product.quantity - productInBasket.quantity;
                foundProduct.quantity -= quantityDifference; 
                foundProduct.quantity -= product.quantity; 
            }
            basketObj.products = basketObj.products.filter(product => product.quantity > 0);
        }
    
        basketObj.totalPrice = basketPrice;
    
        const basket = await Basket.findByIdAndUpdate(basketId, basketObj, { new: true });
        return basket;
    } catch (error) {
        console.error('Error updating basket:', error);
        throw error;
    }
   
}

module.exports=doUpdateBasket;
