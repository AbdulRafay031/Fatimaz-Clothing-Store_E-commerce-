import connectDB from "../../../lib/mongodb";
import User from "../../../models/User";
import bcrypt from "bcryptjs";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    await connectDB();

    const { fullname, email, password, phoneNumber, address } = req.body;

    // Validate input fields
    if (!fullname || !email || !password) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Create a new user
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      fullname,
      email,
      password: hashedPassword,
      phoneNumber,
      address,
    });

    await newUser.save();
    return res.status(201).json({ message: "User registered successfully" });

  } catch (error) {
    console.error("Server Error:", error);
    return res.status(500).json({ message: "Server error", error: error.message });
  }
}
