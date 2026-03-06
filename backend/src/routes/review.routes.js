import express from "express";
import {
  addReview,
  getVendorReviews,
} from "../controllers/review.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/", authMiddleware, addReview);
router.get("/:vendorId", getVendorReviews);

export default router;
