import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-green p-8 text-dark">
      <h1 className="text-3xl font-bold mb-4">Learning Roadmap</h1>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-xl font-semibold mb-2">Theory</h2>
          <p className="text-sm mb-2">Study notes, key concepts, mind maps.</p>
          <button className="bg-dark text-white px-4 py-1 rounded">Start Theory</button>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-xl font-semibold mb-2">Practice</h2>
          <p className="text-sm mb-2">AI-generated flashcards & repetition.</p>
          <button className="bg-dark text-white px-4 py-1 rounded">Start Practice</button>
        </div>
      </div>
    </div>
  );
}
