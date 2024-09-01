import Wallet from "../../models/walletModel.js";

export const getWallet = async (req, res) => {
  const userId = req.params.id; // Extract userId from request parameters

  // Validate the userId parameter
  const validity = validate({ userId });
  if (validity.valid === false) {
    return res.status(400).json({ message: validity.message }); // Return 400 if validation fails
  }

  try {
    // Find the wallet associated with the userId and populate user details
    const wallet = await Wallet.findOne({ user: userId }).populate(
      "user",
      "name email"
    );

    if (!wallet) {
      return res.status(404).json({ message: "Wallet not found" }); // Return 404 if wallet not found
    }

    return res.status(200).json(wallet); // Return the wallet with a 200 status
  } catch (error) {
    // Log the error for debugging and return a 500 status with a generic server error message
    console.error("Error retrieving wallet:", error.message);
    return res.status(500).json({ message: "Server error" });
  }
};
