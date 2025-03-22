import { useState, useRef, useEffect } from "react";

interface WorkspaceProps {
  canvasName: string;
}

export default function Workspace({ canvasName }: WorkspaceProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsDragging(true);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isDragging) {
      const deltaX = e.movementX;
      const deltaY = e.movementY;
      setOffset((prev) => ({
        x: prev.x + deltaX,
        y: prev.y + deltaY,
      }));
    }
    setMousePosition({ x: e.clientX, y: e.clientY });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
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
      ctx.translate(offset.x, offset.y);
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
  }, [offset]);

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
        <div className="absolute bottom-0 right-0 p-2 bg-gray-900 text-white rounded">
          {`Mouse Position: (${mousePosition.x}, ${mousePosition.y})`}
        </div>
      </div>
    </div>
  );
}
