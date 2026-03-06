import User from "../models/user.model.js";
import Vendor from "../models/vendor-model.js";
import Booking from "../models/booking.model.js";

export const getDashboardStats = async (req, res) => {
  const users = await User.countDocuments();
  const vendors = await Vendor.countDocuments();
  const bookings = await Booking.countDocuments();

  res.json({ users, vendors, bookings });
};
