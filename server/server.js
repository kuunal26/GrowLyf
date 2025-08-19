// Importing necessary libraries and modules
const express = require("express");
const dotenv = require("dotenv").config();
const dbConnect = require("./config/dbConfig");
const cors = require("cors"); // Enable Cross-Origin Resource Sharing

// Creating an Express application
const app = express();

// Setting up the server port, default to 5000
const PORT = process.env.PORT || 5000;

// Connecting to the database
dbConnect();

// Body parsing middleware of incoming JSON requests
app.use(express.json()); 

// Setting up CORS middleware to handle cross-origin requests
app.use(cors());

// Including the models
require("./models/usersModel"); // User Model
require("./models/salesModel"); // Sales Model

// Including the authorization routes (register and login)
const authRouter = require("./routes/authRoutes");
app.use(authRouter);

// Including the sales routes (add sales, top5sales, total-revenue)
const salesRouter = require("./routes/salesRoutes");
app.use(salesRouter);

// Starting the server and listening on the specified port
app.listen(PORT, () => {
  console.log(`Server is running on Port: ${PORT}`);
});