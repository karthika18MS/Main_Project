import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    vendor: { type: mongoose.Schema.Types.ObjectId, ref: "Vendor" },
    service: { type: mongoose.Schema.Types.ObjectId, ref: "Service" },
    bookingDate: Date,
    vendorName: String,
    vendorId: String,
    category : String,
    vendorPackage:String,
    price : Number,
    client: String,
    paymentStatus:String,
    eventName : String,
    amount:Number,
    status: {
      type: String,
      enum: ["pending", "accepted", "rejected", "completed"],
      default: "pending",
    },
    totalAmount: Number,
  },
  { timestamps: true }
);

export default mongoose.model("Booking", bookingSchema);
