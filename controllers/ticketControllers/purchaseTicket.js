import Ticket from "../../models/ticketModel.js";
import Wallet from "../../models/walletModel.js";
import { isFilled } from "../../utils/verifyFields.js";

export const purchaseTicket = async (req, res) => {
  try {
    const { userId, trainId, fromStation, toStation, fare } = req.body; // Destructure necessary fields from the request body

    // isFilled required fields
    const isExist = isFilled({
      userId,
      trainId,
      fromStation,
      toStation,
      fare,
    });
    if (isExist.exist === false) {
      return res.status(400).json({ message: validity.message });
    }

    // isFilled the fare
    if (isNaN(fare)) {
      return res.status(400).json({ message: "Fare must be a number" });
    }
    const fareNumber = Number(fare); // Convert fare to a number
    if (fareNumber <= 0) {
      return res.status(400).json({ message: "Fare must be greater than 0" });
    }

    // Find the user's wallet by user ID
    const wallet = await Wallet.findOne({ user: userId });
    if (!wallet) {
      return res.status(404).json({ message: "Wallet not found" });
    }

    // Check if the wallet has sufficient balance
    if (wallet.balance < fareNumber) {
      return res.status(400).json({ message: "Insufficient funds" });
    }

    // Create a new ticket with the provided details
    const ticket = new Ticket({
      user: userId,
      train: trainId,
      from: fromStation,
      to: toStation,
      fare: fareNumber,
      timestamp: new Date(), // Record the current timestamp
    });

    // Save the new ticket to the database
    await ticket.save();

    // Deduct the fare from the wallet balance and add a transaction record
    wallet.balance -= fareNumber;
    wallet.transactions.push({
      type: "Ticket Purchase",
      amount: -fareNumber,
      timestamp: new Date(),
    });

    // Save the updated wallet to the database
    await wallet.save();

    // Return the created ticket in the response
    return res.status(201).json(ticket);
  } catch (error) {
    console.error("Error purchasing ticket:", error.message); // Log the error message for debugging
    return res.status(500).json({ message: "Server error" }); // Return a 500 error for any server issues
  }
};
