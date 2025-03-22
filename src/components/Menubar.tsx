// src/components/Menubar.tsx

import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Link } from "react-router-dom";

interface MenubarProps {
  setCanvasName: (name: string) => void;
  addNote: (x: number, y: number) => void;
}

export default function Menubar({ setCanvasName, addNote }: MenubarProps) {
  const [workspaces, setWorkspaces] = useState([
    { id: uuidv4(), name: "Workspace 1" },
  ]);

  const addWorkspace = () => {
    const newWorkspace = {
      id: uuidv4(),
      name: `Workspace ${workspaces.length + 1}`,
    };
    setWorkspaces((prevWorkspaces) => [...prevWorkspaces, newWorkspace]);
  };

  return (
    <div className="w-64 bg-gray-200 p-4">
      <h2 className="font-bold mb-2">Workspaces</h2>
      <div className="space-y-2">
        {workspaces.map(({ id, name }) => (
          <div key={id} className="p-2 bg-white rounded shadow">
            <Link
              to={`/workspace/${id}`}
              className="flex-1 p-1 text-blue-500 hover:underline"
              onClick={() => setCanvasName(name)}
            >
              {name}
            </Link>
          </div>
        ))}
      </div>
      <button
        onClick={addWorkspace}
        className="mt-4 p-2 bg-blue-500 text-white rounded"
      >
        Add Workspace
      </button>

      {/* Button to spawn a new note */}
      <button
        onClick={() => addNote(50, 50)} // Add note at fixed position for now
        className="mt-4 p-2 bg-green-500 text-white rounded"
      >
        Add Note
      </button>
    </div>
  );
}
