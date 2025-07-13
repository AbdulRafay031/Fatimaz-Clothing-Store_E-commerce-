// pages/api/order/user-orders.js
import connectDB from "../../../lib/mongodb";
import Order from "../../../models/Order";

export default async function handler(req, res) {
  await connectDB();

  if (req.method === "GET") {
    const { email } = req.query;

    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }

    try {
      const orders = await Order.find({ userEmail: email }).sort({
        createdAt: -1,
      });
      return res.status(200).json(orders);
    } catch (error) {
      console.error("Failed to fetch user orders:", error);
      return res.status(500).json({ error: "Failed to fetch orders" });
    }
  } else {
    return res.status(405).json({ error: "Method Not Allowed" });
  }
}
