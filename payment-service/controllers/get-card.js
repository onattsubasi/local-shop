const CreditCard = require('../model/CreditCard');

exports.doGetCard = async (req, res) => {
    const cardId= req.params.cardNumber
    try {
        const userCard = await CreditCard.findOne(cardId);

        if (!userCard) {
            return res.status(404).json({ message: "Credit card not found for this user." });
        }

        res.status(200).json(userCard);
    } catch (err) {
        res.status(500).json(err);
    }
}
