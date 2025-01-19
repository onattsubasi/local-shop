const doFindOrder = require('../business/get-order');
const {sendMessageToKafka}=require("../kafka");

exports.refundOrder = async (req, res) => {
    let orderId = req.params.orderId;
    try {
      const order = await doFindOrder(orderId);
      if (!order) {
        return res.status(404).json("Order not Found.");
      }
      if(order.refunded==true)
        {
          return res.status(404).json("Order already refunded.");
        }
        let flag=false;
        order.products.forEach(product => {
          if(product.isRefunded==true)
            {
              flag=true;
            }
        });
        if(flag==true)
          {
            return res.status(404).json("You cant refund all the order because some/all products are alredy refunded, however you can refund a specific product by using the other refund method");
          }
      order.refunded=true;
      order.products.forEach(product => {
        product.isRefunded = true;
        product.refundedQuantity = product.quantity;
      });
      await order.save();
      await sendMessageToKafka("orderService-orderRefunded", {
        refunded:true,totalPrice:order.totalPrice,paymentId:order.paymentId
      });

      await sendMessageToKafka("orderService-productsRefundedIncreaseQuantity", {
        products:order.products
    });

      res.status(200).json(order);
    } catch (err) {
      res.status(500).json(err);
    }
};