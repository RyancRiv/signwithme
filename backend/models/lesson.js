const mongoose = require("mongoose");

// Define the lesson schema
const lessonSchema = new mongoose.Schema(
  {
    lessonId: {
      type: String,
      required: true,
    },
    lessonName: {
      type: String,
      required: true,
    },
    unitId: {
      type: String,
      required: true,
    },
    userName: {
      type: String,
      required: true,
    },
    quiz_complete: {
      type: Boolean,
      default: false, // Default value is false
    },
  },
  {
    // Create a compound index for lessonId and userName combination
    indexes: [
      {
        fields: { lessonId: 1, userName: 1 },
        unique: true, // Ensures that lessonId + userName is unique
      },
    ],
  }
);

// Create a model for the lesson schema
const Lesson = mongoose.models.Lesson || mongoose.model("Lesson", lessonSchema);

module.exports = Lesson;
