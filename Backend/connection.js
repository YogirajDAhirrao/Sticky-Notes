const mongoose = require("mongoose"); // Import Mongoose
const dotenv = require("dotenv"); // Import dotenv to handle environment variables
mongoose.set("strictQuery", false); // Allow undefined fields in queries

dotenv.config(); // Load environment variables from .env file

const connectDB = async () => {
  // Create an asynchronous function to connect to MongoDB
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true, // Use the new URL parser (recommended by Mongoose)
      useUnifiedTopology: true, // Use the new unified topology engine
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`); // Log the connection host
  } catch (err) {
    console.error(`Error: ${err.message}`); // Log any connection errors
    process.exit(1); // Exit the process with a failure code (1)
  }
};

module.exports = connectDB; // Export the function to use in other parts of your app
