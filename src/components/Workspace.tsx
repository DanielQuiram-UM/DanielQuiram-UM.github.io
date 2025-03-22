import { useState, useEffect, useRef } from "react";
import Note from "./Note"; // Assuming you have the Note component

interface WorkspaceProps {
  canvasName: string;
  notes: { id: string; x: number; y: number }[];
  addNote: (x: number, y: number) => void;
  updateNotePosition: (id: string, x: number, y: number) => void;
}

export default function Workspace({
  canvasName,
  notes,
  addNote,
  updateNotePosition,
}: WorkspaceProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const workspaceRef = useRef<HTMLDivElement>(null);

  const [isDragging, setIsDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Track the mouse position within the workspace
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    setMousePosition({
      x: e.clientX - (workspaceRef.current?.getBoundingClientRect().left ?? 0),
      y: e.clientY - (workspaceRef.current?.getBoundingClientRect().top ?? 0),
    });
    if (isDragging) {
      const deltaX = e.movementX;
      const deltaY = e.movementY;
      setOffset((prev) => ({
        x: prev.x + deltaX,
        y: prev.y + deltaY,
      }));
    }
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsDragging(true);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  // Grid Drawing Logic
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
      drawGrid(ctx);
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
  }, [offset]);

  return (
    <div
      ref={workspaceRef}
      className="flex-1 p-0 bg-gray-100 relative"
      onMouseMove={handleMouseMove}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
    >
      <h1 className="text-2xl font-bold mb-4">Workspace: {canvasName}</h1>
      <div className="relative" style={{ width: "100%", height: "600px" }}>
        <canvas
          ref={canvasRef}
          width={1000}
          height={1000}
          className="absolute top-0 left-0"
        />
        {/* Render Notes */}
        {notes.map(({ id, x, y }) => (
          <Note
            key={id}
            noteId={id}
            x={x + offset.x} // Apply offset to keep note's relative position on the canvas
            y={y + offset.y} // Apply offset to keep note's relative position on the canvas
            updateNotePosition={updateNotePosition}
          />
        ))}
      </div>

      {/* Mouse Position Display */}
      <div className="absolute bottom-0 right-0 p-2 bg-gray-900 text-white rounded">
        {`Mouse Position: (${mousePosition.x}, ${mousePosition.y})`}
      </div>
    </div>
  );
}
