const clearBasket=require('../business/clearBasket');
const { createConsumer } = require("../kafka");

const basketClearListener = () => {
  return new Promise(async (resolve, reject) => {
    let basketClearConsumer = null;

    try {
      basketClearConsumer = createConsumer("orderService-basketClear");
      await basketClearConsumer.connect();
      await basketClearConsumer.subscribe({
        topics: ["orderService-basketClear"],
        fromBeginning: true,
      });

      basketClearConsumer.run({
        eachMessage: async ({ topic, partition, message }) => {
          try {
            const parsedMessage = JSON.parse(message.value);
            const basketId = parsedMessage.basketId;
            const setUsage = parsedMessage.setUsage
            await clearBasket(basketId,setUsage);
            console.log(
              `basket cleared ${basketId}`
            );
          } catch (error) {
            console.error(error);
          }
        },
      });
    } catch (error) {
      console.error("Error in basket listener:", error);
      reject(error);
    }
  });
};

module.exports = basketClearListener;
