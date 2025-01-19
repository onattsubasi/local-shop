const { createConsumer, sendMessageToKafka } = require("../kafka");
const Campaign = require("../models/campaign");

const campaignUsageUpdatedListener = async () => {
  return new Promise(async (resolve, reject) => {
    let campaignUsageUpdatedConsumer = null;
    try {
      campaignUsageUpdatedConsumer = createConsumer(
        "basketService-campaignUsageUpdated"
      );
      await campaignUsageUpdatedConsumer.connect();
      await campaignUsageUpdatedConsumer.subscribe({
        topics: ["basketService-campaignUsageUpdated"],
        fromBeginning: true,
      });
      campaignUsageUpdatedConsumer.run({
        eachMessage: async ({ topic, partition, message }) => {
          try {
            const parsedMessage = JSON.parse(message.value);
            const { campaignId, totalUsageCount, userId, userUsageCount } = parsedMessage;

            const campaign = await Campaign.findById(campaignId);
            if (campaign) {
              campaign.totalUsageCount += totalUsageCount;
              campaign.userUsageCount.set(userId, userUsageCount);
              await campaign.save();
            }
          } catch (error) {
            console.log(error);
          }
        },
      });
    } catch (error) {
      console.error("Error in campaign Listener:", error);
      reject(error);
    }
  });
};
module.exports = campaignUsageUpdatedListener;