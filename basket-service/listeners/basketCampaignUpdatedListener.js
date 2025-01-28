const { createConsumer } = require("../kafka");
const {updateBasketCampaign} = require("../business/index")
const basketCampaignUpdatedListener = async () => {
  return new Promise(async (resolve, reject) => {
    let basketCampaignUpdatedConsumer = null;
    try {
      basketCampaignUpdatedConsumer = createConsumer(
        "campaignService-basketCampaignUpdated"
      );
      await basketCampaignUpdatedConsumer.connect();
      await basketCampaignUpdatedConsumer.subscribe({
        topics: ["campaignService-basketCampaignUpdated"],
        fromBeginning: true,
      });
      basketCampaignUpdatedConsumer.run({
        eachMessage: async ({ topic, partition, message }) => {
          try {
            const parsedMessage = JSON.parse(message.value);
            await updateBasketCampaign(
              parsedMessage
            );
            console.log("Basket campaign updated");
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
module.exports = basketCampaignUpdatedListener;
