const changeQuantityProduct = require("../business/updateProductQuantity");
const { createConsumer } = require("../kafka");
const Product=require("../models/product");

const productsRefundedIncreaseQuantityListener = () => {
  return new Promise(async (resolve, reject) => {
    let productsRefundedIncreaseQuantityConsumer = null;

    try {
      productsRefundedIncreaseQuantityConsumer = createConsumer("orderService-productsRefundedIncreaseQuantity");
      await productsRefundedIncreaseQuantityConsumer.connect();
      await productsRefundedIncreaseQuantityConsumer.subscribe({
        topics: ["orderService-productsRefundedIncreaseQuantity"],
        fromBeginning: true,
      });

      productsRefundedIncreaseQuantityConsumer.run({
        eachMessage: async ({ topic, partition, message }) => {
          try {
            const parsedMessage = JSON.parse(message.value);
            const products = parsedMessage.products;

            for(const product of products) {
              const { productId, quantity } = product;
              await changeQuantityProduct(productId, quantity); 
              console.log(
                `Quantity increased for product ${productId} by ${quantity}`
              );
              
              const existingProduct = await Product.findById(productId);

              if (existingProduct) {
                existingProduct.isRefunded = true;
                existingProduct.refundedQuantity+=quantity;
                await existingProduct.save();
                console.log(`product ${productId} is refunded`)
              }
            }
          } catch (error) {
            console.error(error);
          }
        },
      });
    } catch (error) {
      console.error("Error in product quantity listener:", error);
      reject(error);
    }
  });
};

module.exports = productsRefundedIncreaseQuantityListener;
