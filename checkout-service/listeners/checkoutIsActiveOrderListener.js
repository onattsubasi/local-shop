const { createConsumer } = require("../kafka");
const updateCheckout = require("../business/checkout/updateCheckout");

const checkoutIsActiveOrderListener = () => {
  return new Promise(async (resolve, reject) => {
    let checkoutIsActiveOrderConsumer = null;

    try {
      checkoutIsActiveOrderConsumer = createConsumer(
        "orderService-orderCreated-checkoutActive"
      );
      await checkoutIsActiveOrderConsumer.connect();
      await checkoutIsActiveOrderConsumer.subscribe({
        topics: ["orderService-orderCreated-checkoutActive"],
        fromBeginning: true,
      });

      checkoutIsActiveOrderConsumer.run({
        eachMessage: async ({ topic, partition, message }) => {
          try {
            const parsedMessage = JSON.parse(message.value);
            console.log(parsedMessage);
            const checkout = parsedMessage.checkout;
            const isActive = checkout.isActive;
            const checkoutId = checkout._id;
            const updatedCheckout = await updateCheckout(checkoutId, {
              isActive,
            });
            console.log(updatedCheckout);
          } catch (error) {
            console.error(error);
          }
        },
      });
    } catch (error) {
      console.error("Error in product quantity listener:", error);
      reject(new Error(error));
    }
  });
};

module.exports = checkoutIsActiveOrderListener;
