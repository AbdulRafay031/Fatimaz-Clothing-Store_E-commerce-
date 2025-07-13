import mongoose from "mongoose";
import Product from "../../../models/Product"; 

export default async function handler(req, res) {
  if (mongoose.connections[0].readyState !== 1) {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  }

  if (req.method === "POST") {
    try {
      const {
        name,
        category,
        subCategory,
        price,
        dropPrice,
        availableSize,
        description,
        onSale,
        images,
      } = req.body;

      if (!name || !category || !price || !description) {
        return res.status(400).json({ message: "Missing required fields" });
      }

      const newProduct = new Product({
        name,
        category,
        subCategory,
        price,
        dropPrice,
        availableSize,
        description,
        onSale,
        frontImages: images,
        isAllowed: true,
      });

      await newProduct.save();
      return res
        .status(201)
        .json({ message: "Product created successfully", product: newProduct });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Server error", error: error.message });
    }
  }

  // ✅ Add GET method
  else if (req.method === "GET") {
    try {
      const { category } = req.query;

      const filter = category
        ? { category: { $regex: new RegExp(`^${category}$`, "i") } }
        : {};

      const products = await Product.find(filter).sort({ createdAt: -1 });

      return res.status(200).json(products);
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Failed to fetch products", error: error.message });
    }
  }

  // Method not allowed
  else {
    return res.status(405).json({ message: "Method Not Allowed" });
  }
}
