import mongoose from "mongoose";

const chatSchema = new mongoose.Schema(
  {
    roomId: String,
    sender: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    vendorId: String,
    userId: String,
    message: [
      {
        role: {
          type: String,
          enum: ["user", "vendor"],
        },
        text: {
          type: String,
        },
        username :String,
        timestamp: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    isReadByVendor: {
      type: Boolean,
      default: true,
    },
    isReadByUser: {
      type: Boolean,
      default: true,
    }
  },
  { timestamps: true }
);

export default mongoose.model("Chat", chatSchema);
