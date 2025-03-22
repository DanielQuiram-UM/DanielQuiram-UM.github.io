import { useState } from "react";
import { v4 as uuidv4 } from "uuid"; // Import uuidv4 from the 'uuid' library
import Navbar from "./components/Navbar";
import Menubar from "./components/Menubar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Workspace from "./components/Workspace";

export default function App() {
  const [canvasName, setCanvasName] = useState(""); // Store the canvas name
  const [notes, setNotes] = useState<{ id: string; x: number; y: number }[]>(
    []
  ); // Track notes

  // Add a new note to the canvas
  const addNote = (x: number, y: number) => {
    const newNote = {
      id: uuidv4(), // Generate a unique id using uuidv4
      x,
      y,
    };
    setNotes((prevNotes) => [...prevNotes, newNote]);
  };

  // Update the position of an existing note
  const updateNotePosition = (id: string, x: number, y: number) => {
    setNotes((prevNotes) =>
      prevNotes.map((note) => (note.id === id ? { ...note, x, y } : note))
    );
  };

  return (
    <BrowserRouter>
      <div className="flex flex-col h-screen">
        {/* Fixed Navbar */}
        <Navbar />

        {/* Main content area */}
        <div className="flex flex-1">
          {/* Menubar is always open */}
          <Menubar setCanvasName={setCanvasName} addNote={addNote} />

          {/* Main content area to show the workspace */}
          <div className="flex-1 p-6 bg-gray-100 ml-64">
            <Routes>
              <Route
                path="/workspace/:canvasId"
                element={
                  <Workspace
                    canvasName={canvasName}
                    notes={notes}
                    addNote={addNote}
                    updateNotePosition={updateNotePosition}
                  />
                }
              />
              <Route
                path="/"
                element={
                  canvasName ? (
                    <div>{`Canvas: ${canvasName}`}</div>
                  ) : (
                    <div>Select a Canvas</div>
                  )
                }
              />
            </Routes>
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
}
