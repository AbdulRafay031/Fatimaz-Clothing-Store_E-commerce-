// models/ReturnRequest.js
import mongoose from "mongoose";

const ReturnRequestSchema = new mongoose.Schema(
  {
    orderId: String,
    product: Object,
    reason: String,
    status: { type: String, default: "pending" },
  },
  { timestamps: true }
);

export default mongoose.models.ReturnRequest ||
  mongoose.model("ReturnRequest", ReturnRequestSchema);
