const { createConsumer } = require("../kafka");
const { updateBasketCampaign } = require("../business/index");
const basketCampaignProductsRemovedListener = async () => {
  return new Promise(async (resolve, reject) => {
    let basketCampaignProductsRemovedConsumer = null;
    try {
      basketCampaignProductsRemovedConsumer = createConsumer(
        "campaignService-campaignProductsRemovedFromBasket"
      );
      await basketCampaignProductsRemovedConsumer.connect();
      await basketCampaignProductsRemovedConsumer.subscribe({
        topics: ["campaignService-campaignProductsRemovedFromBasket"],
        fromBeginning: true,
      });
      basketCampaignProductsRemovedConsumer.run({
        eachMessage: async ({ topic, partition, message }) => {
          try {
            const parsedMessage = JSON.parse(message.value);
            console.log(parsedMessage)
            await updateBasketCampaign(parsedMessage);
            console.log("campaign removed from basket");
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
module.exports = basketCampaignProductsRemovedListener;
