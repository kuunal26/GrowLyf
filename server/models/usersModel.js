// Importing Mongoose library for schema and model creation
const mongoose = require("mongoose");

// Defining the User schema
const userSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: true, // FullName is a required field
    },
    lastname: {
      type: String,
      required: true, // LastName is a required field
    },
    email: {
      type: String,
      required: true,
      unique: true, // Email must be unique & is a required field & It is will be the Username for the user
    },
    password: {
      type: String,
      required: true, // Password is a required field
    },
  },
  {
    timestamps: true, // Automatically manage createdAt and updatedAt timestamps
  }
);

// Creating and registering  & also exporting the User model using the schema
module.exports = mongoose.model("UsersModel", userSchema); 
