import { useState } from "react";
import Navbar from "./components/Navbar";
import Menubar from "./components/Menubar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Workspace from "./components/Workspace";

export default function App() {
  const [canvasName, setCanvasName] = useState(""); // Store the canvas name

  return (
    <BrowserRouter>
      <div className="flex flex-col h-screen">
        {/* Fixed Navbar */}
        <Navbar />

        {/* Main content area */}
        <div className="flex flex-1">
          {/* Menubar is always open */}
          <Menubar setCanvasName={setCanvasName} />

          {/* Main content area to show the workspace */}
          <div className="flex-1 p-6 bg-gray-100 ml-0">
            <Routes>
              <Route
                path="/workspace/:canvasId"
                element={<Workspace canvasName={canvasName} />}
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
