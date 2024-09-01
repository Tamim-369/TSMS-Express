import Train from "../../models/trainModel.js";
import { validate } from "../../utils/verifyFields.js";

export const getTrain = async (req, res) => {
  const { id } = req.params; // Extract the train ID from the request parameters

  // Validate the ID to ensure it is not empty and is in a valid format
  const validity = validate({ id });
  if (validity.valid === false) {
    return res.status(400).json({ message: validity.message });
  }

  try {
    // Find the train by ID and populate the stops with station details
    const train = await Train.findById(id).populate("stops.station");

    // If no train is found, return a 404 status with a message
    if (!train) {
      return res.status(404).json({ message: "Train not found" });
    }

    // If the train is found, return it as a JSON response
    return res.json(train);
  } catch (error) {
    // Log the error for debugging purposes and return a 500 status with an error message
    console.error(error.message);
    return res.status(500).json({ message: error.message });
  }
};
