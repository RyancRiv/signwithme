const express = require("express");
const multer = require("multer");
const axios = require("axios");
const fs = require("fs");
const path = require("path");

const app = express();
const port = 3000;

app.use(express.json()); // For JSON body parsing
app.use(express.static(path.join(__dirname, "public"))); // Serve static files

// Make sure uploads folder exists
const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Setup multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, file.originalname),
});
const upload = multer({ storage });

/* ------------------------ API ENDPOINTS ------------------------ */

// Upload a file
app.post("/upload", upload.single("myFile"), (req, res) => {
  if (!req.file) return res.status(400).send("No file uploaded");
  console.log(`✅ File saved: ${req.file.originalname}`);
  res.json({ message: "File uploaded and saved!" });
});

// View list of uploaded files
app.get("/files", (req, res) => {
  fs.readdir("uploads", (err, files) => {
    if (err) return res.status(500).json({ error: "Unable to read uploads" });
    res.json(files);
  });
});

// Download a specific uploaded file
app.get("/download/:filename", (req, res) => {
  const filePath = path.join(__dirname, "uploads", req.params.filename);
  res.download(filePath);
});

// Download an avatar from a URL and save it
app.post("/api/download-avatar", async (req, res) => {
  const { url } = req.body;

  if (!url) {
    return res.status(400).json({ success: false, message: "URL is required." });
  }

  try {
    const response = await axios.get(url, { responseType: "arraybuffer" });

    const filePath = path.join(
      __dirname,
      "uploads", // Save to uploads folder too
      "collected_avatar.glb"
    );

    fs.writeFileSync(filePath, response.data);
    console.log("🧍 Avatar downloaded and saved to:", filePath);

    return res.status(200).json({ success: true, message: "Avatar downloaded successfully!" });
  } catch (error) {
    console.error("❌ Error downloading avatar:", error);
    return res.status(500).json({ success: false, message: "Failed to download avatar." });
  }
});

/* ------------------------ START SERVER ------------------------ */

app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
});
