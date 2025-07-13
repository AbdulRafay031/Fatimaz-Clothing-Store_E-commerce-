import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  fullname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  address: { type: String, required: true },
  joinedCommunity: { type: Boolean, default: false },
});

// ✅ Prevent model overwrite error
export default mongoose.models.User || mongoose.model("User", UserSchema);
