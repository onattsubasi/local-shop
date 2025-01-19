const { createConsumer } = require("../kafka");
const CreditCard = require('../model/CreditCard');
const Payment = require('../model/Payment');

const cardRefundProductListener = () => {
  return new Promise(async (resolve, reject) => {
    let cardRefundProductConsumer = null;

    try {
      cardRefundProductConsumer = createConsumer("orderService-productFromOrderRefunded");
      await cardRefundProductConsumer.connect();
      await cardRefundProductConsumer.subscribe({
        topics: ["orderService-productFromOrderRefunded"],
        fromBeginning: true,
      });

      cardRefundProductConsumer.run({
        eachMessage: async ({ topic, partition, message }) => {
          try {
            const parsedMessage = JSON.parse(message.value);
            const productId = parsedMessage.productId;
            const price = parsedMessage.price;
            const cardNumber = parsedMessage.cardNumber;
            const paymentId = parsedMessage.paymentId;

           
            const payment = await Payment.findById(paymentId).exec();
            if (!payment) {
              console.error("Payment not found");
              return;
            }

            
            const product = payment.products.find(prod => prod.productId.toString() === productId);
            if (!product) {
              console.error("Product not found in payment");
              return;
            }

            
            const card = await CreditCard.findOne({ cardNumber }).exec();
            if (!card) {
              console.error("Card not found");
              return;
            }

          
            card.money = card.money + price;
            await card.save();

            console.log("Card updated with refund:", card);
          } catch (error) {
            console.error("Error processing message:", error);
          }
        },
      });
    } catch (error) {
      console.error("Error in listener:", error);
      reject(error);
    }
  });
};

module.exports = cardRefundProductListener;
