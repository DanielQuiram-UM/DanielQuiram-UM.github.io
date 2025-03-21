export default function Navbar() {
  return (
    <div className="bg-blue-600 p-4 text-white shadow-md">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold">My App</h1>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <a href="#home" className="hover:text-gray-200">
                Home
              </a>
            </li>
            <li>
              <a href="#about" className="hover:text-gray-200">
                About
              </a>
            </li>
            <li>
              <a href="#contact" className="hover:text-gray-200">
                Contact
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}
