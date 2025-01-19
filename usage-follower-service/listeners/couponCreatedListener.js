const doCreateFollower = require("../business/createFollower")
const { createConsumer } = require("../kafka");
const couponCreatedListener = async () => {
  return new Promise(async (resolve, reject) => {
    let couponCreatedConsumer = null;
    try {
      couponCreatedConsumer = createConsumer(
        "couponService-couponCreated"
      );
      await couponCreatedConsumer.connect();
      await couponCreatedConsumer.subscribe({
        topics: ["couponService-couponCreated"],
        fromBeginning: true,
      });
      couponCreatedConsumer.run({
        eachMessage: async ({ topic, partition, message }) => {
          try {
            const parsedMessage = JSON.parse(message.value);
            let tempCoupon = {            }
            tempCoupon.maxTotalLimit = parsedMessage.maxTotalLimit
            tempCoupon.maxLimitPerCustomer = parsedMessage.maxLimitPerCustomer
            tempCoupon.couponId = parsedMessage._id
            await doCreateFollower(
              tempCoupon
            );
            console.log("New coupon created");
          } catch (error) {
            console.log(error);
          }
        },
      });
    } catch (error) {
      console.error("Error in couponCreatedListener:", error);
      reject(error);
    }
  });
};
module.exports = couponCreatedListener;
