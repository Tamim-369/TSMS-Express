import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes.js";
import stationRoutes from "./routes/stationRoutes.js";
import trainRoutes from "./routes/trainRoutes.js";
import walletRoutes from "./routes/walletRoutes.js";
import ticketRoutes from "./routes/ticketRoutes.js";
import "./services/cron/cronJobs.js";
const PORT = process.env.PORT | 3000;

dotenv.config();

const app = express();

// Connect to MongoDB
const connection = mongoose.connect(process.env.MONGODB_URI, {
  dbName: process.env.DATABASE_NAME,
});

// Handle connection errors
connection
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });
// Middleware
app.use(express.json());

// Routes
app.use("/api/users", userRoutes);
app.use("/api/stations", stationRoutes);
app.use("/api/trains", trainRoutes);
app.use("/api/wallets", walletRoutes);
app.use("/api/tickets", ticketRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
