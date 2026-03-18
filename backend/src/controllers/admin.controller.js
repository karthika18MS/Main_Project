import User from "../models/User.model.js";
import Vendor from "../models/vendor-model.js";
import Booking from "../models/Booking.model.js";

export const getDashboardStats = async (req, res) => {
  try {
    const users = await User.countDocuments();
    const vendors = await Vendor.countDocuments();
    const bookings = await Booking.countDocuments();

    // Calculate total revenue
    const revenueAgg = await Booking.aggregate([
      { $match: { status: { $in: ["completed", "accepted"] } } }, // Assuming accepted/completed bookings contribute to revenue
      { $group: { _id: null, totalRevenue: { $sum: "$amount" } } }
    ]);
    const totalRevenue = revenueAgg.length > 0 ? revenueAgg[0].totalRevenue : 0;

    // Get recent 5 bookings
    const recentBookings = await Booking.find()
      .populate("user", "name email")
      .populate("vendor", "name")
      .sort({ createdAt: -1 })
      .limit(5);

    // Get top performing vendors by booking count
    const topVendorsAgg = await Booking.aggregate([
      { $group: { _id: "$vendorName", bookings: { $sum: 1 } } },
      { $sort: { bookings: -1 } },
      { $limit: 4 },
      { $project: { _id: 0, name: "$_id", bookings: 1 } }
    ]);

    // Format top vendors list properly if name is missing
    const topVendors = topVendorsAgg.filter(v => v.name);

    res.json({
      users,
      vendors,
      bookings,
      totalRevenue,
      recentBookings,
      topVendors
    });
  } catch (error) {
    console.error("Error fetching dashboard stats:", error);
    res.status(500).json({ error: error.message });
  }
};

export const getAdminProfile = async (req, res) => {
  try {
    const admin = await User.findById(req.user.id).select("-password");
    if (!admin) {
      return res.status(404).json({ error: "Admin not found" });
    }
    res.json(admin);
  } catch (error) {
    console.error("Error fetching admin profile:", error);
    res.status(500).json({ error: error.message });
  }
};

export const updateAdminProfile = async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;
    const admin = await User.findById(req.user.id);

    if (!admin) {
      return res.status(404).json({ error: "Admin not found" });
    }

    if (name) admin.name = name;
    if (email) admin.email = email;
    if (phone) admin.phone = phone;

    // In a real app, hash the password if updated
    if (password) admin.password = password;

    if (req.file) {
      admin.profilePic = req.file.path;
    }

    await admin.save();
    res.json({ message: "Profile updated successfully", admin });
  } catch (error) {
    console.error("Error updating admin profile:", error);
    res.status(500).json({ error: error.message });
  }
};



export const getBookingDetails = async (req, res) => {
  try {

        const bookings = await Booking.aggregate([
          {
            $group: {
              _id: { $month: "$bookingDate" },
              bookings: { $sum: 1 }
            }
          },
          { $sort: { _id: 1 } }
        ]);

        const months = [
          "Jan","Feb","Mar","Apr","May","Jun",
          "Jul","Aug","Sep","Oct","Nov","Dec"
        ];

        const formatted = bookings.map(item => ({
          month: months[item._id - 1],
          bookings: item.bookings
        }));

        res.json(formatted);
        
  } catch (error) {
    console.error("Error fetching admin profile:", error);
    res.status(500).json({ error: error.message });
  }
};


export const getRevenueDetails = async (req, res) => {
  try {

          const revenueData = await Booking.aggregate([
            {
              $group: {
                _id: { $month: "$bookingDate" },
                revenue: { $sum: "$amount" } 
              }
            },
            { $sort: { _id: 1 } }
          ]);

          const months = [
            "Jan","Feb","Mar","Apr","May","Jun",
            "Jul","Aug","Sep","Oct","Nov","Dec"
          ];

          const formatted = revenueData.map(item => ({
            month: months[item._id - 1],
            revenue: item.revenue
          }));

          res.json(formatted);
        
  } catch (error) {
    console.error("Error fetching admin profile:", error);
    res.status(500).json({ error: error.message });
  }
};


export const getVendorDetails = async (req, res) => {
  try {

        const vendorPerformance = await Booking.aggregate([
          {
            $group: {
              _id: "$category",
              totalBookings: { $sum: 1 }
            }
          },
          {
            $project: {
              _id: 0,
              category: "$_id",
              totalBookings: 1
            }
          },
          { $sort: { totalBookings: -1 } } 
        ]);

        res.json(vendorPerformance);
        
  } catch (error) {
    console.error("Error fetching admin profile:", error);
    res.status(500).json({ error: error.message });
  }
};