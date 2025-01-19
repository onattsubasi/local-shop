const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    checkoutId: { type: String, required: true },
    basketId: { type: String, required: true },
    paymentId: { type: String, require:true},
    products: [
      {
        productId: {
          type: String,
        },
        quantity: {
          type: Number,
          default: 1,
        },
        price: { type: Number, required: true },
        isRefunded: { type: Boolean, required: true },
        refundedQuantity: { type: Number, required: true,default:0 },
        sellerId: String,
      },
    ],
    address: { type: String, required: true },
    isGift: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      default: "Pending",
    },
    totalPrice: { type: Number, required: true },
    refunded: {
      type: Boolean,
      default: false,
      required: true,
    },
    cardNumber:{
      type: Number,
      required: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", OrderSchema);
