import mongoose from "mongoose";

const stationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name field is required"],
  },
  code: {
    type: String,
    required: [true, "Code field is required"],
    unique: [true, "This code already exists. Code must be unique"],
  },
  location: {
    type: String,
    required: [true, "Location field is required"],
  },
});

const Station = mongoose.model("Station", stationSchema);

export default Station;
