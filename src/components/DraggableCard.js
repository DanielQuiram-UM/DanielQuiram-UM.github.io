import { createSwapy } from "swapy";
import { useEffect, useRef } from "react";

export default function DraggableCard() {
  const swapy = useRef(null);
  const container = useRef(null);

  useEffect(() => {
    if (container.current) {
      swapy.current = createSwapy(container.current);

      swapy.current.onSwap((event) => {
        console.log("Card swapped", event);
      });
    }

    return () => {
      swapy.current?.destroy();
    };
  }, []);

  return (
    <div ref={container} className="flex w-full justify-center items-center">
      <div data-swapy-slot="a" className="w-full">
        <div
          data-swapy-item="a"
          className="p-10 m-4 rounded-lg shadow-lg text-white bg-blue-500 cursor-pointer"
        >
          Drag Me
        </div>
      </div>
      <div data-swapy-slot="b" className="w-full">
        <div
          data-swapy-item="b"
          className="p-10 m-4 rounded-lg shadow-lg text-white bg-green-500 cursor-pointer"
        >
          Or Me
        </div>
      </div>
    </div>
  );
}
