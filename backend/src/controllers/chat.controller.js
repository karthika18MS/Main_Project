import mongoose from "mongoose";
import fs from "fs";
import Chat from "../models/Chat.model.js";
import Vendor from "../models/vendor-model.js";
import User from "../models/User.model.js";

export const getMessages = async (req, res) => {
  try {
    let { vendorId, userId } = req.body;

    // Resolve business vendorId if needed
    const vendorDoc = await Vendor.findOne({
      $or: [{ vendorId: vendorId }, { _id: vendorId }]
    });
    if (vendorDoc) {
      vendorId = vendorDoc.vendorId;
    }

    const chat = await Chat.findOne({ vendorId, userId });

    if (!chat) {
      return res.status(200).json([]);
    }

    res.status(200).json(chat.message);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export const saveMessage = async (req, res) => {
  try {
    let { vendorId, userId, text, role, username } = req.body;

    // Resolve business vendorId
    const vendorDoc = await Vendor.findOne({
      $or: [{ vendorId: vendorId }, { _id: vendorId }]
    });
    if (vendorDoc) {
      vendorId = vendorDoc.vendorId;
    }

    let chat = await Chat.findOne({ vendorId, userId });

    const newMessage = {
      role,
      text,
      username,
      timestamp: new Date(),
    };

    if (!chat) {
      chat = await Chat.create({
        vendorId,
        userId,
        message: [newMessage],
        isReadByVendor: role === "vendor",
        isReadByUser: role === "user",
      });
    } else {
      chat.message.push(newMessage);
      if (role === "user") {
        chat.isReadByVendor = false;
      } else if (role === "vendor") {
        chat.isReadByUser = false;
      }
      await chat.save();
    }

    res.status(201).json(chat);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export const markAsRead = async (req, res) => {
  try {
    const { vendorId, userId, role } = req.body;
    
    let targetVendorId = vendorId;
    if (role === 'vendor' || !vendorId) {
       // Resolve vendorId if coming from vendor side or if we only have one ID
       const vendorDoc = await Vendor.findOne({
         $or: [{ vendorId }, { _id: vendorId }]
       });
       targetVendorId = vendorDoc?.vendorId || vendorId;
    }
    
    const update = {};
    if (role === 'user') {
      update.isReadByUser = true;
    } else {
      update.isReadByVendor = true;
    }

    await Chat.findOneAndUpdate(
      { vendorId: targetVendorId, userId },
      update
    );

    res.status(200).json({ message: "Marked as read" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const fetchUserNotificationCount = async (req, res) => {
  try {
    const { userId } = req.body;
    const count = await Chat.countDocuments({ userId, isReadByUser: false });
    res.status(200).json({ count });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const fetchNotifications = async (req, res) => {
  try {
    const {userId } = req.body;

    const chat = await Chat.findOne({ userId });

    if (!chat) {
      return res.status(200).json({ message: [] });
    }

    res.status(200).json(chat);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const fetchUserChats = async (req, res) => {
  try {
    const { userId, role } = req.body;

    let query = {};
    if (role === "vendor") {
      // For vendors, userId from storage matches the vendorId field in Chat model
      query = { vendorId: userId };
    } else {
      query = { userId: userId };
    }

    const chats = await Chat.find(query).sort({ updatedAt: -1 });

    const formattedChats = await Promise.all(
      chats.map(async (chat) => {
        let name = "Unknown";
        try {
          if (role === "vendor") {
            const user = await User.findById(chat.userId);
            name = user?.name || "Unknown Client";
          } else {
            const vendor = await Vendor.findOne({ vendorId: chat.vendorId });
            name = vendor?.name || "Unknown Vendor";
          }
        } catch (e) {
          // ignore naming errors
        }

        return {
          _id: chat._id,
          vendorId: chat.vendorId,
          userId: chat.userId,
          name: name,
          vendorName: name, // Regression fix
          lastMessage:
            chat.message.length > 0
              ? chat.message[chat.message.length - 1].text
              : "",
        };
      })
    );

    res.status(200).json(formattedChats);
  } catch (error) {
    console.error("fetchUserChats Error:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};