import Station from "../../models/stationModel.js";
import { isFilled } from "../../utils/verifyFields.js";

export const createStation = async (req, res) => {
  try {
    // Destructure name, code, and location from the request body
    const { name, code, location } = req.body;

    // isFilled the input fields
    const isExist = isFilled({ name, code, location });
    if (isExist.exist === false) {
      // If validation fails, return a 400 error with the validation message
      return res.status(400).json({ message: validity.message });
    }

    // Check if a station with the same code already exists
    const stationCodeExist = await Station.findOne({ code });
    if (stationCodeExist) {
      return res.status(400).json({ message: "Station code already exists" });
    }

    // Check if a station with the same name already exists
    const existStation = await Station.findOne({ name });
    if (existStation) {
      return res.status(400).json({ message: "Station already exists" });
    }

    // Create a new Station instance with the provided data
    const station = new Station({ name, code, location });
    await station.save(); // Save the new station to the database

    // Return the created station with a 201 status code
    return res.status(201).json(station);
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
