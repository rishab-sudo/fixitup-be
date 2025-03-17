const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();
const orderRoutes = require("./functions/routes/order");

const app = express();
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

app.use("/api/orders", orderRoutes);

const port = process.env.PORT || 5001;
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
