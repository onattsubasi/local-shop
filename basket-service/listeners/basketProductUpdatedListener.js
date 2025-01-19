const { createConsumer } = require("../kafka");
const {updateBasketProduct} = require("../business/index")
const basketProductUpdatedListener = async () => {
  return new Promise(async (resolve, reject) => {
    let basketProductUpdatedConsumer = null;
    try {
      basketProductUpdatedConsumer = createConsumer(
        "productService-productUpdated"
      );
      await basketProductUpdatedConsumer.connect();
      await basketProductUpdatedConsumer.subscribe({
        topics: ["productService-productUpdated"],
        fromBeginning: true,
      });
      basketProductUpdatedConsumer.run({
        eachMessage: async ({ topic, partition, message }) => {
          try {
            const parsedMessage = JSON.parse(message.value);
            let updatedProduct = parsedMessage.product;
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

module.exports = basketProductUpdatedListener;
