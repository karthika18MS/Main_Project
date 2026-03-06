import express from "express";
import { register, login,saveProfile,getUserProfile } from "../controllers/auth.controller.js";
import rateLimiter from "../middlewares/rateLimiter.middleware.js";

const router = express.Router();

router.post("/register", rateLimiter, register);
router.post("/login", rateLimiter, login);

router.post("/saveProfile", rateLimiter, saveProfile);

router.post("/profile", rateLimiter, getUserProfile);

export default router;
