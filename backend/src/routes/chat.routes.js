import express from "express";
import {
  getMessages,
  saveMessage,
  fetchNotifications
} from "../controllers/chat.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const router = express.Router();

//router.get("/:roomId", authMiddleware, getMessages);
router.post("/messages", authMiddleware, getMessages);
router.post("/", authMiddleware, saveMessage);
router.post("/notifications", authMiddleware, fetchNotifications);


export default router;
