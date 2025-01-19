const { doGetProduct } = require("../business");

const getProduct = async (req, res, next) => {
  let productId = req.params.productId;

  if (!productId) {
    productId = req.body.productId;
  }
  try {
    const product = await doGetProduct(productId);
    if (!product) {
      return res.status(404).json("Product not Found.");
    }
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = { getProduct };
