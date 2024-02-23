const mongoose = require("mongoose");

const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter a task name"],
    },
    description: {
      type: String,
      required: true,
      default: 0,
    },
    completed: {
      type: Boolean,
      required: true,
    },
    image: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema); // Corrected model name

module.exports = Product;
