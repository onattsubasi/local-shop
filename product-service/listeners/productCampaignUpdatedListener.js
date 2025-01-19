const Product = require("../models/product");
const { createConsumer } = require("../kafka");
const updateProductCampaign = require("../business/updateProductCampaign");
const productCampaignUpdatedListener = async () => {
  return new Promise(async (resolve, reject) => {
    let productCampaignUpdatedConsumer = null;
    try {
      productCampaignUpdatedConsumer = createConsumer(
        "campaignService-productCampaignUpdated"
      );
      await productCampaignUpdatedConsumer.connect();
      await productCampaignUpdatedConsumer.subscribe({
        topics: ["campaignService-productCampaignUpdated"],
        fromBeginning: true,
      });
      productCampaignUpdatedConsumer.run({
        eachMessage: async ({ topic, partition, message }) => {
          try {
            const parsedMessage = JSON.parse(message.value);
            await updateProductCampaign(
              parsedMessage
            );
            console.log("Product campaign updated");
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
module.exports = productCampaignUpdatedListener;
