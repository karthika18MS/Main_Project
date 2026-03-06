import mongoose from "mongoose";

const vendorSchema = new mongoose.Schema(
  {
    name: String,
    category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
    location: String,
    description: String,
    services: [{ type: mongoose.Schema.Types.ObjectId, ref: "Service" }],
    rating: { type: Number, default: 0 },
    priceRange: String,
    images: [String],
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

//export default mongoose.model("Vendor", vendorSchema);
