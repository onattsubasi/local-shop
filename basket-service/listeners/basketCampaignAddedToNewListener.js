const { createConsumer } = require("../kafka");
const { addCampaignToBasket } = require("../business/index");
const basketCampaignAddedToNewListener = async () => {
  return new Promise(async (resolve, reject) => {
    let basketCampaignAddedToNewConsumer = null;
    try {
      basketCampaignAddedToNewConsumer = createConsumer(
        "campaignService-campaignAddedToNewBasket"
      );
      await basketCampaignAddedToNewConsumer.connect();
      await basketCampaignAddedToNewConsumer.subscribe({
        topics: ["campaignService-campaignAddedToNewBasket"],
        fromBeginning: true,
      });
      basketCampaignAddedToNewConsumer.run({
        eachMessage: async ({ topic, partition, message }) => {
          try {
            const parsedMessage = JSON.parse(message.value);
            const campaigns = parsedMessage.campaigns;
            const basketId = parsedMessage.basketId;
            await addCampaignToBasket(campaigns, basketId);
            console.log("campaign added to the new basket");
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

module.exports = basketCampaignAddedToNewListener;
