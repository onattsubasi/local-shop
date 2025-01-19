const Product = require("../models/product");
const { createConsumer } = require("../kafka");
const removeCampaignFromProduct = require("../business/removeCampaignFromProduct");
const productCampaignDeletedListener = async () => {
  return new Promise(async (resolve, reject) => {
    let productCampaignDeletedConsumer = null;
    try {
      productCampaignDeletedConsumer = createConsumer(
        "campaignService-productCampaignDeleted"
      );
      await productCampaignDeletedConsumer.connect();
      await productCampaignDeletedConsumer.subscribe({
        topics: ["campaignService-productCampaignDeleted"],
        fromBeginning: true,
      });
      productCampaignDeletedConsumer.run({
        eachMessage: async ({ topic, partition, message }) => {
          try {
            const parsedMessage = JSON.parse(message.value);
            await removeCampaignFromProduct(
              parsedMessage
            );
            console.log("campaign deleted from products");
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
module.exports = productCampaignDeletedListener;
