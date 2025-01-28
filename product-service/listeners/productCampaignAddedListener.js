const Product = require("../models/product");
const { createConsumer } = require("../kafka");
const addCampaignToProduct = require("../business/addCampaignToProduct");
const productCampaignAddedListener = async () => {
  return new Promise(async (resolve, reject) => {
    let productCampaignAddedConsumer = null;
    try {
      productCampaignAddedConsumer = createConsumer(
        "campaignService-campaignAddedToProduct"
      );
      await productCampaignAddedConsumer.connect();
      await productCampaignAddedConsumer.subscribe({
        topics: ["campaignService-campaignAddedToProduct"],
        fromBeginning: true,
      });
      productCampaignAddedConsumer.run({
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
module.exports = productCampaignAddedListener;
