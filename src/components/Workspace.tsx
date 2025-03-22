// src/components/Workspace.tsx

import { useState, useRef, useEffect } from "react";
import { v4 as uuidv4 } from "uuid"; // Import uuid for unique note ids

interface WorkspaceProps {
  canvasName: string;
  notes: Array<{ id: string; x: number; y: number }>; // Array to hold notes' positions
  addNote: (x: number, y: number) => void; // Function to add new note
  updateNotePosition: (id: string, x: number, y: number) => void; // Function to update note position
}

export default function Workspace({
  canvasName,
  notes,
  addNote,
  updateNotePosition,
}: WorkspaceProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [draggingNoteId, setDraggingNoteId] = useState<string | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsDragging(true);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isDragging && draggingNoteId) {
      const deltaX = e.movementX;
      const deltaY = e.movementY;
      const note = notes.find((note) => note.id === draggingNoteId);
      if (note) {
        updateNotePosition(draggingNoteId, note.x + deltaX, note.y + deltaY);
      }
    }
    setMousePosition({ x: e.clientX, y: e.clientY });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setDraggingNoteId(null);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
    setDraggingNoteId(null);
  };

  const drawGrid = (ctx: CanvasRenderingContext2D) => {
    const width = ctx.canvas.width;
    const height = ctx.canvas.height;

    ctx.strokeStyle = "#e0e0e0";
    ctx.lineWidth = 0.5;

    for (let y = 0; y < height; y += 20) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }

    for (let x = 0; x < width; x += 20) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }
  };

  const renderCanvas = (canvas: HTMLCanvasElement) => {
    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.save();
      drawGrid(ctx);
      ctx.restore();
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        renderCanvas(canvas);
      }
    }
  }, []);

  return (
    <div className="flex-1 p-6 bg-gray-100 relative">
      <h1 className="text-2xl font-bold mb-4">Workspace: {canvasName}</h1>
      <div
        className="relative"
        style={{ width: "100%", height: "400px" }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
      >
        <canvas
          ref={canvasRef}
          width={1000}
          height={1000}
          className="absolute top-0 left-0"
        />

        {/* Render Notes */}
        {notes.map(({ id, x, y }) => (
          <div
            key={id}
            className="absolute bg-yellow-200 p-4 rounded shadow-md"
            style={{ top: y, left: x, zIndex: 10 }} // Ensure notes are above canvas
            onMouseDown={(e) => {
              e.stopPropagation(); // Prevent canvas drag
              setDraggingNoteId(id);
            }}
          >
            <h4 className="font-semibold text-lg">Note {id}</h4>
            <textarea className="w-full p-2 border rounded" />
          </div>
        ))}
      </div>
    </div>
  );
}
