const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    subCategory: {
      type: String,
    },
    price: {
      type: Number,
      required: true,
    },
    dropPrice: {
      type: Number,
    },
    availableSize: {
      type: String,
    },
    description: {
      type: String,
      required: true,
    },
    color: {
      type: String,
    },
    onSale: {
      type: String,
      enum: ["Yes", "No"],
      default: "No",
    },
    frontImages: { type: [String], required: true },
  },
  { timestamps: true }
);

module.exports =
  mongoose.models.Product || mongoose.model("Product", productSchema);
