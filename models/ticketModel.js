import mongoose from "mongoose";

const ticketSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "User is required"],
  },
  train: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Train",
    required: [true, "Train is required"],
  },
  from: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Station",
    required: [true, "From station is required"],
  },
  to: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Station",
    required: [true, "To station is required"],
  },
  fare: {
    type: Number,
    required: [true, "Ticket fare is required"],
  },
  timestamp: {
    type: Date,
    required: [true, "Timestamp is required"],
  },
});
const Ticket = mongoose.model("Ticket", ticketSchema);

export default Ticket;
