
const { payPayment } = require("../controllers/pay-payment");
const { createConsumer } = require("../kafka");
const CreditCard = require('../model/CreditCard');
const Payment = require('../model/Payment');


const cardRefundAllOrderListener = () => {
  return new Promise(async (resolve, reject) => {
    let cardRefundAllOrderConsumer = null;

    try {
      cardRefundAllOrderConsumer = createConsumer("orderService-orderRefunded");
      await cardRefundAllOrderConsumer.connect();
      await cardRefundAllOrderConsumer.subscribe({
        topics: ["orderService-orderRefunded"],
        fromBeginning: true,
      });

      cardRefundAllOrderConsumer.run({
        eachMessage: async ({ topic, partition, message }) => {
          try {
            const parsedMessage = JSON.parse(message.value);
            const refunded=parsedMessage.refunded;
            const totalPrice=parsedMessage.totalPrice;
            const paymentId=parsedMessage.paymentId;
            const payment = await Payment.findById(paymentId);
            if (!payment) {
              console.error("Payment not found");
              return;
            }
            payment.refunded = refunded;
            await payment.save();
            const cardId=payment.creditCardId;
            const card=await CreditCard.findById(cardId);
            card.money=card.money+totalPrice;
            await card.save();

            console.log("Card updated with refund:", card);
          } catch (error) {
            console.error(error);
          }
        },
      });
    } catch (error) {
      console.error("Error in listener:", error);
      reject(error);
    }
  });
};

module.exports = cardRefundAllOrderListener;
