import cron from "node-cron";
import { sendReminders } from "./notification.js";
import { cleanupData } from "./dataCleanUp.js";
import { generateReports } from "./report.js";
import dotenv from "dotenv";
dotenv.config();

// Reminder notification job - runs every 5 minutes
cron.schedule("0 */5 * * * *", async () => {
  try {
    console.log("Running reminder notifications job...");
    await sendReminders();
    console.log("Successfully runned reminder notifications job");
  } catch (error) {
    console.error("Error running reminder notifications job:", error.message);
  }
});

// Data cleanup job - runs every 12 hours
cron.schedule("0 0 */12 * * *", async () => {
  try {
    console.log("Running data cleanup job...");
    await cleanupData();
    console.log("Successfully data cleanup job");
  } catch (error) {
    console.error("Error running data cleanup job:", error.message);
  }
});

// Reporting job - runs every Sunday at midnight
cron.schedule("0 0 * * 6", async () => {
  try {
    console.log("Running reporting job...");
    await generateReports();
    console.log("Successfully runned reporting job");
  } catch (error) {
    console.error("Error running reporting job:", error.message);
  }
});
