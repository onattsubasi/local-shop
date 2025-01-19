const Product = require("../models/product");
const { createConsumer } = require("../kafka");
const updateProductCampaign = require("../business/addCampaignToProduct");
const productCampaignDeactivatedListener = async () => {
  return new Promise(async (resolve, reject) => {
    let productCampaignDeactivatedConsumer = null;
    try {
      productCampaignDeactivatedConsumer = createConsumer(
        "campaignService-productCampaignDeactivated"
      );
      await productCampaignDeactivatedConsumer.connect();
      await productCampaignDeactivatedConsumer.subscribe({
        topics: ["campaignService-productCampaignDeactivated"],
        fromBeginning: true,
      });
      productCampaignDeactivatedConsumer.run({
        eachMessage: async ({ topic, partition, message }) => {
          try {
            const parsedMessage = JSON.parse(message.value);
            console.log(parsedMessage)
            await updateProductCampaign(
              parsedMessage
            );
            console.log("Product campaign deactivated!");
          } catch (error) {
            console.log(error);
          }
        },
      });
    } catch (error) {
      console.error("Error in product Listener:", error);
      reject(error);
    }
  });
};
module.exports = productCampaignDeactivatedListener;
