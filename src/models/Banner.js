// models/Banner.js
import mongoose from "mongoose";

const bannerSchema = new mongoose.Schema({
  images: {
    type: [String], // Array of image URLs
    required: true,
    validate: [arrayLimit, '{PATH} must have 4 images']
  },
}, { timestamps: true });

function arrayLimit(val) {
  return val.length === 4;
}

export default mongoose.models.Banner || mongoose.model("Banner", bannerSchema);
