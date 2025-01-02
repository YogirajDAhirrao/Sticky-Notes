const express = require("express");
const connectDB = require("./connection");
const noteRoutes = require("./routes/notes");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Parse JSON request bodies

// Connect to MongoDB
connectDB();

// Routes
app.use("/api/notes", noteRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
