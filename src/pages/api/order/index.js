import connectDB from "../../../lib/mongodb";
import User from "../../../models/User";
import nodemailer from "nodemailer";
import Order from "../../../models/Order";

export default async function handler(req, res) {
  if (req.method === "POST") {
    await connectDB();

    const { cartItems, totalAmount, userEmail, deliveryOption } = req.body;

    if (!userEmail) {
      return res.status(400).json({ error: "User email is required" });
    }

    // 🔍 Get user from DB using email
    const customer = await User.findOne({ email: userEmail }).lean();

    if (!customer) {
      return res.status(404).json({ error: "Customer not found" });
    }

    // 🛒 Build Order HTML
    const orderHTML = cartItems
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

    const deliveryText =
      deliveryOption === "fast"
        ? "Fast Delivery (2-3 days)"
        : "Standard Delivery (5-7 days)";

    // 📦 Customer Info Section
    const customerInfo = `
      <h3>Customer Info</h3>
      <p><strong>Name:</strong> ${customer.fullname}</p>
      <p><strong>Email:</strong> ${customer.email}</p>
      <p><strong>Phone:</strong> ${customer.phoneNumber}</p>
      <p><strong>Address:</strong> ${customer.address}</p>
    `;

    // 📧 Email Body
    const emailContent = `
      <h2>New Order Received</h2>
      ${orderHTML}
      <h3>Total: Rs ${totalAmount}</h3>
      <h3>Delivery Option: ${deliveryText}</h3>
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
      subject: "New Order Placed",
      html: emailContent,
    });

    // api/order/index.js
    await Order.create({
      cartItems,
      totalAmount,
      userEmail,
      deliveryOption,
      status: "pending",
      customer: {
        name: customer.fullname,
        email: customer.email,
        phone: customer.phoneNumber,
        address: customer.address,
      },
    });

    return res.status(200).json({ message: "Order email sent successfully!" });
  } else {
    return res.status(405).json({ message: "Method Not Allowed" });
  }
}
