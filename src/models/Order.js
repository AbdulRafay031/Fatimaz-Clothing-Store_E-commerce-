import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  cartItems: [
    {
      name: String,
      price: Number,
      quantity: Number,
      image: String,
      size: String,
      color: String,
      _id: String,
    },
  ],
  totalAmount: Number,
  userEmail: String,
  deliveryOption: {
    type: String,
    enum: ["fast", "standard"],
    required: true,
  },
  customer: {
    name: String,
    email: String,
    phone: String,
    address: String,
  },
  status: {
    type: String,
    enum: ["pending", "delivered", "cancelled"],
    default: "pending",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Order || mongoose.model("Order", orderSchema);
