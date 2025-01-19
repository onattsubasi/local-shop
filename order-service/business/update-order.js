const Order = require("../models/order");

const doUpdateOrder = async (orderId, updatedOrder, options) => {
  const order = await Order.findByIdAndUpdate(orderId, updatedOrder, options); // options parametresi eklendi
  return order;
};

module.exports = doUpdateOrder;
