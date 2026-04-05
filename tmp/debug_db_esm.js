import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '../backend/.env') });

const ChatSchema = new mongoose.Schema({
  vendorId: String,
  userId: String,
  message: Array,
}, { timestamps: true });

const VendorSchema = new mongoose.Schema({
  vendorId: String,
  name: String,
});

const UserSchema = new mongoose.Schema({
  name: String,
});

async function debug() {
  await mongoose.connect(process.env.MONGO_URL);
  
  const Chat = mongoose.model('Chat', ChatSchema);
  const Vendor = mongoose.model('Vendor', VendorSchema);
  const User = mongoose.model('User', UserSchema);

  const targetUserId = "69940b9ce7def9e658f5ffea"; // From browser subagent

  const vendor = await Vendor.findOne({
     $or: [
       { vendorId: targetUserId },
       { _id: new mongoose.Types.ObjectId(targetUserId) }
     ]
  });

  console.log("VENDOR FOUND:", vendor ? { name: vendor.name, vendorId: vendor.vendorId, _id: vendor._id } : "NULL");

  if (vendor) {
    const chats = await Chat.find({ vendorId: vendor.vendorId });
    console.log("CHATS FOUND FOR vendorId", vendor.vendorId, ":", chats.length);
    chats.forEach(c => console.log(`  - ChatID: ${c._id}, userId: ${c.userId}`));
  }

  const allChats = await Chat.find({});
  console.log("TOTAL CHATS IN DB:", allChats.length);
  if (allChats.length > 0) {
      console.log("SAMPLE CHAT:", { vendorId: allChats[0].vendorId, userId: allChats[0].userId });
  }

  await mongoose.disconnect();
}

debug().catch(console.error);
