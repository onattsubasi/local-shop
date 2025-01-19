const mongoose = require("mongoose");
const checkUserType = require("../business/user-checkUserType");
const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    coupons: {
      type: [Object],
      default: [],
    },
    userType: {
      type: [String],
      default: ["default"],
      enum: ["default", "academic", "member", "admin", "shop"],
    },
  },
  { timestamps: true }
);
UserSchema.pre("save", async function (next) {
  await checkUserType(this);
  next();
});
module.exports = mongoose.model("User", UserSchema);
