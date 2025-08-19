// Importing necessary libraries and modules
const UsersModel = require("../models/usersModel");
const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");

// Registration Controller
const registerUser = async (req, res) => {
  try {
    // Extracting user data from the request body
    const { firstname, lastname, email, password } = req.body;

    // Checking if any of the required fields are missing
    if (!firstname || !lastname || !email || !password) {
      return res.status(400).json({ message: "All fields are mandatory" });
    }

    // Validating if a user with the same email already exists
    const existingUser = await UsersModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email is already registered" });
    }

    // Hashing the password before saving it
    const hashedPassword = await bcrypt.hash(password, 10);

    // Creating a new user
    const newUser = new UsersModel({
      firstname,
      lastname,
      email,
      password: hashedPassword,
    });

    // Saving the user to the database
    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Error in registerUser:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Login Controller
const loginUser = async (req, res) => {
  try {
    // Extracting user data from the request body
    const { email, password } = req.body;

    // Checking if required fields are missing
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    // Validating if the email exists in the database
    const user = await UsersModel.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    // Comparing the password with the hashed password stored in the database
    const passwordMatch = await bcrypt.compare(password, user.password);

    // Checking if the password provided by the user matches the hashed password stored in the database
    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }

    // If credentials are valid, generate a JWT token
    const JWTToken = JWT.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h", // Set an expiration time
    });

    res.status(200).json({ token: JWTToken , userId: user._id});
  } catch (error) {
    console.error("Error in loginUser:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Exporting the registration and login function
module.exports = { registerUser, loginUser };