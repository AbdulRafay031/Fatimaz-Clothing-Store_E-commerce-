import connectMongoDB from "@/lib/connectmongodb";
import Seller from "@/models/seller";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret_key";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { email, password } = req.body;

    try {
      await connectMongoDB();

      // Check if the seller exists
      const seller = await Seller.findOne({ email });
      if (!seller) {
        return res.status(400).json({ message: "Invalid email or password" });
      }

      // Compare password
      const isMatch = await bcrypt.compare(password, seller.password);
      if (!isMatch) {
        return res.status(400).json({ message: "Invalid email or password" });
      }

      // Create a JWT token
      const token = jwt.sign({ sellerId: seller._id }, JWT_SECRET, {
        expiresIn: "1h", // Token expires in 1 hour
      });

      // Authentication successful, return token and seller info
      return res.status(200).json({
        message: "Login successful",
        token,  // Send JWT token
        seller: {
          id: seller._id,
          name: seller.name,
          email: seller.email,
          shopname: seller.shopname,
        },
      });
    } catch (error) {
      return res.status(500).json({ message: "Server error" });
    }
  } else {
    return res.status(405).json({ message: "Method not allowed" });
  }
}
