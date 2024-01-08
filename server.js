const express = require("express");
const cors = require("cors");
const app = express();
const connectDB = require("./config/connectDB");

// Initialize dotenv configuration
require("dotenv").config();

// Connect to MongoDB
connectDB();

// Enable CORS for all routes
app.use(cors());

// Define a simple route
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
