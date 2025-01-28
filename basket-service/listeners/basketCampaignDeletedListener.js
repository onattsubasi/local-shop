const { createConsumer } = require("../kafka");
const {removeCampaignFromBasket} = require("../business/index")
const basketCampaignDeletedListener = async () => {
  return new Promise(async (resolve, reject) => {
    let basketCampaignDeletedConsumer = null;
    try {
      basketCampaignDeletedConsumer = createConsumer(
        "campaignService-basketCampaignDeleted"
      );
      await basketCampaignDeletedConsumer.connect();
      await basketCampaignDeletedConsumer.subscribe({
        topics: ["campaignService-basketCampaignDeleted"],
        fromBeginning: true,
      });
      basketCampaignDeletedConsumer.run({
        eachMessage: async ({ topic, partition, message }) => {
          try {
            const parsedMessage = JSON.parse(message.value);
            await removeCampaignFromBasket(
              parsedMessage
            );
            console.log("campaign deleted from basket");
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
module.exports = basketCampaignDeletedListener;
