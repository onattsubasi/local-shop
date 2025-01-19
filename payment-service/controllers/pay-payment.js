const { sendMessageToKafka } = require("../kafka");
const CreditCard = require("../model/CreditCard");
const payment = require("../model/Payment");
const Axios = require("axios");

exports.payPayment = async (req, res) => {
  const userId = req.user.userId;
  const checkoutId = req.params.checkoutId;
  const cardId = req.query.cardId;

  try {
    const checkoutResponse = await Axios.get(
      `http://localhost:3003/api/checkouts/getCheckout/${checkoutId}`
    );
    const gainedCheckout = checkoutResponse.data;

    const Card=await CreditCard.findById(cardId);

    if (Card) {
      console.log("Latest Credit Card for user:", Card);
    } else {
      console.log("No credit card found for the user.");
    }

    if( gainedCheckout.isActive === false) {
      return res.status(409).json('Payment already taken.')
    }

    const newMoney = Card.money - gainedCheckout.totalPrice;

    if (newMoney < 0) {
      return res.status(400).json("Insufficient balance");
    }

    const updatedCard = await CreditCard.updateOne(
      { _id: cardId },
      { $set: { money: newMoney } },
      { new: true }
    );

    const payPayment = await payment.create({
      userId: userId,
      checkoutId: checkoutId,
      basketId: gainedCheckout.basketId,
      shipmentId: gainedCheckout.shipmentId,
      products: gainedCheckout.products,
      address: gainedCheckout.address,
      isGift: gainedCheckout.isGift,
      status: gainedCheckout.status,
      totalPrice: gainedCheckout.totalPrice,
      refunded: false,
      creditCardId: cardId,
      cardHolderName: Card.cardHolderName,
      cardNumber: Card.cardNumber,
      expireDate: Card.expireDate,
      cvv: Card.cvv,
      paymentStatus:true,
    });

    await payPayment.save();

    await sendMessageToKafka("payment-service-accept", {
      paymentId: payPayment._id,
    });


    res.status(200).json({ updatedCard, payPayment });
  } catch (err) {
    console.error(err); 
    res.status(500).json({ error: err.message }); 
  }
};
