const Basket = require("../models/basket");

const deleteBasketProduct = async (product) => {
  try {
    let baskets = await Basket.find({ products: { $ne: [] } });

    for (let basket of baskets) {
      let newId = product._id.toString();
      let indexToRemove = await basket.products.findIndex(
        (element) => element.productId.toString() === newId
      );
      if (indexToRemove !== -1) {
        basket.products.splice(indexToRemove, 1);
      }
      await basket.save();
    }
  } catch (error) {
    console.log(error);
  }
};
module.exports = deleteBasketProduct;
