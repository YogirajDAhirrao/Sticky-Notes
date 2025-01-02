import { useState, useEffect } from "react";
import NoteCard from "../components/NoteCard"; // Assuming you have a NoteCard component

const NotesPage = () => {
  const [notes, setNotes] = useState([]); // State to store fetched notes
  const [isLoading, setIsLoading] = useState(true); // State to track loading status
  const [error, setError] = useState(null); // State to store any potential errors

  // Fetch notes from backend on component mount
  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/notes"); // Make sure this is the correct backend URL
        if (!response.ok) {
          throw new Error("Failed to fetch notes");
        }
        const data = await response.json();
        setNotes(data); // Set the notes in the state
      } catch (err) {
        setError(err.message); // Set the error if any
      } finally {
        setIsLoading(false); // Turn off loading when the fetch is done
      }
    };

    fetchNotes(); // Call the function to fetch notes
  }, []); // Empty dependency array ensures it runs only once when the component mounts

  if (isLoading) {
    return <div>Loading...</div>; // Show loading message while fetching data
  }

  if (error) {
    return <div>Error: {error}</div>; // Show error if fetch fails
  }
  const handleDeleteNote = (noteId) => {
    // Filter out the deleted note from the notes state
    setNotes((prevNotes) => prevNotes.filter((note) => note._id !== noteId));
  };

  return (
    <div>
      {notes.map((note) => (
        <NoteCard
          note={note}
          key={note._id}
          onDelete={handleDeleteNote}
          notes={notes}
          setNotes={setNotes}
        />
      ))}
    </div>
  );
};

export default NotesPage;
