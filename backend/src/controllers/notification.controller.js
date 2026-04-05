import mongoose from "mongoose";
import Chat from "../models/Chat.model.js"
import Vendor from "../models/vendor-model.js";

export const getNotifications = async (req, res) => {
  try {
    const userId = req.body.vendorId;

    // Find the vendor document to get their business vendorId
    // Use $or with both String and ObjectId to be safe
    let searchId = userId;
    let orQuery = [{ vendorId: searchId }];
    
    if (mongoose.Types.ObjectId.isValid(searchId)) {
        orQuery.push({ _id: new mongoose.Types.ObjectId(searchId) });
    }

    const vendorDoc = await Vendor.findOne({ $or: orQuery });

    if (!vendorDoc) {
      return res.status(200).json([]);
    }

    const notifications = await Chat.find({ 
      vendorId: vendorDoc.vendorId,
      isReadByVendor: false 
    }).sort({ createdAt: -1 });

    res.json(notifications);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
