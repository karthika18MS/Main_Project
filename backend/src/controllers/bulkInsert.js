import Vendor from "../models/vendor-model.js";
import { register } from "./auth.controller.js";

export const bulkRegisterVendors = async (req, res) => {
  try {

    const vendors = await Vendor.find({
      $or: [
        { vendorId: { $exists: false } },
        { vendorId: null }
      ]
    });

    const results = [];

    for (const vendor of vendors) {

      const name = vendor.name;   // EXACT name from Mongo

      const email = name
        .toLowerCase()
        .replace(/\s+/g, "") + "@gmail.com";

      const password = name
        .toLowerCase()
        .replace(/\s+/g, "");

      const fakeReq = {
        body: {
          name: name,        // MUST remain exactly the same
          email: email,
          password: password,
          role: "vendor"
        }
      };

      const fakeRes = {
        status: () => ({
          json: (data) => results.push(data)
        }),
        json: (data) => results.push(data)
      };

      await register(fakeReq, fakeRes);

    }

    res.json({
      message: "Bulk vendor registration completed",
      processed: vendors.length,
      results
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};