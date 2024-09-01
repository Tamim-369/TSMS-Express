import Station from "../../models/stationModel.js";

export const updateStation = async (req, res) => {
  try {
    // Check if the station ID is provided in the request parameters
    if (!req.params.id) {
      return res.status(404).json({ message: "Please provide the station id" });
    }

    const { name, code, location } = req.body; // Destructure the station details from the request body

    // Check if a station with the provided ID exists
    const station = await Station.findById(req.params.id);
    if (!station) {
      return res.status(404).json({ message: "Station not found" });
    }

    // Check if the new station code already exists
    if (code) {
      // Check if code is provided in the request body
      const stationCodeExist = await Station.findOne({
        code,
        _id: { $ne: req.params.id },
      });
      if (stationCodeExist) {
        return res.status(400).json({ message: "Station code already exists" });
      }
    }

    // Construct an update object with only the fields that are provided
    const updateFields = {};
    if (name) updateFields.name = name;
    if (code) updateFields.code = code;
    if (location) updateFields.location = location;

    // Update the station with the provided details
    const updatedStation = await Station.findByIdAndUpdate(
      req.params.id,
      { $set: updateFields },
      {
        new: true,
        runValidators: true,
      }
    );

    // If the update operation did not return a station, it means the station was not found
    if (!updatedStation) {
      return res.status(404).json({ message: "Station not found" });
    }

    // Return the updated station in the response
    return res.json(updatedStation);
  } catch (error) {
    console.error(error.message); // Log the error message for debugging
    return res.status(400).json({ message: error.message }); // Return a 400 error for any issues
  }
};
