import express from "express";
import {
  createBooking,
  getUserBookings,
  updateBookingStatus,
} from "../controllers/booking.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";
import roleMiddleware from "../middlewares/role.middleware.js";

const router = express.Router();

router.post(
  "/",
  authMiddleware,
  roleMiddleware("user"),
  createBooking
);

router.post(
  "/my-bookings",
  authMiddleware,
  roleMiddleware("user"),
  getUserBookings
);

router.put(
  "/:id/status",
  authMiddleware,
  roleMiddleware("vendor", "admin"),
  updateBookingStatus
);

export default router;
