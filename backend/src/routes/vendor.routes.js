import express from "express";
import {
  getVendors,
  getVendorById,
  updateVendorProfile,
  acceptBooking,
  cancelBooking,
} from "../controllers/vendor.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";
import roleMiddleware from "../middlewares/role.middleware.js";
import { getBookingByVendorId } from "../controllers/vendor.controller.js";
import { getNotifications } from "../controllers/notification.controller.js";

const router = express.Router();

router.get("/", getVendors);
router.get("/:id",getVendorById);
router.post("/booking", 
  authMiddleware,
  getBookingByVendorId
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

router.put(
  "/profile",
  authMiddleware,
  roleMiddleware("vendor"),
  updateVendorProfile
);

export default router;
