import { sendEmail } from "./emailService.js";
import Ticket from "../../models/ticketModel.js";

const REMINDER_INTERVAL_MS = 24 * 60 * 60 * 1000; // 24 hours

export const sendReminders = async () => {
  const now = new Date();
  const reminderTime = new Date(now.getTime() + REMINDER_INTERVAL_MS); // 24 hours from now

  try {
    // Find tickets for the next 24 hours
    const tickets = await Ticket.find({
      timestamp: { $gte: now, $lt: reminderTime },
    }).populate("user train from to");

    if (tickets.length === 0) {
      console.log("No tickets to send reminders for.");
      return;
    }

    // Process each ticket
    for (const ticket of tickets) {
      const { user, train, from, to } = ticket;
      if (!user || !user.email || !train || !from || !to) {
        console.error("Incomplete ticket information:", ticket);
        continue;
      }

      const message = `Reminder: Your train ${train.name} is departing from ${from.name} to ${to.name} tomorrow.`;
      console.log(`Sending reminder to ${user.email} for train ${train.name}`);

      try {
        await sendEmail(user.email, "Train Departure Reminder", message);
        console.log(`Successfully sent reminder to ${user.email}`);
      } catch (error) {
        console.error(`Failed to send email to ${user.email}:`, error.message);
      }
    }
  } catch (error) {
    console.error("Error sending reminders:", error.message);
  }
};
