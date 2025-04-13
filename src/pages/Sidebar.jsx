import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaBook, FaPlus, FaCog } from "react-icons/fa";

export default function Sidebar({ current = "", onSelect = () => {} }) {
    const [subjects, setSubjects] = useState(() => {
        return JSON.parse(localStorage.getItem("subjects") || "[]");
      });
  const [showInput, setShowInput] = useState(false);
  const [newSubject, setNewSubject] = useState("");
  const navigate = useNavigate();

  // Load from localStorage on mount
  useEffect(() => {
    localStorage.setItem("subjects", JSON.stringify(subjects));
  }, [subjects]);

  // Update localStorage when subjects change
  useEffect(() => {
    localStorage.setItem("subjects", JSON.stringify(subjects));
  }, [subjects]);

  const addSubject = () => {
    const trimmed = newSubject.trim();
    if (trimmed && !subjects.includes(trimmed)) {
      const updated = [...subjects, trimmed];
      setSubjects(updated);
      setNewSubject("");
      setShowInput(false);
    }
  };

  const handleClick = (subj) => {
    onSelect(subj); // optional for components that care
    navigate(`/home?subject=${encodeURIComponent(subj)}`);
  };

  const handleLogout = () => {
    localStorage.clear(); // or selectively: localStorage.removeItem("token");
    window.location.href = "/login"; // or use navigate("/login")
  };

  return (
    <div className="w-64 min-h-screen bg-[#f3f0ff] text-[#5b4a89] p-6 space-y-6">
      <h1 className="text-3xl font-bold text-[#a78bfa] cursor-pointer hover:opacity-80 transition"
        onClick={() => navigate("/")}>
        SelfStudy
      </h1>

      <div>
        <h2 className="text-md font-semibold mb-2">Subjects</h2>

        {subjects.map((subj, i) => (
          <button
            key={i}
            onClick={() => handleClick(subj)}
            className={`w-full text-left flex items-center gap-2 px-3 py-2 rounded-md mb-1 border 
              ${subj === current ? "bg-[#a78bfa] text-white" : "bg-white hover:bg-gray-100"} 
              transition`}
          >
            <FaBook className="text-sm" />
            {subj}
          </button>
        ))}

        {showInput ? (
          <div className="mt-2 flex gap-2">
            <input
              value={newSubject}
              onChange={(e) => setNewSubject(e.target.value)}
              className="flex-1 px-2 py-1 border rounded text-sm"
              placeholder="New subject"
              onKeyDown={(e) => e.key === "Enter" && addSubject()}
            />
            <button onClick={addSubject} className="text-sm text-[#a78bfa] font-bold">Add</button>
          </div>
        ) : (
          <button onClick={() => setShowInput(true)} className="text-sm text-[#a78bfa] flex items-center gap-1 mt-2">
            <FaPlus /> Add Subject
          </button>
        )}
      </div>

      <div className="absolute bottom-6 left-6 text-sm text-[#001d3d] font-bold cursor-pointer flex items-center gap-2" onClick={handleLogout}>
        <FaBook className="text-orange-300" />
        Logout
        </div>
    </div>
  );
}
