import mongoose from "mongoose";

const walletSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "User is required"],
  },
  balance: {
    type: Number,
    required: [true, "Balance is required"],
    default: 0,
  },
  transactions: [
    {
      type: {
        type: String,
        required: [true, "Transaction type is required"],
      },
      amount: {
        type: Number,
        required: [true, "Transaction amount is required"],
      },
      timestamp: {
        type: Date,
        required: [true, "Timestamp is required"],
      },
    },
  ],
});
const Wallet = mongoose.model("Wallet", walletSchema);

export default Wallet;
