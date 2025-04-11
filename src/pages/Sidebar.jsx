import { Link } from "react-router-dom";

export default function Sidebar({ subjects, current, onSelect }) {
  return (
    <div className="w-64 min-h-screen bg-[#f3f1fc] text-[#5b4a89] p-6 flex flex-col justify-between border-r border-gray-300">
      <div>
        <h1 className="text-3xl font-bold mb-8">SelfStudy</h1>
        <p className="text-sm font-semibold mb-2">Subjects</p>
        <div className="space-y-2">
          {subjects.map((subject) => (
            <button
              key={subject}
              onClick={() => onSelect(subject)}
              className={`w-full flex items-center gap-2 px-3 py-2 rounded border text-left ${
                current === subject
                  ? "bg-[#a78bfa] text-white"
                  : "border-[#a78bfa] text-[#5b4a89]"
              }`}
            >
              📘 {subject}
            </button>
          ))}
        <button
            onClick={() => {
                const newName = prompt("Enter subject name:");
                if (newName) onSelect(newName);
            }}
            className="text-lg font-bold text-left pl-1 hover:text-[#6d28d9]"
            >
            ＋
        </button>
        </div>
      </div>
      <div>
        <button className="w-full mt-10 border border-gray-400 text-sm text-gray-700 px-2 py-1 rounded hover:bg-gray-200">
          Logout
        </button>
      </div>
    </div>
  );
}
