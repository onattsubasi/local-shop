const express = require('express');
const router = express();

const addCardController = require('../controllers/add-card');
const doGetCardController = require('../controllers/get-card');
const deleteCreditCardController = require('../controllers/delete-card');

const payPaymentController = require('../controllers/pay-payment');
const getPayedPaymentController = require('../controllers/get-payedPayment');
const deletePaymentController = require('../controllers/delete-payment');

const verifyToken = require('../controllers/verifyToken');


router.post('/add', verifyToken, addCardController.addCard);

router.get('/get/:cardId', doGetCardController.doGetCard);

router.post('/pay/:checkoutId', verifyToken, payPaymentController.payPayment);

router.get('/find/:paymentId', getPayedPaymentController.getPayedPayment);

router.delete('/delete-card/:cardId', deleteCreditCardController.deleteCreditCard);

router.delete('/delete-payment/:paymentId', deletePaymentController.deletePayment);

module.exports = router;