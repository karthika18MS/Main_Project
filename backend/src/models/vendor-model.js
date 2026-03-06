import mongoose from "mongoose";

const vendorSchema = new mongoose.Schema(
  {
    name: String,
    category: String,

    profilePic: String,
    gallery: [String],

    availableTimings: {
      from: String,
      to: String,
    },

    socialLinks: {
      instagram: String,
      facebook: String,
      website: String,
    },

    priceRates: {
      startingPrice: Number,
      maxPrice: Number,
    },

    packages: [
      {
        name: String,
        price: Number,
        includes: [String],
      },
    ],

    reviews: [
      {
        user: String,
        comment: String,
        rating: Number,
      },
    ],

    rating: Number,
    vendorId:String,

    location: {
      city: String,
      state: String,
      address: String,
    },
  },
  { timestamps: true }
);


if (mongoose.models.Vendor) {
  delete mongoose.models.Vendor;
}

const Vendor = mongoose.model("Vendor", vendorSchema);

export default Vendor;