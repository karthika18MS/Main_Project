import razorpay from "../config/payment.config.js";
import Payment from "../models/Payment.model.js";

export const createOrder = async ({ bookingId, amount }) => {
  const order = await razorpay.orders.create({
    amount: amount * 100,
    currency: "INR",
    receipt: `receipt_${bookingId}`,
  });

  return order;
};

export const savePayment = async ({
  booking,
  amount,
  transactionId,
  status,
}) => {
  return await Payment.create({
    booking,
    amount,
    transactionId,
    paymentStatus: status,
  });
};
