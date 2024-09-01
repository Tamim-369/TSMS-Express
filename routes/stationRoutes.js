import express from "express";
import { createStation } from "../controllers/stationControllers/createStation.js";
import { getStation } from "../controllers/stationControllers/getStation.js";
import { getStations } from "../controllers/stationControllers/getStations.js";
import { updateStation } from "../controllers/stationControllers/updateStation.js";
const router = express.Router();
// Route to create station route
router.post("/", createStation);
// Route to get stations route
router.get("/", getStations);
// Route to update station route
router.put("/:id", updateStation);
// Route to get station route
router.get("/:id", getStation);

export default router;
