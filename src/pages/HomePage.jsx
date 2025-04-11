import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../pages/Sidebar";

export default function HomePage() {
  const navigate = useNavigate();

  // SUBJECTS (Folders)
  const [subjects, setSubjects] = useState(["Parallel Computing"]);
  const [subject, setSubject] = useState("Parallel Computing");

  // CHAPTERS PER SUBJECT
  const [chapters, setChapters] = useState({
    "Parallel Computing": [],
  });

  // Add new subject
  const handleSelect = (name) => {
    if (!subjects.includes(name)) {
      setSubjects([...subjects, name]);
      setChapters((prev) => ({ ...prev, [name]: [] }));
    }
    setSubject(name);
  };

  // Simulate upload
  const handleUpload = () => {
    const chapterName = prompt("Enter chapter title:");
    if (!chapterName) return;

    setChapters((prev) => ({
      ...prev,
      [subject]: [...(prev[subject] || []), chapterName],
    }));
  };

  return (
    <div className="flex min-h-screen bg-[#f9f6f0]">
      <Sidebar subjects={subjects} current={subject} onSelect={handleSelect} />

      <div className="flex-1 p-10">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">{subject}</h2>
          <button
            onClick={handleUpload}
            className="bg-[#a78bfa] text-white px-4 py-2 rounded hover:opacity-90"
          >
            Upload Chapter
          </button>
        </div>

        {/* Upload prompt OR list of chapters */}
        {!chapters[subject]?.length ? (
          <div className="border-2 border-dotted border-[#a78bfa] rounded-lg h-64 flex flex-col items-center justify-center">
            <span className="text-4xl text-[#a78bfa] mb-2">📄</span>
            <p className="text-center text-sm text-gray-600">
              Upload your first chapter<br />to get started
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {chapters[subject].map((ch, idx) => (
              <div
                key={idx}
                className="border-2 border-[#a78bfa] p-6 rounded-md hover:bg-[#f3f1fc] cursor-pointer"
                onClick={() =>
                  navigate(
                    `/notes?chapter=${encodeURIComponent(
                      ch
                    )}&subject=${encodeURIComponent(subject)}`
                  )
                }
              >
                <h3 className="text-lg font-semibold">Chapter {idx + 1}</h3>
                <p className="text-sm text-gray-600">{ch}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
