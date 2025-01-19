const mongoose = require("mongoose");

const creditCardSchema = new mongoose.Schema(
  {
    cardUserId: {
        type: String,
        required:true
    },
    cardHolderName: {
      type: String,
      required: true
    },
    cardNumber: {
        type: Number,
        required: true,
        unique: true
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
    money:{
        type: Number,
        required: true
    }
  }
);

creditCardSchema.set("versionKey", "recordVersion");
creditCardSchema.set("timestamps", true);

module.exports = mongoose.model("creditCard", creditCardSchema);