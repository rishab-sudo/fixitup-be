const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const serverless = require("serverless-http");
const connectDB = require("./config/db");
const orderRoutes = require("./routes/order");

require("dotenv").config();
const app = express();

// Middleware
app.use(bodyParser.json());
app.use(
  cors({
    origin: [
      "http://your-frontend-url.com",
      "http://localhost:3000",
      "https://main.d269i1a354ml7x.amplifyapp.com",
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// Routes
app.use("/api/orders", orderRoutes);

// Connect MongoDB
connectDB();

// Export as Lambda function
module.exports.handler = serverless(app);
