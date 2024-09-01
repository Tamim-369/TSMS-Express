import Train from "../../models/trainModel.js";
import { validate } from "../../utils/verifyFields.js";

export const createTrain = async (req, res) => {
  try {
    const { name, number, stops } = req.body; // Destructure necessary fields from the request body

    // Validate required fields
    const validity = validate({ name, number, stops });
    if (validity.valid === false) {
      return res.status(400).json({ message: validity.message });
    }

    // Check if a train with the given number already exists
    const trainNumberExist = await Train.findOne({ number });
    if (trainNumberExist) {
      return res.status(400).json({ message: "Train number already exists" });
    }

    // Check if a train with the given code already exists
    const trainCodeExist = await Train.findOne({ code });
    if (trainCodeExist) {
      return res.status(400).json({ message: "Train code already exists" });
    }

    // Check if a train with the given name already exists
    const trainNameExist = await Train.findOne({ name });
    if (trainNameExist) {
      return res.status(400).json({ message: "Train name already exists" });
    }

    // Ensure the train has at least two stops
    if (stops.length < 2) {
      return res
        .status(400)
        .json({ message: "Train should have at least 2 stops" });
    }

    // Ensure no stop has the same arrival and departure time
    const stopsArrivalExist = stops.some(
      (stop) => stop.arrival === stop.departure
    );
    if (stopsArrivalExist) {
      return res
        .status(400)
        .json({ message: "Arrival and departure times should be different" });
    }

    // Create a new train with the provided details
    const train = new Train({ name, number, stops });
    await train.save(); // Save the train to the database

    // Return the created train in the response
    return res.status(201).json(train);
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
