import mongoose from "mongoose";

const trainSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Train name is required"],
  },
  number: {
    type: String,
    required: [true, "Train number is required"],
    unique: [true, "This number already exists. Number must be unique"],
  },
  stops: [
    {
      station: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Station",
        required: [true, "Station is required"],
      },
      arrivalTime: {
        type: Date,
        required: [true, "Arrival time is required"],
      },
      departureTime: {
        type: Date,
        required: [true, "Departure time is required"],
      },
    },
  ],
});
const Train = mongoose.model("Train", trainSchema);
export default Train;
