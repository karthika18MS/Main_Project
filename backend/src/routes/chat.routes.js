import express from "express";
import {
  getMessages,
  saveMessage,
  fetchNotifications,
  fetchUserChats,
  markAsRead,
  fetchUserNotificationCount
} from "../controllers/chat.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";


const router = express.Router();

//router.get("/:roomId", authMiddleware, getMessages);
router.post("/messages", authMiddleware, getMessages);
router.post("/", authMiddleware, saveMessage);
router.post("/notifications", authMiddleware, fetchNotifications);
router.post("/fetchUserChats", authMiddleware, fetchUserChats);
router.post("/markAsRead", authMiddleware, markAsRead);
router.post("/userNotificationCount", authMiddleware, fetchUserNotificationCount);


export default router;
