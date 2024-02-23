var mongoose = require("mongoose");
var productSchema = mongoose.Schema({
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
}, {
    timestamps: true,
});
var Product = mongoose.model("Product", productSchema); // Corrected model name
module.exports = Product;
