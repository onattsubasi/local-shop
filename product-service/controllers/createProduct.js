
const { doCreateProduct } = require('../business');
const Axios = require("axios");

const createProduct = async (req, res, next) => {
  try {
    const productObj = {};
    const categoryId = req.params.categoryId;
    const categoryResponse = await Axios.get(`http://localhost:3002/api/categories/getCategory/${categoryId}`);
    const gainedCategory = categoryResponse.data;
    
    if (!gainedCategory) {
      throw new Error(`Category with ID ${categoryId} does not exist`);
    }
    productObj.sellerId = req.user.userId;
    productObj.price = req.body.price;
    productObj.quantity = req.body.quantity;
    productObj.name = req.body.name;
    productObj.brand = req.body.brand;
    productObj.category={};
    productObj.category.categoryId=categoryId;
    productObj.category.categoryName=gainedCategory.name;
    const resMsg = await doCreateProduct(productObj);

    res.status(200).send(resMsg);
  } catch (error) {
    console.error("Error in createProductController:", error);
    res.status(500).send('Internal Server Error');
  }
};


module.exports = {createProduct};