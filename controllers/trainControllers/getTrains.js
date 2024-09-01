import Train from "../../models/trainModel.js";
import { isFilled } from "../../utils/verifyFields.js";

export const getTrains = async (req, res) => {
  try {
    // Fetch all trains from the database and populate the 'stops.station' field with station details
    const trains = await Train.find().populate("stops.station");

    // If no trains are found, return a 404 status with a message
    if (trains.length === 0) {
      return res.status(404).json({ message: "Trains not found" });
    }

    // If trains are found, return them as a JSON response
    return res.json(trains);
  } catch (error) {
    // Log the error for debugging purposes and return a 500 status with an error message
    console.error(error.message);
    return res.status(500).json({ message: error.message });
  }
};
