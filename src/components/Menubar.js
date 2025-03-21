import { createSwapy } from "swapy";
import { useEffect, useRef, useState } from "react";
import Canvas from "./Canvas";

export default function Menubar({ setCanvasName }) {
  const [items, setItems] = useState([
    { id: 1, name: "Canvas 1" },
    { id: 2, name: "Canvas 2" },
  ]);
  const swapy = useRef(null);
  const container = useRef(null);

  const addItem = () => {
    const newItem = {
      id: items.length + 1,
      name: `Canvas ${items.length + 1}`,
    };
    setItems([...items, newItem]);
  };

  useEffect(() => {
    if (container.current) {
      swapy.current = createSwapy(container.current);

      // Handle the swap event for rearranging items
      swapy.current.onSwap((event) => {
        const { source, destination } = event;
        const updatedItems = [...items];
        const [movedItem] = updatedItems.splice(source.index, 1);
        updatedItems.splice(destination.index, 0, movedItem);
        setItems(updatedItems);
      });
    }

    return () => {
      swapy.current?.destroy();
    };
  }, [items]);

  return (
    <div className="bg-gray-800 w-64 h-screen p-4 text-white shadow-md">
      <button
        onClick={addItem}
        className="w-full bg-blue-600 p-2 text-white rounded mb-4 hover:bg-blue-700"
      >
        Add New Canvas
      </button>
      <ul ref={container} className="space-y-2">
        {items.map((item) => (
          <li key={item.id}>
            <div
              data-swapy-item={item.id}
              className="p-2 bg-gray-700 rounded cursor-pointer hover:bg-gray-600"
              onClick={() => setCanvasName(item.name)}
            >
              {item.name}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
