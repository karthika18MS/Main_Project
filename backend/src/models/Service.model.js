import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema(
  {
    vendor: { type: mongoose.Schema.Types.ObjectId, ref: "Vendor" },
    title: String,
    description: String,
    price: Number,
    duration: String,
  },
  { timestamps: true }
);

export default mongoose.model("Service", serviceSchema);
