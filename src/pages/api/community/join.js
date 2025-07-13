import connectDB from "../../../lib/mongodb";
import User from "../../../models/User";

export default async function handler(req, res) {
  await connectDB();

  if (req.method === "POST") {
    const { email } = req.body;

    try {
      const user = await User.findOne({ email });

      if (!user) return res.status(404).json({ message: "User not found" });

      if (!user.joinedCommunity) {
        user.joinedCommunity = true;
        await user.save();
        console.log(`User ${email} joined the community`); // ✅ Add this
      } else {
        console.log(`User ${email} already joined.`);
      }

      return res.status(200).json({ message: "Joined community" });
    } catch (error) {
      console.error("Join error:", error);
      return res.status(500).json({ error: "Server error" });
    }
  }

  if (req.method === "GET") {
    try {
      const joinedUsers = await User.find(
        { joinedCommunity: true },
        "fullname email"
      ).lean();
      return res.status(200).json(joinedUsers);
    } catch (error) {
      return res.status(500).json({ error: "Failed to fetch members" });
    }
  }

  res.status(405).json({ message: "Method not allowed" });
}
