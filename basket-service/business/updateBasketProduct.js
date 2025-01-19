const Basket = require("../models/basket");

const updateBasketProduct = async (product) => {
  try {
    let updatedProductMsg = await changeUpdatedProductProperties(product);
    let baskets = await Basket.find({ products: { $ne: [] } });

    for (let basket of baskets) {
      let newId = updatedProductMsg.productId.toString();
      let indexToUpdate = basket.products.findIndex(
        (element) => element.productId.toString() === newId
      );
      if (indexToUpdate !== -1) {
        updatedProductMsg.quantity = basket.products[indexToUpdate].quantity
        basket.products[indexToUpdate] = updatedProductMsg;
      }
      await basket.save();
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = updateBasketProduct;

const changeUpdatedProductProperties = async (product) => {
  try {
    product.productId={}
    product.productId = product._id;
    delete product._id;
    delete product.__v;
    delete product.campaigns;
    product.categoryId = product.category.categoryId;
    product.brandId = product.brand.brandId;
    delete product.category;
    delete product.brand;

    return product;
  } catch (error) {
    console.log(error);
  }
};
