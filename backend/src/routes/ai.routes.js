import express from "express";
import {
  predictBudget,
  recommendVendors,
} from "../controllers/ai.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/budget", authMiddleware, predictBudget);
router.post("/recommend", authMiddleware, recommendVendors);

export default router;
