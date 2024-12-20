/* eslint-disable no-undef */
const express = require("express");
const multer = require("multer");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");

const app = express();
const PORT = 5000;

// Enable CORS
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB connection
mongoose
  .connect("mongodb://localhost:27017/upload")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Create schema to store file information
const fileSchema = new mongoose.Schema({
  filename: { type: String, unique: true }, // Ensure unique filenames
  path: String,
  mimetype: String,
  size: Number,
});

const File = mongoose.model("Photo", fileSchema);

// Configure multer for file upload
const upload = multer({ dest: path.resolve(__dirname, "uploads") });

// Handle file upload
app.post("/upload", upload.single("photo"), async (req, res) => {
  if (!req.file) {
    return res.json({ message: "No file uploaded" });
  }

  try {
    // Check if a file with the same name already exists
    const existingFile = await File.findOne({
      filename: req.file.originalname,
    });

    if (existingFile) {
      return res.json({ message: "File already exists", file: existingFile });
    }

    // Save new file details to the database
    const fileData = new File({
      filename: req.file.originalname,
      path: req.file.path,
      mimetype: req.file.mimetype,
      size: req.file.size,
    });

    await fileData.save();
    res.json({ message: "File uploaded successfully", file: fileData });
  } catch (err) {
    console.error("Error:", err);
    res.json({ message: "Error saving file to database", error: err });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
