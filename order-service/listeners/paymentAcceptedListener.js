const Order = require("../models/order");
const Axios = require("axios");
const { createConsumer, sendMessageToKafka } = require("../kafka");

const paymentAcceptedListener = () => {
  return new Promise(async (resolve, reject) => {
    let paymentAcceptedConsumer = null;

    try {
      paymentAcceptedConsumer = createConsumer(
        "paymentService-payment-service-accept"
      );
      await paymentAcceptedConsumer.connect();
      await paymentAcceptedConsumer.subscribe({
        topics: ["paymentService-payment-service-accept"],
        fromBeginning: true,
      });

      paymentAcceptedConsumer.run({
        eachMessage: async ({ topic, partition, message }) => {
          try {
            const { paymentId } = JSON.parse(message.value);
            console.log({ paymentId });

            const paymentResponse = await Axios.get(
              `http://localhost:3009/api/payment/find/${paymentId}`
            );
            const gainedPayment = paymentResponse.data;

            if (!gainedPayment) {
              throw new Error(`Product with ID ${paymentId} does not exist`);
            }

            const order = await new Order({
              userId: gainedPayment.userId,
              checkoutId: gainedPayment.checkoutId,
              basketId: gainedPayment.basketId,
              paymentId: paymentId,
              products: gainedPayment.products,
              shipmentId: gainedPayment.shipmentId,
              isGift: gainedPayment.isGift,
              status: gainedPayment.status,
              totalPrice: gainedPayment.totalPrice,
              refunded: gainedPayment.refunded,
              cardNumber: gainedPayment.cardNumber,
              address: gainedPayment.address,
            });

            await order.save();

            await sendMessageToKafka("orderService-orderCreated", {
              products: gainedPayment.products,
            });

            await sendMessageToKafka("orderService-basketClear", {
              basketId: gainedPayment.basketId,
              userId: gainedPayment.userId,
              setUsage:true,
            });

            await sendMessageToKafka(
              "orderService-orderCreated-checkoutActive",
              {
                checkout: {
                  _id: gainedPayment.checkoutId,
                  isActive: false,
                },
              }
            );

            console.log("Order payment :", order);
          } catch (error) {
            console.error(error);
          }
        },
      });
    } catch (error) {
      console.error("Error:", error);
      reject(error);
    }
  });
};

module.exports = paymentAcceptedListener;
