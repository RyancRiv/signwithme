const mongoose = require("mongoose");

// Define the unit schema
const unitSchema = new mongoose.Schema(
  {
    unitId: {
      type: String,
      required: true,
    },
    userName: {
      type: String,
      required: true,
    },
    unitName: {
      type: String,
      required: true,
    },
    exam_complete: {
      type: Boolean,
      default: false, // Default value is false
    },
  },
  {
    // Create a compound index for unitId and userName combination
    indexes: [
      {
        fields: { unitId: 1, userName: 1 },
        unique: true, // Ensures that unitId + userName is unique
      },
    ],
  }
);

// Create a model for the unit schema
const Unit = mongoose.model("Unit", unitSchema);

module.exports = Unit;
