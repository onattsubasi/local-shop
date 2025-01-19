const mongoose = require("mongoose");

const PaymentSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  checkoutId: { type: String, required: true },
  basketId: { type: String, required: true },
  creditCardId: { type: String, required: true},
  shipmentId: { type: String, required: true},
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
      refundedQuantity: { type: Number, required: true },
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
  cardHolderName: {
    type: String,
    required: true
  },
  cardNumber: {
      type: Number,
      required: true
    },
  expireDate:{
      type: String,
      required: true  
  },
  cvv:{
      type: Number,
      required: true,
      maxLength: 3 
  },
  paymentStatus: {
    type: Boolean,
    default: false
  },
});

PaymentSchema.set("versionKey", "recordVersion");
PaymentSchema.set("timestamps", true);

module.exports = mongoose.model("payment", PaymentSchema);
