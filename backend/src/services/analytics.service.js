/*import User from "../models/User.model.js";
import Vendor from "../models/vendor-model.js";
import Booking from "../models/Booking.model.js";
import Payment from "../models/Payment.model.js";

export const getPlatformAnalytics = async () => {
  const totalUsers = await User.countDocuments();
  const totalVendors = await Vendor.countDocuments();
  const totalBookings = await Booking.countDocuments();
  const totalRevenue = await Payment.aggregate([
    { $match: { paymentStatus: "success" } },
    { $group: { _id: null, sum: { $sum: "$amount" } } },
  ]);

  return {
    totalUsers,
    totalVendors,
    totalBookings,
    totalRevenue: totalRevenue[0]?.sum || 0,
  };
};
*/