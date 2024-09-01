import User from "../../models/userModel.js";
import jwt from "jsonwebtoken";
import { checkExistence } from "../../utils/verifyFields.js";
import bcrypt from "bcrypt";

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body; // Extract name, email, and password from request body

    // checkExistence the input fields
    const isExist = checkExistence({ name, email, password });
    if (isExist.exist === false) {
      return res.status(400).json({ message: validity.message }); // Return 400 if validation fails
    }

    // checkExistence name length
    if (name.length < 4 || name.length > 200) {
      return res.status(400).json({
        message: "Name must be greater than 4 and less than 200 characters",
      });
    }

    // checkExistence password length
    if (password.length < 8 || password.length > 200) {
      return res.status(400).json({
        message: "Password must be greater than 8 and less than 200 characters",
      });
    }

    // checkExistence email length
    if (email.length < 8) {
      return res.status(400).json({
        message: "Email must be greater than 8 characters",
      });
    }

    // Check if a user already exists with the provided email
    const isUserExist = await User.findOne({ email });
    if (isUserExist) {
      return res.status(400).json({ message: "User already exists" }); // Return 400 if user already exists
    }

    // Hash the password before storing it in the database
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user instance with the hashed password
    const user = new User({ name, email, password: hashedPassword });
    await user.save(); // Save the user to the database

    // Return a success message with a 201 status
    return res.status(201).json({ message: "User registered successfully" });
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
