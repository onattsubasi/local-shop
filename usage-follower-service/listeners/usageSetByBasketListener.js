const { createConsumer } = require("../kafka");
const doAddUsage = require("../business/addUsage")
const usageSetByBasketListener = async () => {
  return new Promise(async (resolve, reject) => {
    let usageSetByBasketConsumer = null;
    try {
      usageSetByBasketConsumer = await createConsumer(
        "basketService-setUsage-active"
      );
      await usageSetByBasketConsumer.connect();
      await basketCampaignAddedConsumer.subscribe({
        topics: ["basketService-setUsage-active"],
        fromBeginning: true,
      });
      usageSetByBasketConsumer.run({
        eachMessage: async ({ topic, partition, message }) => {
          try {
            const parsedMessage = JSON.parse(message.value);
            let couponId = parsedMessage.couponId
            let campaignIds = parsedMessage.campaignIds
            let userId = parsedMessage.userId
            await doAddUsage(userId,campaignIds,couponId);
            console.log("campaign usage settled by basket");
          } catch (error) {
            console.log(error);
          }
        },
      });
    } catch (error) {
      console.error("Error in usageFollower Listener:", error);
      reject(error);
    }
  });
};
module.exports = usageSetByBasketListener;
