const { createConsumer } = require("../kafka");
const basketProductDeletedListener = async () => {
  return new Promise(async (resolve, reject) => {
    let basketProductDeletedConsumer = null;
    try {
      basketProductDeletedConsumer = createConsumer(
        "productService-productDeleted"
      );
      await basketProductDeletedConsumer.connect();
      await basketProductDeletedConsumer.subscribe({
        topics: ["productService-productDeleted"],
        fromBeginning: true,
      });
      basketProductDeletedConsumer.run({
        eachMessage: async ({ topic, partition, message }) => {
          try {
            const parsedMessage = JSON.parse(message.value);
            const updatedProduct = parsedMessage.product;
            await updateBasketProduct(updatedProduct);
            console.log("products updated");
          } catch (error) {
            console.log(error);
          }
        },
      });
    } catch (error) {
      console.error("Error in basket Listener:", error);
      reject(error);
    }
  });
};
module.exports = basketProductDeletedListener;
