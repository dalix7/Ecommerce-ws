const mongoose = require("mongoose");

// 2 create schema
const { Schema, model } = mongoose;

const productSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  image: {
    type: String, // This would store the path or URL of the image
    default: "", // Optional: Default value if no image is provided
  },

  id_user: { type: Schema.Types.ObjectId, ref: "user", required: true },
});

module.exports = Product = model("product", productSchema);
