// /pages/api/order/handle-return.js
import connectDB from "../../../lib/mongodb";
import ReturnRequest from "../../../models/ReturnRequest";
import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method !== "PUT") {
    return res.status(405).end("Method Not Allowed");
  }

  await connectDB();

  const { returnId, action } = req.body;

  if (!returnId || !["accepted", "declined", "confirmed"].includes(action)) {
    return res.status(400).json({ success: false, message: "Invalid input" });
  }

  try {
    const request = await ReturnRequest.findById(returnId);
    if (!request) {
      return res
        .status(404)
        .json({ success: false, message: "Return request not found" });
    }

    request.status = action;
    await request.save();

    // Send email to user (optional enhancement)
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.ADMIN_EMAIL,
        pass: process.env.ADMIN_EMAIL_PASS,
      },
    });

    let subject = "Return Request Update";
    let body = "";

    if (action === "accepted") {
      body = `<p>Your return request for product <strong>${request.product.name}</strong> has been <strong>ACCEPTED</strong>. Please note Rs 200 will be charged as return service.</p>`;
    } else if (action === "declined") {
      body = `<p>Your return request for product <strong>${request.product.name}</strong> has been <strong>DECLINED</strong>.</p>`;
    } else if (action === "confirmed") {
      body = `<p>Your return for <strong>${request.product.name}</strong> has been successfully <strong>CONFIRMED</strong>.</p>`;
    }

    await transporter.sendMail({
      from: process.env.ADMIN_EMAIL,
      to: process.env.ADMIN_EMAIL, // Can be updated to send to user email if stored
      subject,
      html: body,
    });

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("Return status update error:", error);
    return res.status(500).json({ success: false });
  }
}
