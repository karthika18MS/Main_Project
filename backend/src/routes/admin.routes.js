import express from "express";
import { 
  getDashboardStats, 
  getAdminProfile, 
  updateAdminProfile,
  getBookingDetails,
  getRevenueDetails,
  getVendorDetails

} from "../controllers/admin.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";
import roleMiddleware from "../middlewares/role.middleware.js";
import upload from "../middlewares/upload.middleware.js";

const router = express.Router();

router.get(
  "/dashboard",
  authMiddleware,
  roleMiddleware("admin"),
  getDashboardStats
);

router.get(
  "/profile",
  authMiddleware,
  roleMiddleware("admin"),
  getAdminProfile
);

router.put(
  "/profile",
  authMiddleware,
  roleMiddleware("admin"),
  upload.single("profilePic"),
  updateAdminProfile
);


router.get(
  "/bookingByMonth",
  authMiddleware,
  getBookingDetails
);



router.get(
  "/revenueByMonth",
  authMiddleware,
  getRevenueDetails
);



router.get(
  "/vendorByCategory",
  authMiddleware,
  getVendorDetails
);

export default router;
