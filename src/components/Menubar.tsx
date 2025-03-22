import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Link } from "react-router-dom";

interface MenubarProps {
  setCanvasName: (name: string) => void;
}

type Workspace = {
  id: string;
  name: string;
};

const initialWorkspaces: Workspace[] = [
  { id: uuidv4(), name: "Workspace 1" },
  { id: uuidv4(), name: "Workspace 2" },
  { id: uuidv4(), name: "Workspace 3" },
];

export default function Menubar({ setCanvasName }: MenubarProps) {
  const [workspaces, setWorkspaces] = useState<Workspace[]>(initialWorkspaces);

  // Function to handle adding new workspaces
  const addWorkspace = () => {
    const newWorkspace: Workspace = {
      id: uuidv4(),
      name: `Workspace ${workspaces.length + 1}`,
    };
    setWorkspaces((prevWorkspaces) => [...prevWorkspaces, newWorkspace]);
  };

  // Function to handle removing workspaces
  const removeWorkspace = (workspaceId: string) => {
    setWorkspaces((prevWorkspaces) =>
      prevWorkspaces.filter((workspace) => workspace.id !== workspaceId)
    );
  };

  // Function to handle renaming a workspace
  const renameWorkspace = (workspaceId: string, newName: string) => {
    setWorkspaces((prevWorkspaces) =>
      prevWorkspaces.map((workspace) =>
        workspace.id === workspaceId
          ? { ...workspace, name: newName }
          : workspace
      )
    );
  };

  return (
    <div className="w-64 bg-gray-200 p-4 overflow-hidden min-h-screen">
      <h2 className="font-bold mb-2">Workspaces</h2>
      <div className="space-y-2">
        {workspaces.map(({ id, name }) => (
          <div
            key={id}
            className="p-2 bg-white rounded shadow flex items-center space-x-2"
          >
            <Link
              to={`/workspace/${id}`}
              className="flex-1 p-1 text-blue-500 hover:underline"
              onClick={() => setCanvasName(name)}
            >
              {name}
            </Link>
            <input
              type="text"
              value={name}
              onChange={(e) => renameWorkspace(id, e.target.value)}
              className="flex-1 p-1 border rounded text-sm"
              style={{ minWidth: "0", maxWidth: "80%" }}
            />
            <div className="flex space-x-2">
              <button
                onClick={() =>
                  renameWorkspace(
                    id,
                    prompt("New workspace name", name) || name
                  )
                }
                className="text-yellow-500"
                aria-label="Modify"
              >
                ✎
              </button>
              <button
                onClick={() => removeWorkspace(id)}
                className="text-red-500"
                aria-label="Delete"
              >
                🗑️
              </button>
            </div>
          </div>
        ))}
      </div>
      <button
        onClick={addWorkspace}
        className="mt-4 p-2 bg-blue-500 text-white rounded"
      >
        Add Workspace
      </button>
    </div>
  );
}
