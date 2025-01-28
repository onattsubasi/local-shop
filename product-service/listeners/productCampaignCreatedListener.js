const Product = require("../models/product");
const { createConsumer } = require("../kafka");
const addCampaignToProduct = require("../business/addCampaignToProduct");
const productCampaignCreatedListener = async () => {
  return new Promise(async (resolve, reject) => {
    let productCampaignCreatedConsumer = null;
    try {
      productCampaignCreatedConsumer = createConsumer(
        "campaignService-productCampaignCreated"
      );
      await productCampaignCreatedConsumer.connect();
      await productCampaignCreatedConsumer.subscribe({
        topics: ["campaignService-productCampaignCreated"],
        fromBeginning: true,
      });
      productCampaignCreatedConsumer.run({
        eachMessage: async ({ topic, partition, message }) => {
          try {
            const parsedMessage = JSON.parse(message.value);
            await addCampaignToProduct(parsedMessage);
            console.log("campaign added to products");
          } catch (error) {
            console.log(error);
          }
        },
      });
    } catch (error) {
      console.error("Error in product Listener:", error);
      reject(new Error(error));
    }
  });
};
module.exports = productCampaignCreatedListener;
