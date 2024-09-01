import express from "express";
import { createTrain } from "../controllers/trainControllers/createTrain.js";
import { getTrain } from "../controllers/trainControllers/getTrain.js";
import { getTrains } from "../controllers/trainControllers/getTrains.js";
import { updateTrain } from "../controllers/trainControllers/updateTrain.js";
const router = express.Router();
// Route to create a new train
router.post("/", createTrain);

// Route to get a list of all trains
router.get("/", getTrains);

// Route to update a specific train by ID
router.put("/:id", updateTrain);

// Route to get details of a specific train by ID
router.get("/:id", getTrain);

// Export the router for use in other parts of the application
export default router;
