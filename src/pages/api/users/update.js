// /pages/api/users/update.js
import connectDB from "../../../lib/mongodb";
import User from "../../../models/User";

export default async function handler(req, res) {
  if (req.method !== "PUT") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  await connectDB();
  const { email, address, phoneNumber } = req.body;

  try {
    const user = await User.findOneAndUpdate(
      { email },
      { address, phoneNumber },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({ message: "Updated successfully", user });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Update failed" });
  }
}
