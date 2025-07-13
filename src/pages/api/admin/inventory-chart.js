import connectDB from "../../../lib/mongodb";
import Product from "../../../models/Product";

export default async function handler(req, res) {
  await connectDB();

  try {
    const result = await Product.aggregate([
      {
        $group: {
          _id: { $month: "$createdAt" },
          total: { $sum: 1 },
        },
      },
      {
        $sort: { _id: 1 },
      },
    ]);

    // Map month numbers to names
    const monthNames = [
      "",
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const data = result.map((item) => ({
      name: monthNames[item._id],
      inventory: item.total,
    }));

    res.status(200).json(data);
  } catch (error) {
    console.error("Inventory chart error:", error);
    res.status(500).json({ message: "Failed to fetch chart data" });
  }
}
