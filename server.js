const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const connectDB = require("./config/db");
require("dotenv").config();
const orderRoutes = require("./routes/order");
const app = express();
app.use(bodyParser.json());
// app.use(
//   cors({
//     origin: [
//       "https://www.fixitupkit.com",
//       "http://localhost:3000",
//       "https://main.d269i1a354ml7x.amplifyapp.com",
//     ], // Add allowed origins
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     credentials: true,
//   })
// );

app.use(
  cors({
    origin: [
      "https://fixitupkit.com",
      "https://www.fixitupkit.com",
      "http://localhost:3000",
      "https://main.d269i1a354ml7x.amplifyapp.com",
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
  })
);

// handle preflight
app.options("*", cors());


app.use("/api/orders", orderRoutes);

connectDB();

const port = process.env.PORT || 5000;
app.listen(port, () => {
  try {
    console.log(`Server is listening on port ${port}`);
  } catch (error) {
    console.log("Server is not listening ", error);
  }
});
