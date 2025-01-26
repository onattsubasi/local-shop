const Axios = require("axios");
const { doUpdateProduct } = require("../business");
const Product = require("../models/product");
const mongoose = require("mongoose");
const { sendMessageToKafka } = require("../kafka");

const updateProduct = async (req, res, next) => {
  try {
    const productId = req.params.productId;
    const product = Product.findById(productId);
    if (!product) {
      res.status(404).send({ error: "Product not found" });
      return;
    }
    const categoryId = req.body.category.categoryId;
    const categoryResponse = await Axios.get(
      `http://localhost:${process.env.CATEGORY_SERVICE_PORT}/api/categories/getCategory/${categoryId}`
    );
    const gainedCategory = categoryResponse.data;

    if (!gainedCategory) {
      throw new Error(`Product with ID ${categoryId} does not exist`);
    }

    if (!mongoose.Types.ObjectId.isValid(categoryId)) {
      res.status(400).send(`Invalid category ID: ${categoryId}`);
      return;
    }

    const productObj = req.body;
    if (productObj.price > 0 && productObj.quantity >= 0) {
      const resMsg = await doUpdateProduct(productId, productObj);

      await sendMessageToKafka("productService-productUpdated", {
        product: resMsg,
      });
      res.status(200).send(resMsg);
    } else {
      console.error(
        "Check your price or quantity , price should be greater than 0 and quantity should be equals or greater than 0"
      );
      res.status(400).send({
        error:
          "Check your price or quantity , price should be greater than 0 and quantity should be equals or greater than 0",
      });
    }
  } catch (err) {
    console.error("Error updating product:", err);
    res.status(500).send({ error: "Error updating product" });
  }
};

module.exports = { updateProduct };
