import Ticket from "../../models/ticketModel.js";
import User from "../../models/userModel.js";
import { sendEmail } from "./emailService.js";
import { validate } from "../../utils/verifyFields.js";

export const generateReports = async () => {
  try {
    // Aggregate report data
    const totalTickets = await Ticket.countDocuments();
    const totalRevenueResult = await Ticket.aggregate([
      { $group: { _id: null, total: { $sum: "$fare" } } },
    ]);
    const totalUsers = await User.countDocuments();

    // Extract total revenue
    const totalRevenue = totalRevenueResult[0]?.total || 0;

    // Generate report content
    const report = `
      Weekly Report:
      Total Tickets Sold: ${totalTickets}
      Total Revenue: ${totalRevenue}
      Total Users: ${totalUsers}
    `;

    // Validate the report
    if (validate([report])) {
      // Send the report via email
      await sendEmail(process.env.EMAIL_USER, "Weekly Report", report);
      console.log("Weekly report sent successfully.");
    } else {
      console.error("Report validation failed.");
    }
  } catch (error) {
    console.error("Error generating or sending the report:", error.message);
  }
};
