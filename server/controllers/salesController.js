// Importing necessary libraries and modules
const SalesModel = require("../models/salesModel");

// Add Sales Controller
const addSalesEntry = async (req, res) => {
  try {
    // Destructure the product, quantity, and rate from the request body
    const { product, quantity, rate } = req.body;

    // Calculate the total amount by multiplying quantity and rate
    const amount = quantity * rate;

    // Create a new SalesModel instance with product, quantity, rate, and amount
    const newSale = new SalesModel({
      product,
      quantity,
      rate,
      amount,
    });

    // Save the new sale entry to the database
    await newSale.save();

    // Respond with a 201 status code and a JSON message for a successful sale entry
    res.status(201).json({ message: "Sale added successfully", sale: newSale });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" }); 
  }
};

// Top 5 Sales of the day (today)
const getTopSales = async (req, res) => {
  try {
    // Get the current date
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Setting hours, minutes, seconds, and milliseconds to 0 for comparison

    // Aggregate sales data to find the top 5 sales of the day
    const topSales = await SalesModel.aggregate([
      {
        $match: {
          createdAt: { $gte: today }, // Filter sales created today
        },
      },
      {
        $group: {
          _id: "$product",
          salesId: { $first: "$_id" }, 
          product: { $first: "$product"},
          totalAmount: { $sum: "$amount" },
          quantity: { $sum: "$quantity" }, 
        },
      },
      {
        $sort: { totalAmount: -1 }, // Sort in descending order by totalAmount
      },
      {
        $limit: 5, // Limit to the top 5 sales
      },
    ]);

    res.status(200).json({ topSales });
  } catch (error) {
    console.error("Error in getTopSales:", error);
    res.status(500).json({ message: "Internal server error at getTopSales" });
  }
};

// Total Revenue
const getTotalRevenue = async (req, res) => {
  try {
    // Aggregate sales data to calculate the total revenue of all time
    const totalRevenue = await SalesModel.aggregate([
      {
        $group: {
          _id: null, // Group all documents together
          totalAmount: { $sum: "$amount" }, // Calculate the sum of the 'amount' field
        },
      },
    ]);
    console.log('Request received at getTotalRevenue controller');

    // Extract the total revenue from the result
    const result = totalRevenue.length > 0 ? totalRevenue[0].totalAmount : 0;

    res.status(200).json({ totalRevenue: result });
  } catch (error) {
    console.error('Error in getTotalRevenue controller:', error);
    res.status(500).json({ message: "Internal server error at getTotalRevenue" });
  }
};


// Exporting the Add Sales, Top 5 sales of the day, and Total Revenue controllers
module.exports = { addSalesEntry, getTopSales, getTotalRevenue };
