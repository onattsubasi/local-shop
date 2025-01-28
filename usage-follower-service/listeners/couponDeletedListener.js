const doDeleteFollower = require("../business/deleteFollower");
const { createConsumer } = require("../kafka");
const couponDeletedListener = async () => {
  return new Promise(async (resolve, reject) => {
    let couponDeletedConsumer = null;
    try {
      couponDeletedConsumer = createConsumer("couponService-couponDeleted");
      await couponDeletedConsumer.connect();
      await couponDeletedConsumer.subscribe({
        topics: ["couponService-couponDeleted"],
        fromBeginning: true,
      });
      couponDeletedConsumer.run({
        eachMessage: async ({ topic, partition, message }) => {
          try {
            const parsedMessage = JSON.parse(message.value);
            console.log(parsedMessage);
            await doDeleteFollower(parsedMessage, "coupon");
            console.log("Coupon deleted");
          } catch (error) {
            console.log(error);
          }
        },
      });
    } catch (error) {
      console.error("Error in couponDeletedListener:", error);
      reject(new Error(error));
    }
  });
};
module.exports = couponDeletedListener;
