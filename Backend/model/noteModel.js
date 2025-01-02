const mongoose = require("mongoose");

const NoteSchema = new mongoose.Schema(
  {
    body: {
      type: String,
      required: true, // Ensures that every note has a body
    },
    colors: {
      id: { type: String, required: true },
      colorHeader: { type: String, required: true },
      colorBody: { type: String, required: true },
      colorText: { type: String, required: true },
    },
    position: {
      x: { type: Number, required: true },
      y: { type: Number, required: true },
    },
  },
  { timestamps: true }
); // Automatically adds createdAt and updatedAt fields

module.exports = mongoose.model("Note", NoteSchema);
