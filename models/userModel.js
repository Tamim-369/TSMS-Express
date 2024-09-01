import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name field is required"],
  },
  email: {
    type: String,
    required: [true, "Email field is required"],
    unique: [true, "This email already exists. Email must be unique"],
  },
  password: {
    type: String,
    required: [true, "Password field is required"],
  },
});

const User = mongoose.model("User", userSchema);

export default User;
