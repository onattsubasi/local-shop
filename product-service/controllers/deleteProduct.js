const { doDeleteProduct } = require("../business");
const { sendMessageToKafka } = require("../kafka");

const deleteProduct = async (req, res, next) => {
  const productId = req.params.productId;
  const resMsg = await doDeleteProduct(productId);
  await sendMessageToKafka("productService-productDeleted", resMsg);
  res.status(200).send(resMsg);
};



module.exports = {deleteProduct};

/*
{
    "productId":"65e39b789f1c3aab39938b89"
}
*/
