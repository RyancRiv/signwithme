const express = require("express");
const multer = require("multer");
const axios = require("axios");
const fs = require("fs");
const path = require("path");
const cors = require("cors");

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Debug logging for upload directory
console.log("📁 Upload directory:", uploadDir);
console.log("🔍 Directory exists:", fs.existsSync(uploadDir));
try {
  fs.accessSync(uploadDir, fs.constants.W_OK);
  console.log("✅ Directory is writable");
} catch (err) {
  console.error("❌ Directory is not writable:", err);
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir); // Using absolute path
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 50 * 1024 * 1024 } // 50MB limit
});

// Enhanced upload endpoint with better error handling
app.post("/upload", upload.single("myFile"), (req, res) => {
  if (!req.file) {
    console.error("❌ No file received in upload");
    return res.status(400).json({ 
      success: false,
      error: "No file received",
      details: req.body
    });
  }

  try {
    console.log(`✅ File saved successfully: ${req.file.filename}`);
    console.log(`📁 Location: ${req.file.path}`);
    console.log(`📦 Size: ${req.file.size} bytes`);
    
    res.json({ 
      success: true,
      message: "File uploaded and saved!",
      filename: req.file.originalname,
      path: req.file.path,
      size: req.file.size
    });
  } catch (err) {
    console.error("❌ File save error:", err);
    res.status(500).json({ 
      success: false,
      error: "File save failed",
      details: err.message
    });
  }
});

// Rest of your existing endpoints remain the same
app.get("/files", (req, res) => {
  fs.readdir(uploadDir, (err, files) => {
    if (err) {
      console.error("❌ Error reading uploads directory:", err);
      return res.status(500).json({ 
        error: "Unable to read uploads",
        details: err.message
      });
    }
    res.json(files);
  });
});

app.get("/download/:filename", (req, res) => {
  const filePath = path.join(uploadDir, req.params.filename);
  res.download(filePath, (err) => {
    if (err) {
      console.error("❌ Download error:", err);
      res.status(404).json({ error: "File not found" });
    }
  });
});

app.post("/api/download-avatar", async (req, res) => {
  const { url } = req.body;

  if (!url) {
    return res.status(400).json({ 
      success: false, 
      message: "URL is required." 
    });
  }

  try {
    const response = await axios.get(url, { responseType: "arraybuffer" });
    const filePath = path.join(uploadDir, "collected_avatar.glb");

    fs.writeFileSync(filePath, response.data);
    console.log("✅ Avatar downloaded and saved to:", filePath);
    console.log("📂 Current files in uploads:", fs.readdirSync(uploadDir));

    return res.status(200).json({ 
      success: true, 
      message: "Avatar downloaded successfully!",
      path: filePath
    });
  } catch (error) {
    console.error("❌ Error downloading avatar:", error);
    return res.status(500).json({ 
      success: false, 
      message: "Failed to download avatar.",
      error: error.message
    });
  }
});

app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
  console.log(`📁 Upload directory: ${uploadDir}`);
});