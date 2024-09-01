import express from "express";
import { addFunds } from "../controllers/walletController.js/addFunds.js";
import { getWallet } from "../controllers/walletController.js/getWallet.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();
// Apply the 'protect' middleware to all routes in this router
// This ensures that only authenticated users can access these routes
router.use(protect);
// Route to add funds to a wallet
router.post("/add", addFunds);
// Route to get the wallet details for a specific user by ID
router.get("/:id", getWallet);

export default router;
