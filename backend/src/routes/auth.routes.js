import express from "express";
import { register, login,saveProfile,getUserProfile } from "../controllers/auth.controller.js";
import rateLimiter from "../middlewares/rateLimiter.middleware.js";
import { bulkRegisterVendors } from "../controllers/bulkInsert.js";

const router = express.Router();

router.post("/register", rateLimiter, register);
router.post("/login", rateLimiter, login);

router.post("/saveProfile", rateLimiter, saveProfile);

router.post("/profile", rateLimiter, getUserProfile);

router.post("/bulk-register-vendors", bulkRegisterVendors);

export default router;

