import connectDB from "../../../lib/mongodb";
import Order from "../../../models/Order";

export default async function handler(req, res) {
  await connectDB();

  if (req.method === "GET") {
    try {
      const cancelledOrders = await Order.find({ status: "cancelled" }).sort({ createdAt: -1 });
      return res.status(200).json(cancelledOrders);
    } catch (error) {
      return res.status(500).json({ error: "Failed to fetch cancelled orders" });
    }
  } else {
    return res.status(405).json({ error: "Method Not Allowed" });
  }
}
