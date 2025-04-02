require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const axios = require("axios");

// Import the auth routes
const authRoutes = require("./routes/authcall");
const lessonRoutes = require("./routes/lessonRoutes");

const app = express();
const port = process.env.PORT || 5001;

// Middleware
app.use(bodyParser.json());
app.use(
  cors({
    origin: [
<<<<<<< HEAD
      "http://localhost:3000",
      "https://your-frontend-url.vercel.app", 
=======
      "http://localhost:3000", // Local testing
      "https://your-frontend-url.vercel.app", // Replace with your Vercel frontend URL
>>>>>>> 00cee03e77e9ce199b4c8bf70865a4522679c90c
    ],
  })
);
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.DATABASE_CONNECTION_STRING);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => console.log("Connected to MongoDB"));

// Landing route
app.get("/", (req, res) => {
  res.status(200).send("A different message!");
});

// API routes
app.use("/api", authRoutes);
app.use("/api/lessons", lessonRoutes);

// Avatar download route
app.get("/download-avatar", async (req, res) => {
  const { url } = req.query;

  if (!url) {
    return res.status(400).send("Missing avatar URL.");
  }

  try {
    const response = await axios.get(url, { responseType: "stream" });

    // Set headers to force download
    res.setHeader("Content-Disposition", 'attachment; filename="avatar.glb"');
    res.setHeader("Content-Type", "model/gltf-binary");

    response.data.pipe(res); 
  } catch (error) {
    res.status(500).send("Error downloading avatar.");
  }
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

// Start the server
app.listen(port, () => {
  console.log(`Server started listening at port ${port}`);
});
