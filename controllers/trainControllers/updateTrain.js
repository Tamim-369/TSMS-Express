import Train from "../../models/trainModel.js";
import { isFilled } from "../../utils/verifyFields.js";

export const updateTrain = async (req, res) => {
  try {
    // Check if the train ID is provided in the request parameters
    if (!req.params.id) {
      return res.status(400).json({ message: "Please provide the train id" }); // Changed status code to 400 for bad request
    }

    // Update the train with the provided ID and data from the request body
    const train = await Train.findByIdAndUpdate(req.params.id, req.body, {
      new: true, // Return the updated document
      runValidators: true, // Run validation on the updated fields
    });

    // If no train is found with the given ID, return a 404 status with a message
    if (!train) {
      return res.status(404).json({ message: "Train not found" });
    }

    // Return the updated train document in the response
    return res.json(train);
  } catch (error) {
    // Log the error message for debugging purposes and return a 400 status with an error message
    console.error(error.message);
    return res.status(400).json({ message: error.message }); // Changed status code to 400 for bad request
  }
};
