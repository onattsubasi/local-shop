const mongoose = require("mongoose");
const Basket = require("../models/basket");
const { sendMessageToKafka } = require("../kafka");
const Axios = require("axios");

exports.createBasket = async (req, res, next) => {
  try {
    const userId = req.user.userId;
    const userType = req.user.userType;
    const productId = req.params.productId;
    const quantity = parseInt(req.query.quantity);
    const productResponse = await Axios.get(
      `http://localhost:8001/api/product/getProduct/${productId}`
    );
    const gainedProduct = productResponse.data;
    gainedProduct.quantity =
      gainedProduct.appliedCampaign?.maxLimitInProduct ??
      gainedProduct.quantity;

    if (!gainedProduct) {
      throw new Error(`Product with ID ${productId} does not exist`);
    }
    if (gainedProduct.quantity < quantity) {
      throw new Error(
        `Not enough quantity available for product with ID ${productId}`
      );
    }
    if (quantity <= 0) {
      throw new Error(
        `Quantity must be greater than 0 for product with ID ${productId}`
      );
    }

    let basket = await Basket.findOne({ "user.userId": userId });
    if (userId === gainedProduct.sellerId) {
      return res.status(400).json("You cannot buy your product.");
    }

    if (!basket) {
      console.log("basket is not exist");
      basket = new Basket({
        user: { userId: userId, userType: userType },
        products: [
          {
            productId: gainedProduct._id,
            quantity: quantity,
            price: gainedProduct.price,
            isRefunded: false,
            refundedQuantity: 0,
            sellerId: gainedProduct.sellerId,
            categoryId: gainedProduct.category.categoryId,
            brandId: gainedProduct.brand.brandId,
            discountedPrice: gainedProduct.discountedPrice,
            appliedCampaign: gainedProduct.appliedCampaign,
            discountSource: "product",
          },
        ],
        totalPrice: gainedProduct.price * quantity,
        totalDiscountedPrice: gainedProduct.discountedPrice * quantity,
        totalDiscountAmount:
          (gainedProduct.price - gainedProduct.discountedPrice) * quantity,
      });
    } else {
      // Check if the product already exists in the basket
      const existingProduct = basket.products.find((product) =>
        product.productId.equals(gainedProduct._id)
      );
      if (existingProduct) {
        // If the product already exists in the basket, update its quantity
        existingProduct.quantity += quantity;
        console.log("already exists!");
      } else {
        // If the product doesn't exist in the basket, add it
        basket.products.push({
          productId: gainedProduct._id,
          quantity: quantity,
          price: gainedProduct.price,
          isRefunded: false,
          refundedQuantity: 0,
          sellerId: gainedProduct.sellerId,
          categoryId: gainedProduct.category.categoryId,
          brandId: gainedProduct.brand.brandId,
          discountedPrice: gainedProduct.discountedPrice,
          appliedCampaign: gainedProduct.appliedCampaign,
          discountSource: "product",
        });
      }
    }
    // Save the updated basket
    await basket.save();
    await sendMessageToKafka("basketService-basketCreated", basket._id);
    res.status(200).send("Basket updated successfully");
  } catch (error) {
    console.error("Error creating basket:", error);
    res.status(500).send("Error creating basket");
  }
};

