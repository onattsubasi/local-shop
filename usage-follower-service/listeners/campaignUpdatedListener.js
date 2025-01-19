const { createConsumer } = require("../kafka");
const doUpdateFollower = require("../business/updateFollower")
const campaignUpdatedListener = async () => {
  return new Promise(async (resolve, reject) => {
    let campaignUpdatedConsumer = null;
    try {
      campaignUpdatedConsumer = createConsumer(
        "campaignService-campaignUpdated"
      );
      await campaignUpdatedConsumer.connect();
      await campaignUpdatedConsumer.subscribe({
        topics: ["campaignService-campaignUpdated"],
        fromBeginning: true,
      });
      campaignUpdatedConsumer.run({
        eachMessage: async ({ topic, partition, message }) => {
          try {
            const parsedMessage = JSON.parse(message.value);
            let tempCamp = {}
            let tempCampId = parsedMessage._id
            tempCamp.maxLimitInBasket = parsedMessage.maxLimitInBasket
            tempCamp.maxTotalLimit = parsedMessage.maxTotalLimit
            tempCamp.maxLimitPerCustomer = parsedMessage.max

            await doUpdateFollower(//TODO
              tempCampId,tempCamp
            );
            console.log("Campaign updated");
          } catch (error) {
            console.log(error);
          }
        },
      });
    } catch (error) {
      console.error("Error in campaignUpdatedListener:", error);
      reject(error);
    }
  });
};
module.exports = campaignUpdatedListener;
