import Train from "../../models/trainModel.js";
import { isFilled } from "../../utils/verifyFields.js";

export const createTrain = async (req, res) => {
  try {
    const { name, number, stops } = req.body;

    // Check if required fields are filled
    const isExist = isFilled({ name, number, stops });
    if (!isExist.exist) {
      return res.status(400).json({ message: isExist.message });
    }

    // Check if a train with the given number already exists
    const trainNumberExist = await Train.findOne({ number });
    if (trainNumberExist) {
      return res.status(400).json({ message: "Train number already exists" });
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

    // Check arrival and departure times
    for (const stop of stops) {
      const arrival = new Date(stop.arrivalTime).getTime();
      const departure = new Date(stop.departureTime).getTime();

      if (arrival === departure) {
        return res
          .status(400)
          .json({ message: "Arrival and departure times should be different" });
      }
    }

    // Create a new train with the provided details
    const train = new Train({ name, number, stops });
    await train.save();

    // Return the created train in the response
    return res.status(201).json(train);
  } catch (error) {
    if (error.name === "ValidationError") {
      const errors = {};
      for (const field in error.errors) {
        errors[field] = error.errors[field].message;
      }
      return res.status(400).json({ errors });
    }

    return res.status(400).json({ message: error.message });
  }
};
