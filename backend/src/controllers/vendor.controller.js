// import Booking from "../../../frontend/src/pages/Booking.jsx";
import Vendor from "../models/vendor-model.js"
import Booking from "../models/booking.model.js";

export const getVendors = async (req, res) => {
  const vendors = await Vendor.find();
  res.json(vendors);
};

export const getVendorById = async (req, res) => {
  const vendor = await Vendor.findById(req.params.id);
  res.json(vendor);
};

export const getBookingByVendorId = async (req, res) => {
  console.log(req.body.vendorId)
  const booking = await Booking.find({
  vendorId: req.body.vendorId,
  status: "pending"
});
  res.json(booking);
};

export const acceptBooking = async (req, res) => {
   const booking = await Booking.findByIdAndUpdate(
      req.body.bookingId,
      { status: "accepted" },
      { new: true } 
    );
  res.json(booking);
};

export const cancelBooking = async (req, res) => {
  const booking = await Booking.findByIdAndUpdate(
      req.body.bookingId,
      { status: "cancelled" },
      { new: true } 
  );
  res.json(booking);
};

export const updateVendorProfile = async (req, res) => {
  const vendor = await Vendor.findByIdAndUpdate(
    req.user.id,
    req.body,
    { new: true }
  );
  res.json(vendor);
};
