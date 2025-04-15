import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Sidebar from "../pages/Home/Sidebar";
import ReactMarkdown from "react-markdown";

export default function NotesPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(location.search);
  const chapter = params.get("chapter") || "Unknown Chapter";
  const subject = params.get("subject") || "Unknown Subject";
  const chapterId = params.get("chapterId") || "Unknown Chapter";
  const subjectId = params.get("subjectId") || "Unknown Subject";
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await fetch(
          "http://localhost:3000/api/subjects/704395e4-62f9-4c79-b68c-9288e39f76e2/chapter/892bf1b3-8f8f-49b9-bd36-a1486ea3b9d9/notes",
          {
            headers: {
              Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjE3YjUyZjRhLTQwOWYtNDJhNy04ZjEzLTkwZTkwMmFiNzJkOCIsImVtYWlsIjoiaGFmbTkxOUBnbWFpbC5jb20iLCJwYXNzd29yZCI6IiQyYiQxMCRkQzk1NDRpYk0yNmRpL3lYOHUuWTJPMTc5VG9yYnBHUHd2LlpEdm5hVXFuLkJyTXJGL1QxYSIsIm5hbWUiOiJIYWZlZXogTW9oYW1tZWQiLCJpYXQiOjE3NDQ2MjUwMDJ9.E_m45AVdkB_Wt7WP8wWwoa4PcHxlEQPEgs7uoS_l1AM`,
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
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="flex min-h-screen bg-[#f9f6f0]">
      <div className="flex-1 p-10 text-[#001d3d]">
        <h2 className="text-3xl font-bold mb-4">Notes</h2>
        <p className="text-sm text-gray-500 mb-6">
          {subject} &gt; {chapter}
        </p>

        <div className="bg-white p-6 rounded-md shadow space-y-4">
          <div className=" prose">
            <ReactMarkdown>{notes}</ReactMarkdown>
          </div>
        </div>

        <div className="mt-10 flex justify-center gap-4">
          <button
            onClick={() =>
              navigate(
                `/flashcards?chapter=${encodeURIComponent(
                  chapter
                )}&subject=${encodeURIComponent(subject)}`
              )
            }
            className="bg-[#a78bfa] text-white font-semibold px-6 py-3 rounded-md hover:opacity-90 transition flex items-center gap-2"
          >
            🚀 Flashcards
          </button>

          <button
            onClick={() =>
              navigate(
                `/mindmap?chapter=${encodeURIComponent(
                  chapter
                )}&subject=${encodeURIComponent(subject)}`
              )
            }
            className="bg-white text-[#a78bfa] border-2 border-[#a78bfa] font-semibold px-6 py-3 rounded-md hover:bg-[#f3f1fc] transition flex items-center gap-2"
          >
            🧠 Mind Map
          </button>
        </div>
      </div>
    </div>
  );
}
