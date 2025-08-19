// Importing necessary libraries and modules
const JWT = require("jsonwebtoken"); // Importing JWT for token verification
const config = require("../config/dbConfig"); // Importing configuration settings, including JWT_SECRET
const dotenv = require("dotenv").config();
const mongoose = require("mongoose");
const UsersModel = mongoose.model("UsersModel"); // Importing the User model

// Middleware for protecting resources
module.exports = async (req, res, next) => {
  try {
    //Extracts the "authorization" header from the request, which contains a JWT token.
    const { authorization } = req.headers;

    // Check if the user is not logged in (no authorization token)
    if (!authorization) {
      return res
        .status(401)
        .json({ error: "Authentication is required. Please log in." });
    }
    console.log(authorization);
    //Bearer hlcjhjlnvlnv
    // Extracting the token (remove "Bearer" prefix)
    const token = authorization.split(" ")[1];
    console.log("Extracted Token:", token);
    // Verifying the JWT token
    const payload = JWT.verify(token, process.env.JWT_SECRET);
    const { userId } = payload;
    // Finding the user based on the ID extracted from the token
    const dbUser = await UsersModel.findById(userId);

    if (!dbUser) {
      return res.status(401).json({ error: "User not found. Please log in." });
    }

    // Attaching the user object to the request for use in subsequent middleware or routes
    req.user = dbUser;
    next();
  } catch (error) {
    console.error(error);
    return res.status(401).json({
      error: "Authentication failed. Please log in.",
      details: error.message,
    });
  }
};
