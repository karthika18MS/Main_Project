import { json } from "express";
import Booking from "../models/Booking.model.js";
import User from "../models/User.model.js"
import {sendEmail} from "../services/email.service.js"



const findBookingsByUser = async (userId) => {
  console.log(userId)
  return await Booking.find({ user: userId });
};

export const getUserBookings = async (req, res) => {
  console.log("Karthikaaaaaa"+req)
  console.log("Karthikaaaaaa"+req.body.userId)
  const bookings = await Booking.find({ user: req.body.userId });
  res.json(bookings);
};


export const createBooking = async (req, res) => {


  const req_data = req.body

  const existingBooking = await Booking.findOne({
    user: req.user._id,
    category: req.body.category
  });

  console.log("Existing booking:", existingBooking)

  if (existingBooking) {
    return res.status(400).json({
      message: "A booking already exists for this category"
    });
  }

   const user = await User.findOne({
    _id: req.user._id
  });

  if (user.remainingBudget !== undefined && req_data.price > user.remainingBudget) {
    return res.status(400).json({
      message: `Booking price exceeds your remaining budget (₹${user.remainingBudget})`
    });
  }


  const booking = await Booking.create({
    ...req_data,
    user: req.user._id,
    client: user.name,
    paymentStatus: "pending"  
  });

  if(booking)
  { 
    const to = "karthikams380@gmail.com"
    const subject = "Booked Successfully"
    const html = `
  <!DOCTYPE html>
  <html>
  <head>
    <style>
      body{
        font-family: Arial, sans-serif;
        background-color:#f4f6f8;
        padding:20px;
      }
      .container{
        max-width:600px;
        margin:auto;
        background:white;
        border-radius:10px;
        overflow:hidden;
        box-shadow:0 2px 10px rgba(0,0,0,0.1);
      }
      .header{
        background:#ff6b81;
        color:white;
        text-align:center;
        padding:20px;
        font-size:24px;
        font-weight:bold;
      }
      .content{
        padding:30px;
        color:#333;
        line-height:1.6;
      }
      .button{
        display:inline-block;
        padding:12px 20px;
        background:#ff6b81;
        color:white;
        text-decoration:none;
        border-radius:5px;
        margin-top:15px;
      }
      .footer{
        text-align:center;
        font-size:12px;
        color:#888;
        padding:15px;
        background:#fafafa;
      }
    </style>
  </head>

  <body>
    <div class="container">

      <div class="header">
        WED AURA 💍
      </div>

      <div class="content">
        <h2>Booking Submitted 🎉</h2>

        <p>Hello,</p>

        <p>Your vendor booking has been <strong>successfully Submitted</strong>.</p>

        <p>Thank you for choosing <strong>WED AURA</strong> for planning your special day.</p>

        <p>Our vendors will contact you shortly with further details.</p>

        <a href="http://localhost:3000/user-dashboard" class="button">
          View Booking
        </a>

        <p style="margin-top:25px;">
          Wishing you a beautiful wedding journey 💕
        </p>
      </div>

      <div class="footer">
        © 2026 WED AURA | AI Powered Wedding Planning Platform
      </div>

    </div>
  </body>
  </html>
  `
    sendEmail(to,subject,html)
  }

  res.status(201).json(booking);
};

export const updateBookingStatus = async (req, res) => {
  const booking = await Booking.findByIdAndUpdate(
    req.params.id,
    { status: req.body.status },
    { new: true }
  );  
  res.json(booking);
};
