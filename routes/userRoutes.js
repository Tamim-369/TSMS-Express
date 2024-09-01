import express from "express";
import { register } from "../controllers/userControllers/register.js";
import { login } from "../controllers/userControllers/login.js";

const router = express.Router();

// Route to register a new user
router.post("/register", register);
// Route to log in an existing user
router.post("/login", login);

export default router;
