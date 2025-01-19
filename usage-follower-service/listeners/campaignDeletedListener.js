const  doDeleteFollower  = require("../business/deleteFollower");
const { createConsumer } = require("../kafka");
const campaignDeletedListener = async () => {
  return new Promise(async (resolve, reject) => {
    let campaignDeletedConsumer = null;
    try {
      campaignDeletedConsumer = createConsumer(
        "campaignService-campaignDeleted"
      );
      await campaignDeletedConsumer.connect();
      await campaignDeletedConsumer.subscribe({
        topics: ["campaignService-campaignDeleted"],
        fromBeginning: true,
      });
      campaignDeletedConsumer.run({
        eachMessage: async ({ topic, partition, message }) => {
          try {
            const parsedMessage = JSON.parse(message.value);
            for(let obj of parsedMessage){
            let tempCamp = {}
            tempCamp.campaignId = obj._id

            await doDeleteFollower(
              tempCamp, "campaign"
            );}
            console.log("Campaign deleted");
          } catch (error) {
            console.log(error);
          }
        },
      });
    } catch (error) {
      console.error("Error in campaignDeletedListener:", error);
      reject(error);
    }
  });
};
module.exports = campaignDeletedListener;
