const { createConsumer } = require("../kafka");
const {updateBasketCampaign} = require("../business/index")
const basketCampaignDeactivatedListener = async () => {
  return new Promise(async (resolve, reject) => {
    let basketCampaignDeactivatedConsumer = null;
    try {
      basketCampaignDeactivatedConsumer = createConsumer(
        "campaignService-basketCampaignDeactivated"
      );
      await basketCampaignDeactivatedConsumer.connect();
      await basketCampaignDeactivatedConsumer.subscribe({
        topics: ["campaignService-basketCampaignDeactivated"],
        fromBeginning: true,
      });
      basketCampaignDeactivatedConsumer.run({
        eachMessage: async ({ topic, partition, message }) => {
          try {
            const parsedMessage = JSON.parse(message.value);
            await updateBasketCampaign(
              parsedMessage
            );
            console.log("Basket campaign deactivated");
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
module.exports = basketCampaignDeactivatedListener;
