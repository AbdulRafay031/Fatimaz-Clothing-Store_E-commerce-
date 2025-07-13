// /pages/api/admin/stats.js
import connectDB from "../../../lib/mongodb";
import Order from "../../../models/Order";
import ReturnRequest from "../../../models/ReturnRequest";

export default async function handler(req, res) {
  await connectDB();

  if (req.method === "GET") {
    const orders = await Order.find();
    const returnRequests = await ReturnRequest.find();

    const total = orders.length;
    const confirmed = orders.filter((o) => o.status === "delivered").length;
    const remaining = orders.filter((o) => o.status !== "delivered").length;
    const cancelled = orders.filter((o) => o.status === "cancelled").length;
    const returned = returnRequests.filter(
      (r) => r.status === "confirmed"
    ).length;

    return res.status(200).json({
      total,
      confirmed,
      remaining,
      cancelled,
      returned, // ✅ include this
    });
  }

  return res.status(405).json({ message: "Method Not Allowed" });
}
