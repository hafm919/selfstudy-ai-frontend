import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaBook, FaPlus } from "react-icons/fa";

export default function Sidebar({
  current = "",
  onSelect = () => {},
  showSidebar,
  toggleSidebar,
}) {
  const [subjects, setSubjects] = useState([]);
  const [showInput, setShowInput] = useState(false);
  const [newSubject, setNewSubject] = useState("");
  const navigate = useNavigate();

  // Fetch subjects from backend on mount
  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch("http://localhost:3000/api/subjects", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) throw new Error("Failed to fetch subjects");

        const data = await res.json();
        setSubjects(data);
      } catch (err) {
        console.error("Error fetching subjects:", err);
      }
    };

    fetchSubjects();
  }, []);

  const addSubject = async () => {
    const trimmed = newSubject.trim();
    if (!trimmed || subjects.some((s) => s.name === trimmed)) return;

    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${import.meta.env.VITE_API_URL}/subjects`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name: trimmed }),
      });

      const data = await res.json();

      if (res.ok) {
        setSubjects((prev) => [...prev, data.subject]);
        setNewSubject("");
        setShowInput(false);
      } else {
        console.error("Subject creation failed:", data.error);
      }
    } catch (err) {
      console.error("Error creating subject:", err);
    }
  };

  const handleClick = (subjName, subjID) => {
    onSelect(subjName, subjID, "subject");
    navigate(
      `/home?subject=${encodeURIComponent(subjName)}&subjectId=${subjID}`
    );
  };

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  return (
    <div
      className={`fixed top-0 left-0 w-full md:w-[25vw] flex flex-col z-10 bg-[#f3f0ff] text-[#5b4a89] p-5 shadow-xl h-screen ease-in-out duration-300 ${
        showSidebar ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      {/* Close button */}
      <div className="flex justify-end text-black">
        <button onClick={toggleSidebar}>x</button>
      </div>

      {/* Sidebar title */}
      <div className="py-3 flex justify-center">
        <h1 className="text-5xl font-extrabold bg-gradient-to-r from-purple-700 via-purple-500 to-pink-500 text-transparent bg-clip-text leading-tight">
          SelfStudy
        </h1>
      </div>

      {/* Sidebar buttons */}
      <div className="flex flex-col mt-9 gap-2 h-full flex-grow">
        <h2 className="text-md font-semibold text-black">Subjects</h2>
        <hr className="border-t border-purple-700 mb-2" />

        {subjects.map((subj) => (
          <button
            key={subj.id}
            onClick={() => handleClick(subj.name, subj.id)}
            className={`w-full text-left flex items-center gap-2 px-3 py-2 rounded-md mb-1 border ${
              subj.name === current
                ? "bg-[#a78bfa] text-white"
                : "bg-white hover:bg-gray-100"
            } transition`}
          >
            <FaBook className="text-sm" />
            {subj.name}
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
            <button
              onClick={addSubject}
              className="text-sm text-[#a78bfa] font-bold"
            >
              Add
            </button>
          </div>
        ) : (
          <button
            onClick={() => setShowInput(true)}
            className="text-sm text-[#a78bfa] flex items-center gap-1 mt-2"
          >
            <FaPlus /> Add Subject
          </button>
        )}

        <button
          onClick={handleLogout}
          className="bg-white text-left font-sans text-right text-black p-3 border border-black hover:bg-[#a78bfa] hover:text-white mt-auto cursor-pointer"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
