const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const Lesson = require("../models/lesson"); // Assuming you have a lesson model
const Unit = require("../models/unit"); // Make sure to import the Unit model
const Exam = require("../models/exam.js");

const router = express.Router();
const SECRET_KEY = process.env.JWT_SECRET || "secret_key";

// Sign-up route
router.post("/signup", async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Check if the username or email already exists in the database
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "Username or email already exists" });
    }

    // Hash the password and save the user to the database
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });

    // Save the new user
    await newUser.save();

    // Default lessons (lessonId, lessonName) that will be created for the new user
    const defaultLessons = [
      {
        lessonId: 101,
        lessonName: "alphabet",
        unitId: "unit1",
        userName: username,
        quiz_complete: false,
      },
      {
        lessonId: 102,
        lessonName: "finger_spelling",
        unitId: "unit1",
        userName: username,
        quiz_complete: false,
      },
      {
        lessonId: 103,
        lessonName: "greetings",
        unitId: "unit1",
        userName: username,
        quiz_complete: false,
      },
      {
        lessonId: 201,
        lessonName: "grammer",
        unitId: "unit2",
        userName: username,
        quiz_complete: false,
      },
      {
        lessonId: 202,
        lessonName: "noun_adj",
        unitId: "unit2",
        userName: username,
        quiz_complete: false,
      },
      {
        lessonId: 203,
        lessonName: "verb_colors",
        unitId: "unit2",
        userName: username,
        quiz_complete: false,
      },
      {
        lessonId: 301,
        lessonName: "numbers",
        unitId: "unit3",
        userName: username,
        quiz_complete: false,
      },
    ];

    const defaultUnits = [
      {
        unitName: "basics",
        unitId: "unit1",
        userName: username,
        exam_complete: false,
      },
      {
        unitName: "intermediate",
        unitId: "unit2",
        userName: username,
        exam_complete: false,
      },
      {
        unitName: "advanced",
        unitId: "unit3",
        userName: username,
        exam_complete: false,
      },
    ];

    const defaultExams = [
      {
        examName: "finalExam",
        examId: "final",
        userName: username,
        progress: 0.0,
      },
    ];
    // Add the default lessons and units for the user to the database
    await Lesson.insertMany(defaultLessons); // Insert lessons
    await Unit.insertMany(defaultUnits); // Insert units
    await Exam.insertMany(defaultExams);

    res.status(201).json({
      message: "User created successfully, lessons and units initialized",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Sign-in route
router.post("/signin", async (req, res) => {
  const { username, password } = req.body;

  try {
    // Find the user by username
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generate a JWT token
    const token = jwt.sign(
      { id: user._id, username: user.username },
      SECRET_KEY,
      {
        expiresIn: "1h",
      }
    );

    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
