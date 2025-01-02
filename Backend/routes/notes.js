const express = require("express");
const router = express.Router();
const {
  getNotes,
  createNote,
  updateNote,
  deleteNote,
} = require("../controller/noteController");

// GET /api/notes - Fetch all notes
router.get("/", getNotes);

// POST /api/notes - Create a new note
router.post("/", createNote);

// PUT /api/notes/:id - Update a note
router.put("/:id", updateNote);

// DELETE /api/notes/:id - Delete a note
router.delete("/:id", deleteNote);

module.exports = router;
