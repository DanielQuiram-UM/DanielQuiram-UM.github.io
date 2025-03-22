import { useState } from "react";
import Draggable from "react-draggable"; // Import the draggable library

interface NoteProps {
  noteId: string;
  x: number; // Initial x position
  y: number; // Initial y position
  updateNotePosition: (id: string, x: number, y: number) => void; // Callback to update position
}

export default function Note({ noteId, x, y, updateNotePosition }: NoteProps) {
  const [content, setContent] = useState("This is a draggable note");

  // Handle drag event to update the position of the note
  const handleDrag = (e: any, data: any) => {
    // Updating the position of the note after drag
    updateNotePosition(noteId, data.x, data.y);
  };

  return (
    <Draggable
      defaultPosition={{ x, y }} // Initial position of the note
      onDrag={handleDrag} // Call handleDrag to update the position
    >
      <div
        className="w-64 p-4 bg-yellow-200 rounded shadow-md absolute"
        style={{
          top: "0", // Use default positioning from Draggable
          left: "0", // Use default positioning from Draggable
        }}
      >
        <div className="flex justify-between items-center mb-2">
          <h4 className="font-semibold text-lg">Note {noteId}</h4>
          <button
            className="text-red-500"
            onClick={() => setContent("")} // Clear content when clicking delete
          >
            🗑️
          </button>
        </div>
        <textarea
          className="w-full p-2 border rounded"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </div>
    </Draggable>
  );
}
