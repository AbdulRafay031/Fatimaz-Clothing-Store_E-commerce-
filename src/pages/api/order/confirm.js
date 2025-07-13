// pages/api/order/confirm.js
import connectDB from "../../../lib/mongodb";
import Order from "../../../models/Order";

export default async function handler(req, res) {
  if (req.method === "PUT") {
    await connectDB();

    const { id } = req.body;

    try {
      const order = await Order.findByIdAndUpdate(
        id,
        { status: "delivered" },
        { new: true }
      );

      if (!order) {
        return res.status(404).json({ error: "Order not found" });
      }

      return res.status(200).json({ message: "Delivery confirmed", order });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Failed to confirm delivery" });
    }
  } else {
    return res.status(405).json({ error: "Method Not Allowed" });
  }
}
