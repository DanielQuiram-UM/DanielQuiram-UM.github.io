import { useState } from "react";
import Navbar from "./components/Navbar";
import Menubar from "./components/Menubar";
import Canvas from "./components/Canvas";
import DraggableCard from "./components/DraggableCard";

export default function App() {
  const [canvasName, setCanvasName] = useState("");

  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <div className="flex flex-1">
        <Menubar setCanvasName={setCanvasName} />
        <div className="flex-1 p-6 bg-gray-100">
          {canvasName ? <Canvas name={canvasName} /> : <DraggableCard />}
        </div>
      </div>
    </div>
  );
}
