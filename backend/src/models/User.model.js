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
    bride : String,
    groom : String,
    address : String,
    weddingTime:String,
    weddingDate:{ type: Date},
    weddingType:{ type: String},
    budget: { type: Number},
    remainingBudget: { type: Number},
    location: { type: String},
    profilePic: String
  },
  { timestamps: true }
);

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
