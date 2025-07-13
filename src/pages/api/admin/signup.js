// pages/api/admin/signup.js
import connectDB from '../../../lib/mongodb';
import Admin from '../../../models/Admin';
import bcrypt from 'bcryptjs';

export default async function handler(req, res) {
  await connectDB();

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { username, password } = req.body;

  // Check if an admin already exists
  const existingAdmin = await Admin.findOne({});
  if (existingAdmin) {
    return res.status(403).json({ message: 'Admin account already exists' });
  }

  // Create hashed password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create new admin
  const admin = new Admin({ username, password: hashedPassword });
  await admin.save();

  return res.status(201).json({ message: 'Admin created successfully' });
}
