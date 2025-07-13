// pages/api/banner/upload.js
import { IncomingForm } from "formidable";
import fs from "fs";
import path from "path";
import cloudinary from "../../../lib/cloudinary";
import connectDB from "../../../lib/mongodb";
import Banner from "../../../models/Banner";

// Disable default body parser
export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  await connectDB();

  const form = new IncomingForm({ multiples: true });

  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.error("Form parse error:", err);
      return res.status(500).json({ error: "Form parsing failed" });
    }

    const fileArray = Array.isArray(files.images) ? files.images : [files.images];
    if (fileArray.length !== 4) {
      return res.status(400).json({ error: "Please upload exactly 4 images" });
    }

    try {
      const imageUrls = await Promise.all(
        fileArray.map((file) =>
          cloudinary.uploader.upload(file.filepath, {
            folder: "banners",
          })
        )
      );

      const urls = imageUrls.map((res) => res.secure_url);

      await Banner.deleteMany({});
      const banner = new Banner({ images: urls });
      await banner.save();

      return res.status(201).json(banner);
    } catch (uploadErr) {
      console.error("Upload error:", uploadErr);
      return res.status(500).json({ error: "Upload to Cloudinary failed" });
    }
  });
}
