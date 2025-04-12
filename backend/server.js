const express = require("express");
const multer = require("multer");
const axios = require("axios");
const fs = require("fs");
const path = require("path");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

require("dotenv").config();

const authRoutes = require("./routes/authcall");
const lessonRoutes = require("./routes/lessonRoutes");

const app = express();
const port = process.env.PORT || 5000;

// ========== Middleware ==========
app.use(bodyParser.json());
app.use(express.json());
app.use(cors({
  origin: [
    "http://localhost:3000",
    "http://localhost:3001",
    "https://your-frontend-url.vercel.app",
  ],
}));
app.use(express.static(path.join(__dirname, "public")));

// ========== MongoDB Connection ==========
mongoose.connect(process.env.DATABASE_CONNECTION_STRING, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => console.log("✅ Connected to MongoDB"));

// ========== Routes ==========
app.get("/", (req, res) => {
  res.status(200).send("🌐 Backend Server Running!");
});
app.use("/api", authRoutes);
app.use("/api/lessons", lessonRoutes);

// ========== Upload Setup ==========
const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}
console.log("📁 Upload directory:", uploadDir);

try {
  fs.accessSync(uploadDir, fs.constants.W_OK);
  console.log("✅ Upload directory is writable");
} catch (err) {
  console.error("❌ Upload directory is not writable:", err);
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => cb(null, file.originalname),
});

const upload = multer({
  storage,
  limits: { fileSize: 50 * 1024 * 1024 },
});

// ========== File Upload Endpoints ==========
app.post("/upload", upload.single("myFile"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ success: false, error: "No file received", details: req.body });
  }

  res.json({
    success: true,
    message: "File uploaded and saved!",
    filename: req.file.originalname,
    path: req.file.path,
    size: req.file.size,
  });
});

app.get("/files", (req, res) => {
  fs.readdir(uploadDir, (err, files) => {
    if (err) {
      return res.status(500).json({ error: "Unable to read uploads", details: err.message });
    }
    res.json(files);
  });
});

app.get("/download/:filename", (req, res) => {
  const filePath = path.join(uploadDir, req.params.filename);
  res.download(filePath, (err) => {
    if (err) {
      res.status(404).json({ error: "File not found" });
    }
  });
});

app.post("/api/download-avatar", async (req, res) => {
  const { url } = req.body;
  if (!url) {
    return res.status(400).json({ success: false, message: "URL is required." });
  }

  try {
    const response = await axios.get(url, { responseType: "arraybuffer" });
    const filePath = path.join(uploadDir, "collected_avatar.glb");
    fs.writeFileSync(filePath, response.data);

    return res.status(200).json({
      success: true,
      message: "Avatar downloaded successfully!",
      path: filePath,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to download avatar.",
      error: error.message,
    });
  }
});

// ========== Error Handler ==========
app.use((err, req, res, next) => {
  console.error("❌ Server error:", err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

// ========== Start Server ==========
app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
});
