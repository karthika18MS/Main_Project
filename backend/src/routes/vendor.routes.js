import express from "express";
import {
  getVendors,
  getVendorById,
  updateVendorProfile,
  acceptBooking,
  cancelBooking,
  getVendorProfile,
  getVendorByCategory,
  insertVendorPolicies,
  addVendorReview
} from "../controllers/vendor.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";
import roleMiddleware from "../middlewares/role.middleware.js";
import { getBookingByVendorId,getAllVendorBooking,getVendorStats } from "../controllers/vendor.controller.js";
import { getNotifications } from "../controllers/notification.controller.js";
import multer from "multer";

const upload = multer({ dest: "uploads/" });

const router = express.Router();

router.get("/", getVendors);
router.get("/:id",getVendorById);
router.post("/booking", 
  authMiddleware,
  getBookingByVendorId
);

router.post("/vendorBooking", 
  authMiddleware,
  getAllVendorBooking
);

router.post("/stats",
  authMiddleware,
  getVendorStats
);


router.post("/acceptBooking", 
  authMiddleware,
  acceptBooking
);

router.post("/getNotifications", 
  authMiddleware,
  getNotifications
);


router.post("/cancelBooking", 
  authMiddleware,
  cancelBooking
);

router.get("/vendors/:vendorId",
   authMiddleware,
  getVendorProfile);

router.put(
  "/vendors/:vendorId",
  upload.fields([
    { name: "profilePic", maxCount: 1 },
    { name: "gallery", maxCount: 10 }
  ]),
  updateVendorProfile
);

router.post("/by-category", 
  authMiddleware,
  getVendorByCategory
);


router.put("/insert-policies", insertVendorPolicies);

router.post("/addReviews", authMiddleware, addVendorReview);

export default router;
