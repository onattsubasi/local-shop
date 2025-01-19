const changeQuantityProduct = require("../business/updateProductQuantity");
const { createConsumer } = require("../kafka");
const Product=require("../models/product");

const productRefundedIncreaseQuantityListener = () => {
  return new Promise(async (resolve, reject) => {
    let productRefundedIncreaseQuantityConsumer = null;

    try {
      productRefundedIncreaseQuantityConsumer = createConsumer("orderService-productRefundedIncreaseQuantity");
      await productRefundedIncreaseQuantityConsumer.connect();
      await productRefundedIncreaseQuantityConsumer.subscribe({
        topics: ["orderService-productRefundedIncreaseQuantity"],
        fromBeginning: true,
      });

      productRefundedIncreaseQuantityConsumer.run({
        eachMessage: async ({ topic, partition, message }) => {
          try {
            const parsedMessage = JSON.parse(message.value);
            const productId = parsedMessage.productId;
            const existingProduct = await Product.findById(productId);

              if (existingProduct) {
                existingProduct.isRefunded = true;
                existingProduct.refundedQuantity+=parsedMessage.refundedQuantity;
                await existingProduct.save();
                console.log(`product ${productId} is refunded`)
              }
            const refundedQuantity=parsedMessage.refundedQuantity;
              await changeQuantityProduct(productId, refundedQuantity); 
              console.log(
                `Quantity increased for product ${productId} by ${refundedQuantity}`
              );
          
            
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

module.exports = productRefundedIncreaseQuantityListener;
