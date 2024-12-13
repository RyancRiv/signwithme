const mongoose = require("mongoose");

// Define the lesson schema
const examSchema = new mongoose.Schema(
  {
    examId: {
      type: String,
      required: true,
    },
    examName: {
      type: String,
      required: true,
    },
    userName: {
      type: String,
      required: true,
    },
    progress: {
      type: Number,
      default: 0.0, // Default value is false
    },
  },
  {
    // Create a compound index for lessonId and userName combination
    indexes: [
      {
        fields: { examId: 1, userName: 1 },
        unique: true, // Ensures that lessonId + userName is unique
      },
    ],
  }
);

// Create a model for the lesson schema
const Exam = mongoose.models.Exam || mongoose.model("Exam", examSchema);

module.exports = Exam;
