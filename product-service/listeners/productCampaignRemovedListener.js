const Product = require("../models/product");
const { createConsumer } = require("../kafka");
const removeCampaignFromProduct = require("../business/removeCampaignFromProduct")
const productCampaignRemovedListener = async () => {
  return new Promise(async (resolve, reject) => {
    let productCampaignRemovedConsumer = null;
    try {
      productCampaignRemovedConsumer = createConsumer(
        "campaignService-campaignRemovedFromProduct"
      );
      await productCampaignRemovedConsumer.connect();
      await productCampaignRemovedConsumer.subscribe({
        topics: ["campaignService-campaignRemovedFromProduct"],
        fromBeginning: true,
      });
      productCampaignRemovedConsumer.run({
        eachMessage: async ({ topic, partition, message }) => {
          try {
            const parsedMessage = JSON.parse(message.value);
            await removeCampaignFromProduct(
              parsedMessage
            );
            console.log("campaign removed from products");
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
module.exports = productCampaignRemovedListener;
