import { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Sidebar from "../pages/Sidebar";

export default function HomePage() {
  const navigate = useNavigate();
  const fileInputRef = useRef();
  const location = useLocation();

  const urlSubject = new URLSearchParams(location.search).get("subject");
  const [subject, setSubject] = useState(urlSubject || "");

  const [subjects, setSubjects] = useState(() => {
    return JSON.parse(localStorage.getItem("subjects")) || [];
  });

  const [chapters, setChapters] = useState(() => {
    return JSON.parse(localStorage.getItem("chapters")) || {};
  });

  // Update localStorage whenever chapters change
  useEffect(() => {
    localStorage.setItem("chapters", JSON.stringify(chapters));
  }, [chapters]);

  const handleSelect = (name) => {
    if (!subjects.includes(name)) {
      const updated = [...subjects, name];
      setSubjects(updated);
      localStorage.setItem("subjects", JSON.stringify(updated));
    }
    setSubject(name);
    navigate(`/home?subject=${encodeURIComponent(name)}`);
  };

  const handleUploadClick = () => {
    if (!subject) return;
    fileInputRef.current?.click();
  };

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file || file.type !== "application/pdf") return;

    const chapterTitle = file.name.replace(".pdf", "");

    setChapters((prev) => {
      const updated = {
        ...prev,
        [subject]: [...(prev[subject] || []), { title: chapterTitle, file }],
      };
      return updated;
    });

    e.target.value = "";
  };

  return (
    <div className="flex min-h-screen bg-[#f9f6f0]">
      <Sidebar subjects={subjects} current={subject} onSelect={handleSelect} />

      {/* File input */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileUpload}
        accept="application/pdf"
        className="hidden"
      />

      <div className="flex-1 p-10">
        {subject ? (
          <>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold">{subject}</h2>
              <button
                onClick={handleUploadClick}
                className="bg-[#a78bfa] text-white px-4 py-2 rounded hover:opacity-90"
              >
                Upload Chapter
              </button>
            </div>

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
                    className="border-2 border-[#a78bfa] p-6 rounded-md hover:bg-[#f3f1fc] cursor-pointer space-y-2"
                  >
                    <div
                      onClick={() =>
                        navigate(
                          `/notes?chapter=${encodeURIComponent(ch.title)}&subject=${encodeURIComponent(subject)}`
                        )
                      }
                    >
                      <h3 className="text-lg font-semibold">Chapter {idx + 1}</h3>
                      <p className="text-sm text-gray-600">{ch.title}</p>
                    </div>

                    <button
                      onClick={() =>
                        navigate(
                          `/schedule?chapter=${encodeURIComponent(ch.title)}&subject=${encodeURIComponent(subject)}`
                        )
                      }
                      className="text-sm text-[#a78bfa] underline"
                    >
                      📅 Schedule Repetition
                    </button>
                  </div>
                ))}
              </div>
            )}
          </>
        ) : (
          <p className="text-gray-600 text-sm">
            Select a subject folder to view or upload chapters.
          </p>
        )}
      </div>
    </div>
  );
}
