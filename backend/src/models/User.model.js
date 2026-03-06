import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String },
    phone: String,
    role: {
      type: String,
      enum: ["user", "vendor", "admin"],
      default: "user",
    },
    weddingDate:{ type: Date},
    weddingType:{ type: String},
    budget: { type: Number},
    location: { type: String}
  },
  { timestamps: true }
);

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
