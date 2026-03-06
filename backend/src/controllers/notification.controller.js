// import Notification from "../models/notification.model.js";
import Chat from "../models/Chat.model.js"

export const getNotifications = async (req, res) => {
  try {

    const vendorId = req.body.vendorId;

    const notifications = await Chat.find({ vendorId })
      .sort({ createdAt: -1 });

    res.json(notifications);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const markAsRead = async (req, res) => {
  await Notification.findByIdAndUpdate(req.params.id, { read: true });
  res.json({ message: "Notification read" });
};
