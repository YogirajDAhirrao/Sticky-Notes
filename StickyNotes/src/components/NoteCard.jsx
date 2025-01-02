import { useRef, useEffect, useState } from "react";
import Trash from "../icons/Trash";
import { setNewOffset, setZIndex } from "../utils.js";
import AddSign from "../icons/Add.jsx";

const NoteCard = ({ note, onDelete, setNotes }) => {
  const [position, setPosition] = useState(note.position);
  const cardRef = useRef(null);
  const colors = note.colors;
  const body = note.body;
  const textAreaRef = useRef(null);
  useEffect(() => {
    autoGrow(textAreaRef);
  }, []);
  let mouseStartPos = { x: 0, y: 0 };

  // Update the note in the backend
  const updateNoteInBackend = async (noteId, updatedData) => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/notes/${noteId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update the note");
      }

      const updatedNote = await response.json();
      console.log("Note updated:", updatedNote);
    } catch (error) {
      console.error("Error updating note:", error);
    }
  };

  // Handle the mouse down event to start dragging
  const mouseDown = (e) => {
    mouseStartPos.x = e.clientX;
    mouseStartPos.y = e.clientY;
    setZIndex(cardRef.current);

    document.addEventListener("mousemove", mouseMove);
    document.addEventListener("mouseup", mouseUp);
  };

  // Handle the mouse move event to update note position
  const mouseMove = (e) => {
    let mouseMoveDir = {
      x: mouseStartPos.x - e.clientX,
      y: mouseStartPos.y - e.clientY,
    };

    mouseStartPos.x = e.clientX;
    mouseStartPos.y = e.clientY;

    const newPosition = setNewOffset(cardRef.current, mouseMoveDir);
    setPosition(newPosition);
  };
  useEffect(() => {
    const updateNoteInBackend = async () => {
      try {
        const response = await fetch(
          `http://localhost:8000/api/notes/${note._id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ position }),
          }
        );

        if (!response.ok) {
          throw new Error("Failed to update the note");
        }

        console.log("Note updated:", position);
      } catch (error) {
        console.error("Error updating note:", error);
      }
    };

    // Only call update when position changes
    if (position) {
      updateNoteInBackend(); // Update backend when position changes
    }
  }, [position, note._id]);

  // Reset the textarea height and auto-grow
  function autoGrow(textAreaRef) {
    const { current } = textAreaRef;
    current.style.height = "auto";
    current.style.height = current.scrollHeight + "px";
  }

  // Handle mouse up event to stop dragging and save position
  const mouseUp = () => {
    document.removeEventListener("mousemove", mouseMove);
    document.removeEventListener("mouseup", mouseUp);

    // Update position in the backend
    updateNoteInBackend(note._id, { position });
  };

  // Handle text area change to update content in the backend
  const handleTextChange = () => {
    autoGrow(textAreaRef);

    // Update body in the backend
    updateNoteInBackend(note._id, { body: textAreaRef.current.value });
  };
  const getRandomColor = () => {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  };

  const addNote = async () => {
    try {
      const response = await fetch(`http://localhost:8000/api/notes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          body: "New note content", // Placeholder content
          position: { x: 100, y: 100 }, // Starting position
          colors: {
            id: "uniqueColorId123", // Add color ID if necessary
            colorBody: getRandomColor(), // Random color for the body
            colorHeader: getRandomColor(), // Random color for the header
            colorText: getRandomColor(), // Random color for the text
          },
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to add the note");
      }

      const newNote = await response.json();
      setNotes((prevNotes) => [...prevNotes, newNote]); // Add new note to state
    } catch (error) {
      console.error("Error adding note:", error);
    }
  };

  // Delete the note by sending a DELETE request to the backend
  const deleteNote = async () => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/notes/${note._id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete the note");
      }

      // Call the onDelete callback to remove the note from the UI
      onDelete(note._id);
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  return (
    <div
      className="card"
      style={{
        backgroundColor: colors.colorBody,
        left: `${position.x}px`,
        top: `${position.y}px`,
      }}
      ref={cardRef}
    >
      <div
        className="card-header"
        style={{ backgroundColor: colors.colorHeader }}
        onMouseDown={mouseDown}
      >
        <Trash deleteOnClick={deleteNote} />
        <AddSign addonClick={addNote} />
      </div>
      <div className="card-body">
        <textarea
          ref={textAreaRef}
          style={{ color: colors.colorText }}
          defaultValue={body}
          onInput={handleTextChange}
          onFocus={() => {
            setZIndex(cardRef.current);
          }}
        ></textarea>
      </div>
    </div>
  );
};

export default NoteCard;
