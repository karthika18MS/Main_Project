import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config({ path: 'src/.env' }); // Adjust if .env is elsewhere

const mongoUrl = "mongodb+srv://karthikaa18:karthika18forfisat@cluster0.0jspmzv.mongodb.net/wedaura";

async function run() {
  await mongoose.connect(mongoUrl);
  
  const Vendor = mongoose.model('Vendor', new mongoose.Schema({}, { strict: false }), 'vendors');
  const Chat = mongoose.model('Chat', new mongoose.Schema({}, { strict: false }), 'chats');
  const User = mongoose.model('User', new mongoose.Schema({}, { strict: false }), 'users');

  const logBuffer = [];
  const log = (msg) => {
    console.log(msg);
    logBuffer.push(msg);
  };

  log("--- DEBUG START ---");

  // 1. Find Royal Palace Venue
  const vendor = await Vendor.findOne({ name: { $regex: /Royal Palace Venue/i } });
  log(`VENDOR Found: ${JSON.stringify(vendor, null, 2)}`);

  if (vendor) {
    // 2. Find Chats for this vendor
    // Try both vendorId and _id
    const chatsByVendorIdField = await Chat.find({ vendorId: vendor.vendorId });
    log(`CHATS found by vendorId field (${vendor.vendorId}): ${chatsByVendorIdField.length}`);

    const chatsByObjId = await Chat.find({ vendorId: vendor._id.toString() });
    log(`CHATS found by _id string (${vendor._id.toString()}): ${chatsByObjId.length}`);
    
    const allChats = await Chat.find({}).limit(10);
    log(`SAMPLE CHATS (first 10): ${JSON.stringify(allChats.map(c => ({ vId: c.vendorId, uId: c.userId })), null, 2)}`);
  }

  // 3. Find User session info
  const users = await User.find({ name: { $regex: /Royal Palace Venue/i } });
  log(`USERS with same name: ${JSON.stringify(users.map(u => ({ name: u.name, _id: u._id, role: u.role })), null, 2)}`);

  fs.writeFileSync('db_debug_output.txt', logBuffer.join('\n'));
  await mongoose.disconnect();
}

run().catch(e => {
  fs.writeFileSync('db_debug_output.txt', e.stack);
  process.exit(1);
});
