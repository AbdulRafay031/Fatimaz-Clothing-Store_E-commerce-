import connectDB from "../../../lib/mongodb";
import Product from "../../../models/Product";

export default async function handler(req, res) {
  const searchQuery = req.query.query || "";
  await connectDB();

  if (!searchQuery.trim()) {
    return res.status(400).json({ message: "Query string is required." });
  }

  try {
    const regex = new RegExp(searchQuery, "i"); // case-insensitive regex

    const products = await Product.find({
      $or: [
        { name: { $regex: regex } },
        { category: { $regex: regex } },
        { description: { $regex: regex } },
      ],
    }).lean();

    const sanitized = products.map((p) => ({
      ...p,
      _id: p._id.toString(),
      createdAt: p.createdAt?.toString(),
      updatedAt: p.updatedAt?.toString(),
    }));

    res.status(200).json(sanitized);
  } catch (err) {
    console.error("Search API error:", err);
    res.status(500).json({ message: "Search failed" });
  }
}
