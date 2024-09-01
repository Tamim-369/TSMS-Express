import express from "express";
import { purchaseTicket } from "../controllers/ticketControllers/purchaseTicket.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();
// Apply the authentication middleware to all routes in this router
router.use(protect);
// Route for purchasing a ticket
router.post("/purchase", purchaseTicket);

export default router;
