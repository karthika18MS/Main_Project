import Notification from "../models/Notification.model.js";

export const sendNotification = async (userId, message) => {
  return await Notification.create({
    user: userId,
    message,
  });
};
