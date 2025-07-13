import nodemailer from "nodemailer";
import connectDB from "../../../lib/mongodb";
import ReturnRequest from "../../../models/ReturnRequest";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end("Method Not Allowed");

  await connectDB();
  const session = await getServerSession(req, res, authOptions);

  if (!session || !session.user) {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }

  const { orderId, product, reason } = req.body;

  try {
    const newReturn = await ReturnRequest.create({
      orderId,
      product,
      reason,
      user: {
        name: session.user.name,
        email: session.user.email,
      },
      status: "pending",
    });

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.ADMIN_EMAIL,
        pass: process.env.ADMIN_EMAIL_PASS,
      },
    });

    const mailHtml = `
      <h2>New Return Request</h2>

      <h3>Customer Info:</h3>
      <p><strong>Name:</strong> ${session.user.name}</p>
      <p><strong>Email:</strong> ${session.user.email}</p>

      <h3>Product Info:</h3>
      <img src="${product.image}" alt="${product.name}" width="150" style="border-radius:8px;margin-bottom:8px;" />
      <p><strong>Name:</strong> ${product.name}</p>
      <p><strong>Color:</strong> ${product.color}</p>
      <p><strong>Size:</strong> ${product.size}</p>
      <p><strong>Quantity:</strong> ${product.quantity}</p>
      <p><strong>Price:</strong> Rs ${product.price}</p>

      <h3>Order Info:</h3>
      <p><strong>Order ID:</strong> ${orderId}</p>

      <h3>Reason for Return:</h3>
      <p>${reason}</p>
    `;

    await transporter.sendMail({
      from: process.env.ADMIN_EMAIL,
      to: process.env.ADMIN_EMAIL,
      subject: "Return Request Submitted",
      html: mailHtml,
    });

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error("Return Error:", err);
    return res.status(500).json({ success: false });
  }
}
