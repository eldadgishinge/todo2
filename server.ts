const express = require("express");
const mongoose = require("mongoose");
const app = express();
const Product = require("./models/productModels");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// routes
// routes

app.get("/", (req, res) => {
  res.send("HEllo it has to work");
});

app.get("/blog", (req, res) => {
  res.send("Hello blog eldad");
});

// This route should come before the route for "/Product/:id"

app.get("/Product/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get("/Product", async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post("/Product", async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(200).json(product);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Internal server error" }); // Sending a custom error message
  }
});

app.put("/Product/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndUpdate(id, req.body);
    if (!product) {
      return res
        .status(404)
        .json({ message: `Cannot find any product with ID ${id}` });
    }
    const updatedproduct = await Product.findById(id);
    res.status(200).json(updatedproduct);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.delete("/Product/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      return res
        .status(200)
        .json({ message: `can not find any product with ID ${id}` });
    }
    res.status(200).json(product);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Internal server error" }); // Sending a custom error message
  }
});

mongoose.set("strictQuery", false);
mongoose
  .connect(
    "mongodb+srv://admin:Papamama213@todoapi.9cbuhex.mongodb.net/Node-API"
  )
  .then(() => {
    app.listen(3000, () => {
      console.log("connected to the database");
      console.log(`NODE API app is running on port 3000`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
