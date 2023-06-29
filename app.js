const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

// Connect to MongoDB
async function connectToMongoDB() {
  try {
    await mongoose.connect(
      "mongodb+srv://sakshamsharmawalmart:a0sQ4cJSVhxIb6dU@cluster0.dfbgtxu.mongodb.net/mydatabase",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log("Connected to MongoDB");
    return true; // Return true for successful connection
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    return false; // Return false for failed connection
  }
}

module.exports = connectToMongoDB;
connectToMongoDB();
// Define a schema for your data
const Schema = mongoose.Schema;
const productSchema = new Schema({
  id: String,
  name: String,
  price: Number,
  description: String,
});

// Create a model based on the schema
const Data = mongoose.model("Product", productSchema);

// Create an Express app
const app = express();
app.use(cors());
// Define a route to retrieve data

app.use(bodyParser.json());

app.get("/data", async (req, res) => {
  try {
    console.log("Request at /data");
    // Retrieve data from the database
    const data = await Data.find({});

    const cartItems = await fetch("http:localhost:3001/cartItems");
    const cartItemsJson = await cartItems.json();

    const countedData = data.map((element) => {
      const { id, name, description, price } = element;
      const cartItem = cartItemsJson.filter((item) => id == item.itemId);
      const count = cartItem.length == 0 ? 0 : cartItem[0].count;
      console.log(cartItem);
      return { id, name, description, price, count };
    });
    console.log(countedData);
    res.send(countedData);
  } catch (error) {
    console.error("Error retrieving data:", error);
    res.status(500).json({ error: "Error retrieving data" });
  }
});

app.post("/get-product-details", async (req, res) => {
  console.log("Request at /get-product-details");
  const itemIds = req.body;
  console.log(itemIds);
  const products = await Data.find({ id: { $in: itemIds } });
  console.log(products);
  res.json(products);
});

// Start the server
app.listen(3000, () => {
  console.log("Server is running at PORT:3000");
});
