import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../pages/Sidebar";

export default function HomePage() {
  const navigate = useNavigate();
  const fileInputRef = useRef();

  const [subjects, setSubjects] = useState(["Parallel Computing"]);
  const [subject, setSubject] = useState("Parallel Computing");

  const [chapters, setChapters] = useState({
    "Parallel Computing": [],
  });

  // Add or switch subject
  const handleSelect = (name) => {
    if (!subjects.includes(name)) {
      setSubjects([...subjects, name]);
      setChapters((prev) => ({ ...prev, [name]: [] }));
    }
    setSubject(name);
  };

  // Trigger file input
  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  // Handle PDF upload
  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file || file.type !== "application/pdf") return;

    const chapterTitle = file.name.replace(".pdf", "");

    setChapters((prev) => ({
      ...prev,
      [subject]: [...(prev[subject] || []), { title: chapterTitle, file }],
    }));

    // reset input
    e.target.value = "";
  };

  return (
    <div className="flex min-h-screen bg-[#f9f6f0]">
      <Sidebar subjects={subjects} current={subject} onSelect={handleSelect} />

      <div className="flex-1 p-10">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">{subject}</h2>
          <div>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileUpload}
              accept="application/pdf"
              className="hidden"
            />
            <button
              onClick={handleUploadClick}
              className="bg-[#a78bfa] text-white px-4 py-2 rounded hover:opacity-90"
            >
              Upload Chapter
            </button>
          </div>
        </div>

        {/* Upload Prompt or Chapter Cards */}
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
                      ch.title
                    )}&subject=${encodeURIComponent(subject)}`
                  )
                }
              >
                <h3 className="text-lg font-semibold">Chapter {idx + 1}</h3>
                <p className="text-sm text-gray-600">{ch.title}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
