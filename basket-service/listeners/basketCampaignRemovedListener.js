const { createConsumer } = require("../kafka");
const {removeCampaignFromBasket} = require("../business/index")
const basketCampaignRemovedListener = async () => {
  return new Promise(async (resolve, reject) => {
    let basketCampaignRemovedConsumer = null;
    try {
      basketCampaignRemovedConsumer = createConsumer(
        "campaignService-campaignRemovedFromBasket"
      );
      await basketCampaignRemovedConsumer.connect();
      await basketCampaignRemovedConsumer.subscribe({
        topics: ["campaignService-campaignRemovedFromBasket"],
        fromBeginning: true,
      });
      basketCampaignRemovedConsumer.run({
        eachMessage: async ({ topic, partition, message }) => {
          try {
            const parsedMessage = JSON.parse(message.value);
            const campaign = parsedMessage.campaign
            await removeCampaignFromBasket(
              campaign
            );
            console.log("campaign removed from basket");
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
module.exports = basketCampaignRemovedListener;
