const Note = require("../model/noteModel"); // Import the Note model

// @desc    Fetch all notes
// @route   GET /api/notes
// @access  Public
const getNotes = async (req, res) => {
  try {
    const notes = await Note.find(); // Fetch all notes from the database
    res.status(200).json(notes); // Send the notes as a JSON response
  } catch (err) {
    res.status(500).json({ error: err.message }); // Handle errors
  }
};

// @desc    Create a new note
// @route   POST /api/notes
// @access  Public
const createNote = async (req, res) => {
  try {
    const { body, colors, position } = req.body;

    const newNote = new Note({
      body,
      colors,
      position,
    });

    const savedNote = await newNote.save(); // Save the note to the database
    res.status(201).json(savedNote); // Return the created note
  } catch (err) {
    res.status(400).json({ error: err.message }); // Handle validation errors
  }
};

// @desc    Update a note
// @route   PUT /api/notes/:id
// @access  Public
const updateNote = async (req, res) => {
  try {
    const { id } = req.params; // Extract note ID from the URL
    const updatedData = req.body; // Extract data to update

    const updatedNote = await Note.findByIdAndUpdate(id, updatedData, {
      new: true,
    }); // Update the note
    if (!updatedNote) {
      return res.status(404).json({ error: "Note not found" }); // Handle missing note
    }

    res.status(200).json(updatedNote); // Return the updated note
  } catch (err) {
    res.status(400).json({ error: err.message }); // Handle errors
  }
};

// @desc    Delete a note
// @route   DELETE /api/notes/:id
// @access  Public
const deleteNote = async (req, res) => {
  try {
    const { id } = req.params; // Extract note ID from the URL

    const deletedNote = await Note.findByIdAndDelete(id); // Delete the note
    if (!deletedNote) {
      return res.status(404).json({ error: "Note not found" }); // Handle missing note
    }

    res.status(200).json({ message: "Note deleted successfully" }); // Send a success message
  } catch (err) {
    res.status(500).json({ error: err.message }); // Handle errors
  }
};

// Export all the controller functions
module.exports = {
  getNotes,
  createNote,
  updateNote,
  deleteNote,
};
