const doUpdateOrder = require("../business/update-order");

exports.updateOrder = async (req, res) => {
  try {
    const updatedOrder = await doUpdateOrder(
      req.params.orderId,
      {
        $set: req.body,
      },
      { new: true }
    );

    res.status(200).json(updatedOrder);
  } catch (err) {
    console.error("Error updating order:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
