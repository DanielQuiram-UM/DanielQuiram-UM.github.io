// src/components/Note.tsx

import { useState } from "react";
import Draggable from "react-draggable"; // Import the draggable library

interface NoteProps {
  noteId: string;
}

export default function Note({ noteId }: NoteProps) {
  const [content, setContent] = useState("This is a draggable note");

  return (
    <Draggable>
      <div
        className="w-64 p-4 bg-yellow-200 rounded shadow-md absolute"
        style={{
          top: "50px",
          left: "50px", // Starting position, can be customized later
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
