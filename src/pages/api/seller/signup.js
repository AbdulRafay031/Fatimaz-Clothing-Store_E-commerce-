
import bcrypt from "bcryptjs";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { name, email, password, phone, address, shopname, category } = req.body;

    try {
      await connectMongoDB();

      // Check if the seller already exists
      const existingSeller = await Seller.findOne({ email });
      if (existingSeller) {
        return res.status(400).json({ message: "Seller already exists" });
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create new seller
      const newSeller = new Seller({
        name,
        email,
        password: hashedPassword,
        phone,
        address,
        shopname,
        category,
      });

      // Save seller to the database
      await newSeller.save();

      return res.status(201).json({ message: "Seller registered successfully" });
    } catch (error) {
      return res.status(500).json({ message: "Server error" });
    }
  } else {
    return res.status(405).json({ message: "Method not allowed" });
  }
}
