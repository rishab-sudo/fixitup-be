const functions = require("firebase-functions/v1");
const express = require("express");
const cors = require("cors");
const orderRoutes = require("./routes/order");

const app = express();

// Enable CORS for frontend & Postman requests
app.use(
  cors({
    origin: true, // Allow all origins (Postman + frontend)
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.use(express.json());

// Handle CORS preflight requests explicitly
app.options("*", cors());

// Use order routes
app.use("/api/orders", orderRoutes);

// Deploy function to Firebase
exports.api = functions.region("asia-south1").https.onRequest(app);

// const functions = require("firebase-functions/v1");
// const express = require("express");
// const cors = require("cors");
// const orderRoutes = require("./routes/order");

// const app = express();

// // Middleware
// app.use(express.json());

// // Enable CORS for specific origins
// app.use(cors({
//   origin: [
//     "http://your-frontend-url.com",
//     "http://localhost:3000",
//     "https://main.d269i1a354ml7x.amplifyapp.com"
//   ],
//   methods: ["GET", "POST", "PUT", "DELETE"],
//   credentials: true
// }));

// // Apply routes
// app.use("/api/orders", orderRoutes);

// // Export Firebase function
// exports.api = functions.region("asia-south1").https.onRequest(app);
