const doFindOrder = require('../business/get-order');

exports.findOrder = async (req, res) => {
    let orderId = req.params.orderId;
    if (!orderId) {
        orderId = req.body.orderId;
    }
    try {
      const order = await doFindOrder(orderId);
      if (!order) {
        return res.status(404).json("Order not Found.");
      }
      res.status(200).json(order);
    } catch (err) {
      res.status(500).json(err);
    }
};