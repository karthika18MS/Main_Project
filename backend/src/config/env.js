import dotenv from "dotenv";

const loadEnv = () => {
  dotenv.config();

  if (!process.env.RAZORPAY_KEY_ID) {
    console.warn("⚠️ Razorpay keys not found in .env");
  }
};

export default loadEnv;
