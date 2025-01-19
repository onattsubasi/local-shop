const Product = require("../models/product");

const doUpdateProduct = async (ProductId, productObj) => {
  try {
    let product = await Product.findByIdAndUpdate(ProductId, productObj, {
      new: true,
    }).lean();
    let tempProduct = await Product.findById(ProductId);
    await tempProduct.save()
    return tempProduct;
  } catch (err) {
    console.error("There is an error occured while updating the product", err);
  }
};

module.exports = doUpdateProduct;
