const doFindOrder = require('../business/get-order');
const { sendMessageToKafka } = require("../kafka");
const { checkout } = require('../routes/order');

exports.refundProductFromOrder = async (req, res) => {
    let orderId = req.params.orderId;
    const productId = req.query.productId;
    const quantity = parseInt(req.query.quantity);
    try {
        const order = await doFindOrder(orderId);
        if (!order) {
            return res.status(404).json("Order not Found.");
        }
        if(order.refunded==true)
            {
              return res.status(404).json("Order already refunded.");
            }
        const product = order.products.find(prod => prod.productId === productId);
        if (!product) {
            return res.status(404).json("Product not found.");
        }

        if(product.isRefunded==true&&(product.quantity==product.refundedQuantity))
            {
            return res.status(404).json("Product already refunded.");
            }

        if(product.quantity<quantity)
            {
              return res.status(404).json("Not enough quantity!");
            }
        if(quantity<=0)
            {
            return res.status(404).json("Quantity must be more than zero!");
            }
        if(product.isRefunded==true&&((product.quantity - product.refundedQuantity)<quantity))
            {
            return res.status(404).json("Not enough quantity!.");
            }

        const isRefunded = true;
        product.isRefunded = isRefunded;
        product.refundedQuantity+=quantity;
        const index = order.products.findIndex(prod => prod.productId === productId);
        order.products[index] = product;
        await order.save();
    
        const price = product.price * quantity;
        await sendMessageToKafka("orderService-productFromOrderRefunded", {
            productId: productId,
            price:price,
            cardNumber: order.cardNumber,
            paymentId: order.paymentId
        });

        await sendMessageToKafka("orderService-productRefundedIncreaseQuantity", {
            productId:productId,refundedQuantity:quantity
        });

        res.status(200).json(order);
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
};
