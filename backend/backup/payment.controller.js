import { getRazorpayInstance } from "../config/payment.config.js";
import paymentSchema from "../models/Payment.model.js"
import Booking from "../models/Booking.model.js";

export const createPaymentOrder = async (req, res) => {
  try {
   // const razorpay = getRazorpayInstance();

    // const options = {
    //   amount: req.body.amount * 100,
    //   currency: "INR",
    //   receipt: `receipt_${Date.now()}`,
    // };

    // const order = await razorpay.orders.create(options);

    const req_data = req.body.invoice

    console.log("reqqq bodyyyy"+req.body)

     const booking = await Booking.findOne({
        user: req_data.user_id,
        category: req_data.category
      }); 


      const vendor_id = booking.vendorId

      req_data.vendor_id = vendor_id
    
    const payment = await paymentSchema.create({
        ...req_data
      });

      if (payment) {

          await Booking.findByIdAndUpdate(
            booking._id,
            {
              $set: {
                paymentStatus: "Paid",
                amount: req_data.amount,
                status:"completed"
              }
            },
            { new: true }
          );

      }

    res.status(200).json(payment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};


export const generateInvoice = async (req, res) => {
  try { 

    const bookingId = req.body.bookingId
   
    const invoice = await paymentSchema.findOne({
        bookingId: bookingId
      }); 

      res.status(200).json(invoice);
  }
  catch (error) {
    console.error(error); 
    res.status(500).json({ message: error.message });
  }
};
