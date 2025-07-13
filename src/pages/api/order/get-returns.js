import connectDB from "../../../lib/mongodb";
import ReturnRequest from "../../../models/ReturnRequest";

export default async function handler(req, res) {
  if (req.method !== "GET") return res.status(405).end("Method Not Allowed");
  await connectDB();

  try {
    const returns = await ReturnRequest.find().sort({ createdAt: -1 });
    return res.status(200).json(returns);
  } catch (error) {
    console.error("Get returns error:", error);
    return res.status(500).json({ error: "Failed to fetch return requests" });
  }
}
