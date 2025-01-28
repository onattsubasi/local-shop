const Basket = require("../models/basket");
const { createConsumer } = require("../kafka");
const {addCampaignToBasket} = require("../business/index")
const basketCampaignCreatedListener = async () => {
  return new Promise(async (resolve, reject) => {
    let basketCampaignCreatedConsumer = null;
    try {
      basketCampaignCreatedConsumer = createConsumer(
        "campaignService-basketCampaignCreated"
      );
      await basketCampaignCreatedConsumer.connect();
      await basketCampaignCreatedConsumer.subscribe({
        topics: ["campaignService-basketCampaignCreated"],
        fromBeginning: true,
      });
      basketCampaignCreatedConsumer.run({
        eachMessage: async ({ topic, partition, message }) => {
          try {
            const parsedMessage = JSON.parse(message.value);
            await addCampaignToBasket(
              parsedMessage
            );
            console.log("new basket campaign created");
          } catch (error) {
            console.log(error);
          }
        },
      });
    } catch (error) {
      console.error("Error in basket Listener:", error);
      reject(new Error(error));
    }
  });
};
module.exports = basketCampaignCreatedListener;
