import Razorpay from "razorpay";

let razorpayInstance;

export const getRazorpayInstance = () => {
  if (!razorpayInstance) {
    if (
      !process.env.RAZORPAY_KEY_ID ||
      !process.env.RAZORPAY_KEY_SECRET
    ) {
      throw new Error("❌ Razorpay keys missing in .env");
    }

    razorpayInstance = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });
  }

  return razorpayInstance;
};
