const mongoose = require("mongoose");

const propertySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },

    description: {
      type: String,
      required: true
    },

    location: {
      type: String,
      required: true
    },

    coordinates: {

      latitude: Number,

      longitude: Number

    },

    city: {
      type: String
    },

    price: {
      type: Number,
      required: true
    },

    propertyType: {
      type: String,
      enum: ["PG", "Apartment", "House"],
      default: "House"
    },

    amenities: [
      String
    ],

    images: [
      String
    ],

    landlord: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },

    rating: {
      type: Number,
      default: 0
    },

    reviewsCount: {
      type: Number,
      default: 0
    },

  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model(
  "Property",
  propertySchema
);