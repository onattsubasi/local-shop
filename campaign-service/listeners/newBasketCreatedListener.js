const Campaign = require("../models/campaign");
const { createConsumer } = require("../kafka");
const sendCampaignToNewBasket = require("../business/campaign/sendCampaignToNewBasket");
const newBasketCreatedListener = async () => {
  return new Promise(async (resolve, reject) => {
    let newBasketCreatedConsumer = null;
    try {
      newBasketCreatedConsumer = createConsumer(
        "basketService-basketCreated"
      );
      await newBasketCreatedConsumer.connect();
      await newBasketCreatedConsumer.subscribe({
        topics: ["basketService-basketCreated"],
        fromBeginning: true,
      });
      newBasketCreatedConsumer.run({
        eachMessage: async ({ topic, partition, message }) => {
          try {
            const parsedMessage = JSON.parse(message.value);
            console.log(parsedMessage);
            const basketId = parsedMessage.product;
            await sendCampaignToNewBasket(basketId);
            console.log(`campaign send to basket with id : ${basketId}`);
          } catch (error) {
            console.log(error);
          }
        },
      });
    } catch (error) {
      console.error("Error happened on basket created listener:", error);
      reject(error);
    }
  });
};

module.exports = newBasketCreatedListener;
