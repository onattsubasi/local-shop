const { createConsumer } = require("../kafka");
const doRedeemFollower = require("../business/redeemFollower");
const couponRedeemedListener = async () => {
  return new Promise(async (resolve, reject) => {
    let couponRedeemedConsumer = null;
    try {
      couponRedeemedConsumer = createConsumer("couponService-couponRedeemed");
      await couponRedeemedConsumer.connect();
      await couponRedeemedConsumer.subscribe({
        topics: ["couponService-couponRedeemed"],
        fromBeginning: true,
      });
      couponRedeemedConsumer.run({
        eachMessage: async ({ topic, partition, message }) => {
          try {
            const parsedMessage = JSON.parse(message.value);
            await doRedeemFollower(parsedMessage);
            console.log("Coupon redeemed");
          } catch (error) {
            console.log(error);
          }
        },
      });
    } catch (error) {
      console.error("Error in couponRedeemedListener:", error);
      reject(new Error(error));
    }
  });
};
module.exports = couponRedeemedListener;
