import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  title: String,
  price: Number,
  image: String,
  category: {
    type: String,
    enum: ["men", "women", "kids", "accessories"]
  },
  stock: Number
}, { timestamps: true });

export default mongoose.model("Product", productSchema);
