import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import Sidebar from "../pages/Sidebar";

export default function NotesPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(location.search);
  const chapter = params.get("chapter") || "Unknown Chapter";
  const subject = params.get("subject") || "Unknown Subject";

  const [subjects] = useState(["Parallel Computing", "Deep learning", "Engineering Finances"]);

  return (
    <div className="flex min-h-screen bg-[#f9f6f0]">
      <Sidebar subjects={subjects} current={subject} onSelect={() => {}} />

      <div className="flex-1 p-10 text-[#001d3d]">
        <h2 className="text-3xl font-bold mb-4">Notes</h2>
        <p className="text-sm text-gray-500 mb-6">
          {subject} &gt; {chapter}
        </p>

        <div className="bg-white p-6 rounded-md shadow space-y-4">
          <h3 className="text-xl font-semibold">Introduction to {chapter}</h3>

          <ol className="list-decimal ml-6 space-y-3 text-sm text-gray-800">
            <li>
              <strong>What is {chapter}?</strong><br />
              {chapter} is a concept used to describe how...
            </li>

            <li>
              <strong>Why {chapter}?</strong><br />
              <ul className="list-disc ml-5 mt-1">
                <li>Improves understanding and organization of content</li>
                <li>Enhances learning through structure</li>
                <li>AI-generated for better summarization</li>
              </ul>
            </li>

            <li>
              <strong>Core Concepts</strong><br />
              - First Concept<br />
              - Second Concept<br />
              - Third Concept
            </li>
          </ol>
        </div>

        <div className="mt-10 flex justify-center">
          <button
            onClick={() =>
              navigate(`/flashcards?chapter=${encodeURIComponent(chapter)}&subject=${encodeURIComponent(subject)}`)
            }
            className="bg-[#a78bfa] text-white font-semibold px-6 py-3 rounded-md hover:opacity-90 transition flex items-center gap-2"
          >
            🚀 Launch Flashcard Session
          </button>
        </div>
      </div>
    </div>
  );
}
