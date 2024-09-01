import User from "../../models/userModel.js";
import jwt from "jsonwebtoken";
import { validate } from "../../utils/verifyFields.js";
import bcrypt from "bcrypt";

export const login = async (req, res) => {
  try {
    const { email, password } = req.body; // Extract email and password from request body

    // Validate the input fields
    const validity = validate({ email, password });
    if (validity.valid === false) {
      return res.status(400).json({ message: validity.message }); // Return 400 if validation fails
    }

    // Validate email length
    if (email.length < 8) {
      return res
        .status(400)
        .json({ message: "Email must be greater than 8 characters" });
    }

    // Validate password length
    if (password.length < 8 || password.length > 200) {
      return res.status(400).json({
        message: "Password must be greater than 8 and less than 200 characters",
      });
    }

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email" }); // Return 401 if user not found
    }

    // Compare provided password with stored hashed password
    const isPasswordValid = await bcrypt.compare(
      password.toString(),
      user.password.toString()
    );
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password" }); // Return 401 if password is incorrect
    }

    // Generate a JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    }); // Added expiration time for security

    // Validate the generated token

    if (!validate([token])) {
      return res.status(401).json({
        message:
          "There was a problem while creating the token. Please try again later",
      });
    }

    // Return the token in the response
    return res.json({ token });
  } catch (error) {
    // Log the error for debugging and return a 400 status with an error message
    console.error(error.message);
    return res.status(400).json({ message: error.message });
  }
};
