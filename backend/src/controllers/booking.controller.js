import { json } from "express";
import Booking from "../models/booking.model.js";
import User from "../models/User.model.js"



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

  const booking = await Booking.create({
    ...req_data,
    user: req.user._id,
    client: user.name,
    paymentStatus: "pending"  
  });

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
