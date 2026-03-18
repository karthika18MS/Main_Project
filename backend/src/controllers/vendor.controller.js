// import Booking from "../../../frontend/src/pages/Booking.jsx";
import Vendor from "../models/vendor-model.js"
import Booking from "../models/Booking.model.js";
import fs from "fs";
import path from "path";
import {sendEmail} from "../services/email.service.js"

export const getVendors = async (req, res) => {
  const vendors = await Vendor.find();
  res.json(vendors);
};

export const getVendorProfile = async (req,res)=>{

  console.log("vendorId"+req.params.vendorId)

const vendor = await Vendor.findOne({
vendorId:req.params.vendorId
});

res.json(vendor);

}

export const getVendorById = async (req, res) => {
  const vendor = await Vendor.findById(req.params.id);
  res.json(vendor);
};

export const getBookingByVendorId = async (req, res) => {
  console.log(req.body.vendorId)
  const booking = await Booking.find({
  vendorId: req.body.vendorId,
  status : "pending"
});
  res.json(booking);
};

export const getAllVendorBooking = async (req, res) => {
  console.log(req.body.vendorId)
  const booking = await Booking.find({
  vendorId: req.body.vendorId,
});
  res.json(booking);
};

export const acceptBooking = async (req, res) => {
   const booking = await Booking.findByIdAndUpdate(
      req.body.bookingId,
      { status: "accepted" },
      { new: true } 
    );
    if(booking)
    {
              const to = "karthikams380@gmail.com"
            const subject = "Booked Successfully"
          const html = `
            <!DOCTYPE html>
            <html>
            <head>
            <style>

            body{
              font-family: 'Segoe UI', Arial, sans-serif;
              background:#f5f7fb;
              padding:30px;
            }

            .container{
              max-width:620px;
              margin:auto;
              background:#ffffff;
              border-radius:14px;
              overflow:hidden;
              box-shadow:0 8px 25px rgba(0,0,0,0.08);
            }

            .header{
              background:linear-gradient(135deg,#ff7eb3,#8a7dff);
              color:white;
              text-align:center;
              padding:28px 20px;
              font-size:26px;
              font-weight:600;
              letter-spacing:1px;
            }

            .content{
              padding:35px;
              color:#444;
              line-height:1.7;
              text-align:center;
            }

            .content h2{
              margin-top:0;
              color:#333;
            }

            .divider{
              width:60px;
              height:4px;
              background:#ff7eb3;
              margin:18px auto;
              border-radius:3px;
            }

            .button{
              display:inline-block;
              padding:13px 26px;
              background:#8a7dff;
              color:white !important;
              text-decoration:none;
              border-radius:25px;
              font-weight:500;
              margin-top:20px;
              transition:0.3s;
            }

            .footer{
              text-align:center;
              font-size:13px;
              color:#888;
              padding:18px;
              background:#fafafa;
              border-top:1px solid #eee;
            }

            </style>
            </head>

            <body>

            <div class="container">

              <div class="header">
                WED AURA 💍
              </div>

              <div class="content">

                <h2>Booking Accepted 🎉</h2>

                <div class="divider"></div>

                <p>Hello,</p>

                <p>
                  Your vendor booking has been <strong>successfully accepted</strong>.
                  We’re excited to be part of your wedding journey.
                </p>

                <p>
                  Our team and vendors will ensure everything is perfectly arranged
                  for your special day.
                </p>

                <a href="http://localhost:3000/user-dashboard" class="button">
                  View Booking Details
                </a>

                <p style="margin-top:28px;">
                  Best wishes for a joyful and memorable wedding celebration 💕
                </p>

              </div>

              <div class="footer">
                © 2026 WED AURA · AI Powered Wedding Planning Platform
              </div>

            </div>

            </body>
            </html>
            `;

            sendEmail(to,subject,html)
    }
  res.json(booking);
};

export const cancelBooking = async (req, res) => {
  const booking = await Booking.findByIdAndUpdate(
      req.body.bookingId,
      { status: "cancelled" },
      { new: true } 
  );
  res.json(booking);
};

