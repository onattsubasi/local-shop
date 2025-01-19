const mongoose = require("mongoose");
const creditCard = require("../model/CreditCard");
const Axios = require("axios");

exports.addCard = async (req, res) => {
  try {
    const newCard = new creditCard({
      cardUserId: req.user.userId,
      cardHolderName: req.body.cardHolderName,
      cardNumber: req.body.cardNumber,
      expireDate: req.body.expireDate,
      cvv: req.body.cvv,
      money: req.body.money,
    });

    await newCard.save();

    res.status(200).json(newCard);
  } catch (err) {
    res.status(500).json(err);
  }
};
