const mongoose = require("mongoose");
const crypto = require("crypto");

const userSchema = new mongoose.Schema({
  name: String,

  email: {
    type: String,
    unique: true
  },

  password: String,

  role: {
    type: String,
    enum: ["tenant", "landlord", "admin"],
    default: "tenant"
  },

  searchHistory: [
    {
      type: String
    }
  ],

  recentlyViewed: [
    {
      type:
        mongoose.Schema.Types.ObjectId,

      ref: "Property"
    }
  ],

  wishlist: [
    {
      type:
        mongoose.Schema.Types.ObjectId,

      ref: "Property"
    }
  ],

  resetPasswordToken: {
    type: String
  },

  resetPasswordExpire: {
    type: Date
  },

  refreshToken: {
    type: String
  }

});

userSchema.methods
  .getResetPasswordToken =

  function () {


    const resetToken =

      crypto
        .randomBytes(20)
        .toString("hex");



    this.resetPasswordToken =

      crypto
        .createHash("sha256")

        .update(resetToken)

        .digest("hex");



    this.resetPasswordExpire =

      Date.now()

      +

      15 * 60 * 1000;



    return resetToken;

  };

module.exports = mongoose.model("User", userSchema);