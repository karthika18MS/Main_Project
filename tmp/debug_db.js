const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../backend/.env') });

const ChatSchema = new mongoose.Schema({
  vendorId: String,
  userId: String,
  message: Array,
}, { timestamps: true });

const Chat = mongoose.model('Chat', ChatSchema);

async function check() {
  await mongoose.connect(process.env.MONGO_URL || 'mongodb://localhost:27017/wed-aura');
  const chats = await Chat.find({});
  console.log('--- CHATS ---');
  chats.forEach(c => {
    console.log(`ID: ${c._id}, vendorId: ${c.vendorId}, userId: ${c.userId}, msgCount: ${c.message.length}`);
  });

  const VendorSchema = new mongoose.Schema({
    vendorId: String,
    name: String,
  });
  const Vendor = mongoose.model('Vendor', VendorSchema);
  const vendors = await Vendor.find({});
  console.log('--- VENDORS ---');
  vendors.forEach(v => {
      console.log(`ID: ${v._id}, vendorId: ${v.vendorId}, name: ${v.name}`);
  });

  const UserSchema = new mongoose.Schema({
    name: String,
  });
  const User = mongoose.model('User', UserSchema);
  const users = await User.find({});
  console.log('--- USERS ---');
  users.forEach(u => {
      console.log(`ID: ${u._id}, name: ${u.name}`);
  });

  await mongoose.disconnect();
}

check().catch(console.error);
