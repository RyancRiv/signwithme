require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

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
      "http://localhost:3001", // Local testing
      "https://your-frontend-url.vercel.app", // Replace with your Vercel frontend URL
    ],
  })
);
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.DATABASE_CONNECTION_STRING, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
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

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

// Start the server
app.listen(port, () => {
  console.log(`Server started listening at port ${port}`);
});
