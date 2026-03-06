import mongoose from "mongoose";
import dotenv from "dotenv";
import Vendor from "../models/vendor-model.js";
import vendors from "../controllers/VendorInsert.js"

dotenv.config();

const seedVendors = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("MongoDB connected");

    for (const vendor of vendors.flat()) {
      const v = new Vendor(vendor);
      await v.save(); // ✅ ONE DOC AT A TIME
      console.log(`Inserted: ${vendor.name}`);
    }

    console.log("ALL VENDORS INSERTED 🎉");
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seedVendors();