const verifyToken = require('../controllers/verifyToken');

const updateOrderController = require('../controllers/update-order');

const getOrdersController = require('../controllers/get-orders');

const getOrderController = require('../controllers/get-order');

const refundOrderController = require('../controllers/refund-order');

const refundProductFromOrderController = require('../controllers/refund-productFromOrder');

const router = require("express").Router();

router.patch('/:orderId', updateOrderController.updateOrder);

router.get('/find/:userId', getOrdersController.getOrders);

router.get('/findOrder/:orderId', verifyToken, getOrderController.findOrder);

router.get('/refundOrder/:orderId', verifyToken, refundOrderController.refundOrder);

router.get('/refundProductFromOrder/:orderId', verifyToken, refundProductFromOrderController.refundProductFromOrder);

module.exports = router;
