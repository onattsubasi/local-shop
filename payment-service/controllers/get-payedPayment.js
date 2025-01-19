const Payment = require("../model/Payment");


exports.getPayedPayment = async (req, res) => {
    const paymentId= req.params.paymentId
    try {
        const userPayment = await Payment.findById(paymentId);

        if (!userPayment) {
            return res.status(404).json({ message: "Payment not found for this user." });
        }
        res.status(200).json(userPayment);
    } catch (err) {
        res.status(500).json(err);
    }
}