export const updateVendorProfile = async (req, res) => {
  try {

    const vendorId = req.params.vendorId;

    const {
      name,
      category,
      city,
      state,
      address,
      startingPrice,
      maxPrice,
      facebook,
      instagram,
      website,
      availableFrom,
      availableTo,
      packages,
      removeGalleryImage
    } = req.body;

    const updateData = {
      name,
      category,

      availableTimings: {
        from: availableFrom,
        to: availableTo,
      },

      socialLinks: {
        facebook,
        instagram,
        website,
      },

      priceRates: {
        startingPrice,
        maxPrice,
      },

      location: {
        city,
        state,
        address,
      },

      vendorId
    };

    // packages JSON → array
    if (packages) {
      updateData.packages = JSON.parse(packages);
    }

    // profile picture
    if (req.files?.profilePic) {
      updateData.profilePic = req.files.profilePic[0].path;
    }

     const existingVendor = await Vendor.findOne({ vendorId });

        let updatedGallery = existingVendor?.gallery || [];

        // remove gallery image
        if (removeGalleryImage) {

            updatedGallery = updatedGallery.filter(
              img => img !== removeGalleryImage
            );

            const filePath = path.join(process.cwd(), removeGalleryImage);

            if (fs.existsSync(filePath)) {
              fs.unlinkSync(filePath);
            }

        }

        // gallery images
        let gallery = updatedGallery;

        if (req.files?.gallery) {
          const newImages = req.files.gallery.map(file => file.path);
          gallery = [...gallery, ...newImages];
        }

        updateData.gallery = gallery;



    const vendor = await Vendor.findOneAndUpdate(
      { vendorId: vendorId },
      updateData,
      { new: true, upsert: true }
    );

    res.json(vendor);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

export const getVendorByCategory = async (req, res) => {

  try {

    const { categories } = req.body;

    const vendors = await Vendor.find({
      category: { $in: categories }
    });

    res.json(vendors);

  } catch (error) {

    console.error(error);
    res.status(500).json({ error: error.message });

  }

};




export const insertVendorPolicies = async (req, res) => {
  try {

    const policies = {

      "Venue": [
        "Guest count must not exceed venue capacity",
        "Decorations must not damage the property",
        "Music must follow local noise regulations",
        "Event activities must follow the booked time slot"
      ],

      "Decorations": [
        "Decor materials must not damage venue property",
        "Electrical decorations must follow safety standards",
        "Setup and dismantling must follow venue timing",
        "All decor items must be removed after the event"
      ],

      "Food & beverage": [
        "Food preparation must follow hygiene standards",
        "Cooking equipment allowed only in designated areas",
        "Waste disposal must follow venue guidelines",
        "Buffet setup must not block guest pathways"
      ],

      "Photography": [
        "Equipment setup must not block guest pathways",
        "Drone photography requires permission",
        "Photographers must respect cultural ceremonies",
        "Flash lighting must follow venue restrictions"
      ],

      "Making & Grooming": [
        "Artists must arrive before the scheduled time",
        "Makeup products must follow hygiene standards",
        "Clients must inform about skin allergies beforehand",
        "All tools and equipment must be sanitized"
      ]

    };

    let totalUpdated = 0;

    for (const category in policies) {

      const result = await Vendor.updateMany(
        { category: category },
        { $set: { instructions: policies[category] } }
      );

      totalUpdated += result.modifiedCount;

    }

    res.json({
      message: "Policies inserted successfully",
      vendorsUpdated: totalUpdated
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getVendorStats = async (req, res) => {
  try {
    const { vendorId } = req.body;
    
    if (!vendorId) return res.status(400).json({ message: "Vendor ID is required" });

    const totalBookings = await Booking.countDocuments({ vendorId });
    const pending = await Booking.countDocuments({ vendorId, status: "pending" });
    const completed = await Booking.countDocuments({ vendorId, status: "completed" });
    
    // Earnings: sum of price/amount from accepted/completed bookings
    const earningsAgg = await Booking.aggregate([
      { $match: { vendorId: vendorId, status: { $in: ["completed"] } } },
      { $group: { _id: null, earnings: { $sum: { $ifNull: ["$price", "$amount"] } } } }
    ]);
    
    const earnings = earningsAgg.length > 0 ? earningsAgg[0].earnings : 0;
    
    res.json({
      totalBookings,
      pending,
      completed,
      earnings
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

export const addVendorReview = async (req, res) => {
  try {
  
    const { vendorId , username, rating, comment } = req.body;

    if (!rating || !comment) {
      return res.status(400).json({ message: "Rating and comment are required." });
    }

    //const vendor = await Vendor.findById(vendorId);

     const vendor = await Vendor.findOneAndUpdate({vendorId: vendorId });

    if (!vendor) {
      return res.status(404).json({ message: "Vendor not found." });
    }

    // Add review
    const newReview = {
      user: username,
      comment,
      rating: Number(rating),
    };  

    vendor.reviews.push(newReview);

    // Update average rating
    const totalReviews = vendor.reviews.length;
    const sumRatings = vendor.reviews.reduce((acc, rev) => acc + rev.rating, 0);
    vendor.rating = sumRatings / totalReviews;

    await vendor.save();

    res.status(200).json({ message: "Review added successfully", vendor });
  } catch (error) {
    console.error("Error adding vendor review:", error);
    res.status(500).json({ error: error.message });
  }
};

