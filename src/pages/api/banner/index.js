import connectDB from "../../../lib/mongodb";
import Banner from "../../../models/Banner";

export default async function handler(req, res) {
  await connectDB();

  if (req.method === "GET") {
    try {
      const banner = await Banner.findOne().sort({ createdAt: -1 });
      if (!banner) return res.status(404).json({ images: [] });

      return res.status(200).json({ images: banner.images });
    } catch (err) {
      return res.status(500).json({ error: "Failed to fetch banner images" });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
