import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";

export default function NotesPage({ onSelect }) {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  console.log("Search string:", location.search);
  let chapter = params.get("chapter") || "Unknown Chapter";
  let subject = params.get("subject") || "Unknown Subject";
  let chapterId = params.get("chapterId") || "";
  let subjectId = params.get("subjectId") || "";
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await fetch(
          `${
            import.meta.env.VITE_API_URL
          }/subjects/${subjectId}/chapter/${chapterId}/notes`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await res.json();
        setNotes(data.notes);
        console.log(data.notes);
      } catch (err) {
        console.error("Failed to fetch notes:", err);
        setNotes("Error loading notes.");
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, [subjectId, chapterId]);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="flex min-h-screen bg-[#f9f6f0]">
      <div className="flex-1 p-10 text-[#001d3d]">
        <h2 className="text-3xl font-bold mb-4">Notes</h2>
        <p className="text-sm text-gray-500 mb-6">
          {subject} &gt; {chapter}
        </p>

        <div className="mb-6">
          <button
            onClick={() => onSelect(subject, subjectId, "subject")}
            className="text-[#a78bfa] underline font-medium hover:text-[#7e63db] transition cursor-pointer"
          >
            ← Back to Chapters
          </button>
        </div>

        <div className="bg-white p-6 rounded-md shadow space-y-4">
          <div className=" prose">
            <ReactMarkdown>{notes}</ReactMarkdown>
          </div>
        </div>

        <div className="mt-10 flex justify-center gap-4">
          <button
            onClick={() => {
              onSelect(subject, subjectId, "flashcards");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="bg-[#a78bfa] text-white font-semibold px-6 py-3 rounded-md hover:opacity-90 transition flex items-center gap-2 cursor-pointer"
          >
            🚀 Flashcards
          </button>

          <button
            onClick={() => {
              onSelect(subject, subjectId, "mindmap");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="bg-white text-[#a78bfa] border-2 border-[#a78bfa] font-semibold px-6 py-3 rounded-md hover:bg-[#f3f1fc] transition flex items-center gap-2 cursor-pointer"
          >
            🧠 Mind Map
          </button>
        </div>
      </div>
    </div>
  );
}
