import nodemailer from "nodemailer";
import { getSession } from "next-auth/react";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end("Method Not Allowed");

  const { first_name, last_name, email, phone, message } = req.body;

  try {
    const session = await getSession({ req });
    const userEmail = session?.user?.email || email;

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
         user: process.env.ADMIN_EMAIL,
        pass: process.env.ADMIN_EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: `"Fatimaz Contact Form" <${process.env.ADMIN_EMAIL}>`,
      to: process.env.ADMIN_EMAIL,
      subject: `New Contact Message from ${first_name} ${last_name}`,
      html: `
        <h2>Contact Message from Fatimaz</h2>
        <p><strong>Name:</strong> ${first_name} ${last_name}</p>
        <p><strong>Form Email:</strong> ${email}</p>
        <p><strong>Login Email:</strong> ${userEmail}</p>
        <p><strong>Phone:</strong> ${phone || "N/A"}</p>
        <p><strong>Message:</strong><br/>${message}</p>
      `,
    };

    await transporter.sendMail(mailOptions);

    return res.status(200).json({ success: true, message: "Message sent successfully." });
  } catch (err) {
    console.error("Nodemailer error:", err);
    return res.status(500).json({ success: false, message: "Failed to send message." });
  }
}
