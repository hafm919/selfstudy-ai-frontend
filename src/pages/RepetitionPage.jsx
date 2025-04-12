import { useLocation } from "react-router-dom";
import { useState } from "react";
import Sidebar from "../pages/Sidebar";

export default function RepetitionPage() {
  const params = new URLSearchParams(useLocation().search);
  const subject = params.get("subject");
  const chapter = params.get("chapter");

  const [subjects] = useState(["Parallel Computing", "Deep learning", "Engineering Finances"]);

  return (
    <div className="flex min-h-screen bg-[#f9f6f0]">
      <Sidebar subjects={subjects} current={subject} onSelect={() => {}} />

      <div className="flex-1 p-10">
        <h2 className="text-2xl font-bold mb-4">Spaced Repetition</h2>
        <p className="text-sm text-gray-600 mb-6">{subject} &gt; {chapter}</p>

        <div className="bg-white rounded-md shadow-md p-6">
          <p className="text-gray-700 mb-4">Review session for {chapter} based on your SM-2 schedule.</p>
          <div className="border border-dashed border-gray-400 p-6 rounded-md text-center text-gray-400">
            [Flashcard Review UI goes here]
          </div>
        </div>
      </div>
    </div>
  );
}
