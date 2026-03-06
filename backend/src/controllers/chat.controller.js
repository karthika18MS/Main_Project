// controllers/chat.controller.js

import Chat from "../models/Chat.model.js";

export const getMessages = async (req, res) => {
  try {
    const { vendorId, userId } = req.body;

    const chat = await Chat.findOne({ vendorId, userId });

    if (!chat) {
      return res.status(200).json({ message: [] });
    }

    res.status(200).json(chat.message);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// export const saveMessage = async (req, res) => {
//   const message = await Chat.create(req.body);
//   res.status(201).json(message);
// };


export const saveMessage = async (req, res) => {
  try {
    const { vendorId, userId, text,role,username } = req.body;
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
        message: [newMessage]
      });
    } else {
      chat.message.push(newMessage);
      await chat.save();
    }

    res.status(201).json(chat);

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

    res.status(200).json(chat.message);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};