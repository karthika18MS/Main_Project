import Vendor from "../models/vendor-model.js";

export const recommendVendors = async ({
  category,
  location,
  budget,
}) => {
  return await Vendor.find({
    location,
    category,
  })
    .sort({ rating: -1 })
    .limit(5);
};
