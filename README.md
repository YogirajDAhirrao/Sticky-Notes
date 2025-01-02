# Sticky Notes

A modern Sticky Notes application built with the MERN (MongoDB, Express.js, React.js, Node.js) stack. This app allows users to create, manage, and customize notes with drag-and-drop functionality.

---

## Features

- **Drag-and-Drop Notes**: Easily move notes to any position on the screen.
- **Persistent Notes**: Notes' positions and content are saved to the backend, ensuring data retention.
- **Create and Delete Notes**: Add new notes and delete existing ones seamlessly.
- **Customizable Appearance**: Modify the header, body, and text color for each note.
- **Auto-Growing Text Area**: Text areas dynamically resize based on content for a better user experience.

---

## Folder Structure

### Backend (`Sticky Notes`)
- `controller/`: Handles the business logic of the app.
- `model/`: Contains the database schema and interactions with MongoDB.
- `routes/`: Defines the API routes for CRUD operations.
- `.env`: Stores environment variables such as database URIs and secret keys.
- `.gitignore`: Specifies files and directories to be ignored by Git.
- `connection.js`: Manages the connection to the MongoDB database.
- `index.js`: Entry point for the backend server.

### Frontend (`StickyNotes`)
- `public/`: Contains static files like `index.html`.
- `src/`: Contains the React components and application logic.
- `.gitignore`: Specifies files and directories to be ignored by Git.
- `eslint.config.js`: Configuration file for linting JavaScript code.
- `vite.config.js`: Configuration for the Vite build tool.
- `package.json`: Specifies project dependencies and scripts.
- `README.md`: Project documentation.

---

## Getting Started

### Prerequisites
Ensure you have the following installed:
- Node.js
- MongoDB
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/sticky-notes-app.git
   ```

2. Navigate to the backend folder and install dependencies:
   ```bash
   cd Sticky Notes
   npm install
   ```

3. Create a `.env` file in the `Sticky Notes` directory with the following variables:
   ```env
   MONGO_URI=your_mongodb_connection_string
   PORT=8000
   ```

4. Start the backend server:
   ```bash
   npm start
   ```

5. Navigate to the frontend folder and install dependencies:
   ```bash
   cd ../StickyNotes
   npm install
   ```

6. Start the frontend server:
   ```bash
   npm run dev
   ```

7. Open your browser and navigate to:
   ```
   http://localhost:5173
   ```

---

## Future Enhancements
1. Add **user authentication** for personal note management.
2. Integrate **tagging and search functionality** for better note organization.
3. Enable **sharing notes** with other users.

---

## License
This project is open-source and available under the MIT License.
