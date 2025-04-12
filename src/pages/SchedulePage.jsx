import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import Sidebar from "../pages/Sidebar";

export default function SchedulePage() {
  const navigate = useNavigate();
  const params = new URLSearchParams(useLocation().search);
  const subject = params.get("subject") || "Unknown Subject";
  const chapter = params.get("chapter") || "Unknown Chapter";

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [subjects] = useState(["Parallel Computing", "Deep learning", "Engineering Finances"]);

  const handleSubmit = () => {
    if (!startDate || !endDate || new Date(startDate) > new Date(endDate)) {
      alert("Please enter valid start and end dates.");
      return;
    }

    // Temporary: send to calendar page with schedule data in URL (for now)
    navigate(
      `/calendar?subject=${encodeURIComponent(subject)}&chapter=${encodeURIComponent(
        chapter
      )}&start=${startDate}&end=${endDate}`
    );
  };

  return (
    <div className="flex min-h-screen bg-[#f9f6f0]">
      <Sidebar subjects={subjects} current={subject} onSelect={() => {}} />

      <div className="flex-1 p-10 text-[#001d3d]">
        <h2 className="text-3xl font-bold mb-4">Schedule Spaced Repetition</h2>
        <p className="text-sm text-gray-600 mb-6">
          {subject} &gt; {chapter}
        </p>

        <div className="bg-white p-6 rounded-md shadow-md w-full max-w-lg space-y-6">
          <div>
            <label className="block text-sm font-medium mb-1">Start Date</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">End Date</label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
            />
          </div>

          <button
            onClick={handleSubmit}
            className="w-full bg-[#a78bfa] text-white py-2 rounded-md font-semibold hover:opacity-90 transition"
          >
            Generate Study Schedule
          </button>
        </div>
      </div>
    </div>
  );
}
