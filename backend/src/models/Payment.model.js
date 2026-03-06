import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
  {
    booking: { type: mongoose.Schema.Types.ObjectId, ref: "Booking" },
    amount: Number,
    invoiceId:Number,
    paymentMethod: String,
    packageName:String,
    category:String,
    vendorName:String,
    user_id:String,
    vendor_id:String,
    bookingId:String,
    bookingDate:String,
    paymentStatus: {
      type: String,
      enum: ["pending", "success", "failed"],
      default: "success",
    },
    transactionId: String,
  },
  { timestamps: true }
);

export default mongoose.model("Payment", paymentSchema);
