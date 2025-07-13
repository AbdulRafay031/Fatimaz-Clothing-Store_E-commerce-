import connectDB from "../../../lib/mongodb"; // Adjust this if your path is different
import Order from "../../../models/Order";

export default async function handler(req, res) {
  await connectDB();

  if (req.method === "GET") {
    try {
      const orders = await Order.find().sort({ createdAt: -1 });
      return res.status(200).json(orders);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Failed to fetch orders" });
    }
  } else {
    return res.status(405).json({ error: "Method Not Allowed" });
  }
}
