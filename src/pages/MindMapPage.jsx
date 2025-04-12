import { useLocation } from "react-router-dom";
import { useState } from "react";
import Sidebar from "../pages/Sidebar";

export default function MindMapPage() {
  const params = new URLSearchParams(useLocation().search);
  const subject = params.get("subject");
  const chapter = params.get("chapter");

  const [subjects] = useState(["Parallel Computing", "Deep learning", "Engineering Finances"]);

  return (
    <div className="flex min-h-screen bg-[#f9f6f0]">
      <Sidebar subjects={subjects} current={subject} onSelect={() => {}} />

      <div className="flex-1 p-10">
        <h2 className="text-2xl font-bold mb-4">Mind Map</h2>
        <p className="text-sm text-gray-600 mb-6">{subject} &gt; {chapter}</p>

        <div className="bg-white rounded-md shadow-md h-[500px] flex items-center justify-center text-gray-500">
          [Interactive Mind Map goes here]
        </div>
      </div>
    </div>
  );
}
