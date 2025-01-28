const { createConsumer } = require("../kafka");
const { addCampaignToBasket } = require("../business/index");
const basketCampaignAddedListener = async () => {
  return new Promise(async (resolve, reject) => {
    let basketCampaignAddedConsumer = null;
    try {
      basketCampaignAddedConsumer = createConsumer(
        "campaignService-campaignAddedToBasket"
      );
      await basketCampaignAddedConsumer.connect();
      await basketCampaignAddedConsumer.subscribe({
        topics: ["campaignService-campaignAddedToBasket"],
        fromBeginning: true,
      });
      basketCampaignAddedConsumer.run({
        eachMessage: async ({ topic, partition, message }) => {
          try {
            const parsedMessage = JSON.parse(message.value);
            await addCampaignToBasket(parsedMessage);
            console.log("campaign added to basket");
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

module.exports = basketCampaignAddedListener;
