// // const express = require("express");
// // const cors = require("cors");
// // const mongoose = require("mongoose");

// const app = express();
// app.use(cors());
// app.use(express.json());

// // Connect to MongoDB
// mongoose
//   .connect("mongodb://127.0.0.1:27017/InputF")
//   .then(() => console.log("MongoDB connected successfully"))
//   .catch((err) => console.error("MongoDB connection error:", err));

// // Define the Schema
// const User = mongoose.model("User", {
//   name: String,
//   email: String,
//   password: String,
// });

// // Handle POST request
// app.post("/InputF", async (req, res) => {
//   try {
//     const { name, email, password } = req.body;

//     // Check if user already exists
//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(400).json({ message: "User already exists" });
//     }

//     // Create a new user
//     const newUser = await User.create({ name, email, password });
//     res
//       .status(201)
//       .json({ message: "User created successfully", user: newUser });
//   } catch (error) {
//     res.status(500).json({ message: "Internal server error", error });
//   }
// });

// // Start server
// const PORT = 4002;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });
