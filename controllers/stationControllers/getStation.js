import Station from "../../models/stationModel.js";

import { validate } from "../../utils/verifyFields.js";

export const getStation = async (req, res) => {
  const { id } = req.params; // Extract the station ID from the request parameters

  // Validate the ID field
  const validity = validate({ id });
  if (validity.valid === false) {
    // If validation fails, return a 400 error with the validation message
    return res.status(400).json({ message: validity.message });
  }

  try {
    // Fetch the station from the database using the provided ID
    const station = await Station.findById(id);

    // Check if the station exists
    if (!station) {
      return res.status(404).json({ message: "Station not found" });
    }

    // If the station is found, return it in the response
    return res.json(station);
  } catch (error) {
    console.error(error.message); // Log the error message for debugging purposes
    return res.status(500).json({ message: error.message }); // Return a 500 error for any server issues
  }
};
