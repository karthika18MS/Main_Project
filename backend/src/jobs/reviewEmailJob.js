import cron from "node-cron";
import User from "../models/User.model.js";
import Booking from "../models/Booking.model.js";
import { sendEmail } from "../services/email.service.js";

const runReviewEmailJob = () => {
  // Run every day at 8:00 AM
  cron.schedule("0 8 * * *", async () => {
    console.log("Running scheduled job: Check for users who had their wedding yesterday...");

    try {
      const today = new Date();
      // Calculate yesterday's date
      const yesterday = new Date(today);
      yesterday.setDate(today.getDate() - 1);
      
      // We only care about the date part, so we match the year, month, and day
      const startOfYesterday = new Date(yesterday.setHours(0, 0, 0, 0));
      const endOfYesterday = new Date(yesterday.setHours(23, 59, 59, 999));

      // Find users whose wedding date was yesterday
      const users = await User.find({
        weddingDate: {
          $gte: startOfYesterday,
          $lte: endOfYesterday,
        },
      });

      if (users.length === 0) {
        console.log("No users found with a wedding date of yesterday.");
        return;
      }

      for (const user of users) {
        // Find bookings for this user that are accepted or completed
        const bookings = await Booking.find({
          user: user._id,
          status: { $in: ["accepted", "completed"] },
        });

        if (bookings.length > 0) {
          const emailHtml = `
            <h2>Hi ${user.name},</h2>
            <p>We hope you had a wonderful wedding yesterday!</p>
            <p>Could you please take a moment to review the vendors who helped make your special day possible?</p>
            <p>Your feedback is invaluable to them and to other couples planning their weddings.</p>
            <p>Click <a href="http://localhost:5173/user-dashboard">here</a> to view your bookings and leave a review.</p>
            <br/>
            <p>Best regards,</p>
            <p>WED AURA Team</p>
          `;

          await sendEmail(user.email, "How was your wedding? Please review your vendors!", emailHtml);
          console.log(`Review email sent to ${user.email}`);
        }
      }
    } catch (error) {
      console.error("Error running review email cron job:", error);
    }
  });

  console.log("Review Email Cron Job initialized.");
};

export default runReviewEmailJob;
