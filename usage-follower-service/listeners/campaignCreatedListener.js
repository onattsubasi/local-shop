const doCreateFollower = require("../business/createFollower");
const { createConsumer } = require("../kafka");
const campaignCreatedListener = async () => {
  return new Promise(async (resolve, reject) => {
    let campaignCreatedConsumer = null;
    try {
      campaignCreatedConsumer = createConsumer(
        "campaignService-campaignCreated"
      );
      await campaignCreatedConsumer.connect();
      await campaignCreatedConsumer.subscribe({
        topics: ["campaignService-campaignCreated"],
        fromBeginning: true,
      });
      campaignCreatedConsumer.run({
        eachMessage: async ({ topic, partition, message }) => {
          try {
            const parsedMessage = JSON.parse(message.value);
            for (let obj of parsedMessage) {
              let tempCamp = {};
              tempCamp.campaignId = obj._id;
              tempCamp.maxLimitInBasket = obj.maxLimitInBasket;
              tempCamp.maxTotalLimit = obj.maxTotalLimit;
              tempCamp.maxLimitPerCustomer = obj.maxLimitPerCustomer;

              await doCreateFollower(tempCamp);
              console.log("New campaign created");
            }
          } catch (error) {
            console.log(error);
          }
        },
      });
    } catch (error) {
      console.error("Error in campaignCreatedListener:", error);
      reject(new Error(error));
    }
  });
};
module.exports = campaignCreatedListener;
