const changeQuantityProduct = require("../business/updateProductQuantity");
const { createConsumer } = require("../kafka");

const productQuantityDecreaseListener = () => {
  return new Promise(async (resolve, reject) => {
    let productQuantityConsumer = null;

    try {
      productQuantityConsumer = createConsumer("orderService-orderCreated");
      await productQuantityConsumer.connect();
      await productQuantityConsumer.subscribe({
        topics: ["orderService-orderCreated"],
        fromBeginning: true,
      });

      productQuantityConsumer.run({
        eachMessage: async ({ topic, partition, message }) => {
          try {
            const parsedMessage = JSON.parse(message.value);
            const products = parsedMessage.products;

            for (const product of products) {
              const { productId, quantity } = product;
              await changeQuantityProduct(productId, -quantity); // Decrease quantity
              console.log(
                `Quantity decreased for product ${productId} by ${quantity}`
              );
            }
          } catch (error) {
            console.error(error);
          }
        },
      });
    } catch (error) {
      console.error("Error in product quantity listener:", error);
      reject(new Error(error));
    }
  });
};

module.exports = productQuantityDecreaseListener;
