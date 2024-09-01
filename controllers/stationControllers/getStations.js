import Station from "../../models/stationModel.js";

export const getStations = async (req, res) => {
  try {
    // Fetch all stations from the database
    const stations = await Station.find();

    // Check if there are any stations in the database
    if (stations.length === 0) {
      return res.status(404).json({ message: "Stations not found" });
    }

    // If stations are found, return them in the response
    return res.json(stations);
  } catch (error) {
    console.error(error.message); // Log the error message for debugging purposes
    return res.status(500).json({ message: error.message }); // Return a 500 error for any server issues
  }
};
