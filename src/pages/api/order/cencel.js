import connectDB from "../../../lib/mongodb";
import Order from "../../../models/Order";
import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method !== "PUT") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  await connectDB();

  const { id } = req.body;

  try {
    const order = await Order.findById(id);
    if (!order) return res.status(404).json({ error: "Order not found" });

    order.status = "cancelled";
    await order.save();

    // 🛒 Build Product HTML
    const productHTML = order.cartItems
      .map(
        (item) => `
      <div style="margin-bottom: 20px; border: 1px solid #ddd; padding: 10px; border-radius: 8px;">
        <img src="${item.image}" alt="${item.name}" style="width: 100px; height: 100px; object-fit: cover; border-radius: 4px; margin-bottom: 10px;" />
        <p><strong>Name:</strong> ${item.name}</p>
        <p><strong>Price:</strong> Rs ${item.price}</p>
        <p><strong>Quantity:</strong> ${item.quantity}</p>
        <p><strong>Selected Size:</strong> ${item.size}</p>
        <p><strong>Selected Color:</strong> ${item.color}</p>
      </div>
    `
      )
      .join("");

    // 📦 Customer Info
    const customerInfo = `
      <h3>Customer Info</h3>
      <p><strong>Name:</strong> ${order.customer.name}</p>
      <p><strong>Email:</strong> ${order.customer.email}</p>
      <p><strong>Phone:</strong> ${order.customer.phone}</p>
      <p><strong>Address:</strong> ${order.customer.address}</p>
      <p><strong>Status:</strong> Cancelled</p>
    `;

    const emailContent = `
      <h2 style="color: red;">Order Cancelled</h2>
      ${productHTML}
      <h3>Total: Rs ${order.totalAmount}</h3>
      <hr/>
      ${customerInfo}
    `;

    // ✉️ Send Email
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.ADMIN_EMAIL,
        pass: process.env.ADMIN_EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"E-commerce Store" <${process.env.ADMIN_EMAIL}>`,
      to: process.env.ADMIN_EMAIL,
      subject: "Order Cancelled",
      html: emailContent,
    });

    return res.status(200).json({ message: "Order cancelled and email sent" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Cancellation failed" });
  }
}
