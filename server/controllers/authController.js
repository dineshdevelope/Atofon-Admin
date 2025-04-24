import User from "../models/user.model.js";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Validate required fields
    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Normalize email and username to lowercase
    const emailLower = email.toLowerCase();
    const usernameLower = username.toLowerCase();

    // Check for existing user with same email or username (case-insensitive)
    let user = await User.findOne({
      $or: [{ email: emailLower }, { username: usernameLower }],
    });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Create new user with normalized fields
    user = new User({
      username: usernameLower,
      email: emailLower,
      password,
    });

    await user.save();

    // Generate JWT
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(201).json({ token });
  } catch (error) {
    // Handle validation and duplicate key errors
    if (error.name === "ValidationError") {
      return res.status(400).json({ message: error.message });
    } else if (error.code === 11000) {
      return res.status(400).json({ message: "User already exists" });
    }
    res.status(500).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate required fields
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    // Normalize email to lowercase
    const emailLower = email.toLowerCase();

    // Find user by email (case-insensitive)
    const user = await User.findOne({ email: emailLower });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Compare passwords
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generate JWT
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
