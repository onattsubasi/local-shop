const { createConsumer } = require("../kafka");
const doUpdateFollower = require("../business/updateFollower");
const couponUpdatedListener = async () => {
  return new Promise(async (resolve, reject) => {
    let couponUpdatedConsumer = null;
    try {
      couponUpdatedConsumer = createConsumer("couponService-couponUpdated");
      await couponUpdatedConsumer.connect();
      await couponUpdatedConsumer.subscribe({
        topics: ["couponService-couponUpdated"],
        fromBeginning: true,
      });
      couponUpdatedConsumer.run({
        eachMessage: async ({ topic, partition, message }) => {
          try {
            const parsedMessage = JSON.parse(message.value);
            await doUpdateFollower(parsedMessage);
            console.log("Coupon updated");
          } catch (error) {
            console.log(error);
          }
        },
      });
    } catch (error) {
      console.error("Error in couponUpdatedListener:", error);
      reject(new Error(error));
    }
  });
};
module.exports = couponUpdatedListener;
