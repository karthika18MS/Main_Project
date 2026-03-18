import express from "express";
import {
  predictBudget,
  predictVendor,
} from "../controllers/ai.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/budget", authMiddleware, predictBudget);
router.post("/predict-vendor", authMiddleware, predictVendor);

export default router;
