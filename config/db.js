require("dotenv").config();
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected successfully!");
  } catch (err) {
    console.error("MongoDB connection failed:", err.message);
    process.exit(1);
  }
};

module.exports = connectDB;

// const mongoose = require("mongoose");

// const connectDB = async () => {
//   try {
//     await mongoose.connect(
//       "mongodb+srv://contactfixitupinfo:Bk6v2ZxzSyUpcGjR@cluster0.rlluj.mongodb.net/",
//       {
//         useNewUrlParser: true,
//         useUnifiedTopology: true,
//       }
//     );
//     console.log("MongoDB connected successfully!");
//   } catch (err) {
//     console.error("MongoDB connection failed:", err.message);
//     process.exit(1); // Exit process with failure
//   }
// };

// module.exports = connectDB;
