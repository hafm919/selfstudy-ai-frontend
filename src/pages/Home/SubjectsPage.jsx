import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import LoadingOverlay from "./LoadingOverlay";

export default function SubjectsPage({ subject, subjectId, onSelect }) {
  const fileInputRef = useRef();
  const navigate = useNavigate();
  const [chapters, setChapters] = useState([]);
  const [isUploading, setIsUploading] = useState(false); // new state

  useEffect(() => {
    if (!subjectId) return;

    const fetchChapters = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/subjects/${subjectId}/chapter/`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!res.ok) throw new Error("Failed to fetch chapters");

        const data = await res.json();
        setChapters(data);
      } catch (err) {
        console.error("Error fetching chapters:", err);
      }
    };

    fetchChapters();
  }, [subjectId]);

  const handleUploadClick = () => {
    if (!subject) return;
    fileInputRef.current?.click();
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file || file.type !== "application/pdf") return;

    setIsUploading(true); // start loading
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Not authenticated");

      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/subjects/${subjectId}/chapter`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || "Upload failed");
      }

      const newChapter = await res.json();
      console.log(newChapter);
      setChapters((prev) => [...prev, newChapter]);
    } catch (err) {
      console.error("Upload Error:", err.message);
    } finally {
      setIsUploading(false); // stop loading
      e.target.value = ""; // reset file input
    }
  };

  if (isUploading) {
    return <LoadingOverlay></LoadingOverlay>;
  }

  return (
    <>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileUpload}
        accept="application/pdf"
        className="hidden"
      />
      {subject ? (
        <>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold">{subject}</h2>
            <button
              onClick={handleUploadClick}
              disabled={isUploading}
              className={`flex items-center gap-2 px-4 py-2 rounded cursor-pointer text-white ${
                isUploading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-[#a78bfa] hover:opacity-90"
              }`}
            >
              {isUploading && (
                <svg
                  className="w-4 h-4 animate-spin text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8H4z"
                  ></path>
                </svg>
              )}
              {isUploading ? "Uploading..." : "Upload Chapter"}
            </button>
          </div>

          {!chapters.length ? (
            <div className="border-2 border-dotted border-[#a78bfa] rounded-lg h-64 flex flex-col items-center justify-center">
              <span className="text-4xl text-[#a78bfa] mb-2">📄</span>
              <p className="text-center text-sm text-gray-600">
                Upload your first chapter
                <br />
                to get started
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-6">
              {chapters.map((ch, idx) => (
                <div
                  key={ch.id}
                  className="border-2 border-[#a78bfa] p-6 rounded-md hover:bg-[#f3f1fc] cursor-pointer space-y-2 "
                >
                  <div
                    onClick={() => {
                      onSelect(subject, subjectId, "notes");
                      navigate(
                        `/home?subject=${encodeURIComponent(
                          subject
                        )}&subjectId=${subjectId}&chapter=${encodeURIComponent(
                          ch.title
                        )}&chapterId=${ch.id}`
                      );
                    }}
                  >
                    <h3 className="text-lg font-semibold">Chapter {idx + 1}</h3>
                    <p className="text-sm text-gray-600">{ch.title}</p>
                  </div>

                  <button
                    onClick={() => {
                      onSelect(subject, subjectId, "schedule");
                      navigate(
                        `/home?subject=${encodeURIComponent(
                          subject
                        )}&subjectId=${subjectId}&chapter=${encodeURIComponent(
                          ch.title
                        )}&chapterId=${ch.id}`
                      );
                    }}
                    className="text-sm text-[#a78bfa] underline cursor-pointer"
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
    </>
  );
}
