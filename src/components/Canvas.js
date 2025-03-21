export default function Canvas({ name }) {
  return (
    <div className="w-full h-full p-6 bg-white border rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-center mb-4">{name} Canvas</h2>
      <div className="w-full h-96 bg-gray-200 border border-gray-300">
        {/* Placeholder for actual canvas content */}
        <p className="text-center text-gray-500">Canvas for {name}</p>
      </div>
    </div>
  );
}
