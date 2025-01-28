const { createConsumer } = require("../kafka");
const doAddCoupon = require("../business/user-addCoupon");
const userCouponRedeemedListener = async () => {
  return new Promise(async (resolve, reject) => {
    let userCouponRedeemedConsumer = null;
    try {
      userCouponRedeemedConsumer = createConsumer(
        "couponService-couponRedeemed"
      );
      await userCouponRedeemedConsumer.connect();
      await userCouponRedeemedConsumer.subscribe({
        topics: ["couponService-couponRedeemed"],
        fromBeginning: true,
      });
      userCouponRedeemedConsumer.run({
        eachMessage: async ({ topic, partition, message }) => {
          try {
            const parsedMessage = JSON.parse(message.value);
            await doAddCoupon(parsedMessage);
            console.log("Coupon redeemed");
          } catch (error) {
            console.log(error);
          }
        },
      });
    } catch (error) {
      console.error("Error in userCouponRedeemedListener:", error);
      reject(new Error(error));
    }
  });
};
module.exports = userCouponRedeemedListener;
