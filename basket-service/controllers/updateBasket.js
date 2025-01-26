const { doUpdateBasket } = require("../business");
const Axios = require("axios");

exports.updateBasket = async (req, res, next) => {
  try {
    const basketObj = req.body;
    const basketId = req.params.basketId;
    const productIdsSet = new Set();

    for (const product of basketObj.products) {
      const { productId, quantity } = product;

      if (productIdsSet.has(productId)) {
        throw new Error(`Duplicate product ID found: ${productId}`);
      }

      productIdsSet.add(productId);

      if (quantity < 0) {
        throw new Error(
          `Quantity must be greater or equal than 0 for product ID: ${productId}`
        );
      }
      const productResponse = await Axios.get(
        `http://localhost:${process.env.PRODUCT_SERVICE_PORT}/api/product/getProduct/${productId}`
      );
      const gainedProduct = productResponse.data;

      if (gainedProduct.quantity < quantity) {
        throw new Error(
          `Not enough quantity available for product with ID ${productId}`
        );
      }
    }
    const resMsg = await doUpdateBasket(basketId, basketObj);
    res.status(200).send(resMsg);
  } catch (error) {
    console.error("Error updating basket:", error);
    res.status(400).send({ error: error.message });
  }
};