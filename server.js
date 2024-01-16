const express = require("express");
const cors = require("cors");
const app = express();
const connectDB = require("./config/connectDB");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const cloudinary = require("cloudinary");
const swaggerUi = require("swagger-ui-express");
const swaggerDocs = require("./utils/swagger");
const errorMiddleware = require("./middleware/error");

// Initialize dotenv configuration
require("dotenv").config();

// Handling Uncaught Exception
process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server due to Uncaught Exception`);
  process.exit(1);
});

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Connect to MongoDB
connectDB();

// Enable CORS for all routes
app.use(cors());

// Define a simple route
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(fileUpload());
app.use(express.json({ limit: "50mb" }));

// Thiết lập Swagger UI
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Route Imports
const user = require("./routes/userRoute");
const menu = require("./routes/menuRoute");

app.use("/api/v1", menu);
app.use("/api/v1", user);

// Middleware for Errors
app.use(errorMiddleware);

// Start the server
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

// Unhandled Promise Rejection
process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server due to Unhandled Promise Rejection`);

  server.close(() => {
    process.exit(1);
  });
});
