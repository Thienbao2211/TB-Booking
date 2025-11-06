const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, ".env") });

const express = require("express");
const upload = require("./middleware/multer");
const cloudinary = require("./utils/cloudinary");
const cors = require("cors");
const fs = require("fs");

const app = express();
app.use(express.json());
app.use(cors());

// Log Cloudinary env on startup for debugging
console.log('Startup env:', {
  CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME || null,
  CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY || null,
  CLOUDINARY_SECRET_KEY: process.env.CLOUDINARY_API_SECRET || null,
});

app.get("/", (req, res) => {
  res.send("Send post request to /upload to upload image");
});

// Upload endpoint: receives multipart/form-data with field name 'image'
app.post("/upload", upload.single("image"), async (req, res) => {
  if (!req.file || !req.file.path) {
    return res.status(400).json({ success: false, message: "No file uploaded" });
  }

  // Debug: log file and Cloudinary env presence
  console.log("/upload called. tmpFile=", req.file.path);
  console.log("CLOUDINARY env:", {
    cloud_name: !!process.env.CLOUDINARY_CLOUD_NAME,
    api_key: !!process.env.CLOUDINARY_API_KEY,
    api_secret: !!process.env.CLOUDINARY_SECRET_KEY,
  });

  try {
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "tb-booking",
    });

    // Remove temp file
    fs.unlink(req.file.path, (err) => {
      if (err) console.warn("Failed to remove temp file:", err.message);
    });

    return res.status(200).json({ success: true, message: "Uploaded!", data: result });
  } catch (err) {
    console.error("Cloudinary upload error:", err);
    // Try remove temp file if exists
    if (req.file && req.file.path) {
      fs.unlink(req.file.path, () => {});
    }
    return res.status(500).json({ success: false, message: "Upload failed", error: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`listening at http://localhost:${PORT}`));