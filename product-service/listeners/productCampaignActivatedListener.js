const Product = require("../models/product");
const { createConsumer } = require("../kafka");
const updateProductCampaign = require("../business/addCampaignToProduct");
const productCampaignActivatedListener = async () => {
  return new Promise(async (resolve, reject) => {
    let productCampaignActivatedConsumer = null;
    try {
      productCampaignActivatedConsumer = createConsumer(
        "campaignService-productCampaignActivated"
      );
      await productCampaignActivatedConsumer.connect();
      await productCampaignActivatedConsumer.subscribe({
        topics: ["campaignService-productCampaignActivated"],
        fromBeginning: true,
      });
      productCampaignActivatedConsumer.run({
        eachMessage: async ({ topic, partition, message }) => {
          try {
            const parsedMessage = JSON.parse(message.value);
            console.log(parsedMessage)
            await updateProductCampaign(
              parsedMessage
            );
            console.log("Product campaign activated!");
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
module.exports = productCampaignActivatedListener;
