import User from "../../models/userModel.js";
import Wallet from "../../models/walletModel.js";
import { validate } from "../../utils/verifyFields.js";

export const addFunds = async (req, res) => {
  const { userId, amount } = req.body;

  // Validate input
  const validity = validate({ userId, amount });
  if (validity.valid === false) {
    return res.status(400).json({ message: validity.message });
  }

  // Check if user exists
  const user = await User.findById(userId);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  try {
    // Find the wallet associated with the user
    let wallet = await Wallet.findOne({ user: userId });

    // If wallet doesn't exist, create a new one
    if (!wallet) {
      wallet = new Wallet({ user: userId, balance: 0 });
    }

    // Update the wallet balance
    wallet.balance = Number(wallet.balance) + Number(amount);

    // Add transaction record
    wallet.transactions.push({
      type: "Add Funds",
      amount: amount,
      timestamp: new Date(),
    });

    // Save the wallet
    await wallet.save();

    return res.status(200).json(wallet);
  } catch (error) {
    // Handle validation errors and return detailed messages
    if (error.name === "ValidationError") {
      const errors = {};
      for (const field in error.errors) {
        errors[field] = error.errors[field].message;
      }
      return res.status(400).json({ errors });
    }

    // For any other errors, return a general error message
    return res.status(400).json({ message: error.message });
  }
};
