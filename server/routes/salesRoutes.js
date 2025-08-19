// Importing necessary libraries and modules
const express = require("express");
const salesRouter = express.Router();
const { addSalesEntry, getTopSales, getTotalRevenue  } = require ("../controllers/salesController");
const authMiddleware = require("../middleware/authMiddleware");

// Defining a POST route for adding sales
salesRouter.post("/api/user/add-sales", authMiddleware, addSalesEntry);

// Defining a GET route for top 5 sales of today
salesRouter.get("/api/user/top-sales", getTopSales);

// Defining a GET route for total revenue
console.log('Registering route: GET /api/user/total-revenue');
salesRouter.get("/api/user/total-revenue", getTotalRevenue);


// Export the sales router as "authRouter"
module.exports = salesRouter;
