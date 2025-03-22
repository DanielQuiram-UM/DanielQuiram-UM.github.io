interface TabSidebarProps {
  tabSidebarOpen: boolean;
  toggleTabSidebar: () => void;
  toggleMenubar: () => void;
}

export default function TabSidebar({
  tabSidebarOpen,
  toggleTabSidebar,
  toggleMenubar,
}: TabSidebarProps) {
  return (
    <div
      className={`transition-all duration-300 ease-in-out transform fixed left-0 top-0 bottom-0 ${
        tabSidebarOpen ? "w-16" : "w-8"
      } bg-gray-800 text-white flex items-center justify-center z-50`}
    >
      {/* Button with compass emoji */}
      <button
        className="p-2"
        onClick={() => {
          toggleMenubar();
          toggleTabSidebar(); // Toggle the menubar and tab sidebar
        }}
      >
        <span
          className={`text-2xl ${tabSidebarOpen ? "rotate-0" : "rotate-180"}`}
        >
          🧭 {/* Compass emoji */}
        </span>
      </button>
    </div>
  );
}
