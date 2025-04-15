import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function SchedulePage({ onSelect }) {
  const navigate = useNavigate();
  const params = new URLSearchParams(useLocation().search);
  const subject = params.get("subject") || "Unknown Subject";
  const chapter = params.get("chapter") || "Unknown Chapter";
  const chapterId = params.get("chapterId");

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [repetitions, setRepetitions] = useState(3);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    setError("");

    if (!startDate || !endDate || new Date(startDate) > new Date(endDate)) {
      setError("Please enter valid start and end dates.");
      return;
    }

    if (!chapterId) {
      setError("Chapter ID is missing.");
      return;
    }

    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffInDays = Math.floor((end - start) / (1000 * 60 * 60 * 24)) + 1;

    if (diffInDays < repetitions) {
      setError(
        `Not enough days to schedule ${repetitions} repetitions. You only selected ${diffInDays} day(s).`
      );
      return;
    }

    try {
      const token = localStorage.getItem("token");

      const res = await fetch(`${import.meta.env.VITE_API_URL}/calendar/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          chapterId,
          startDate,
          endDate,
          repetitions,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to schedule repetition.");
      }
      onSelect(null, null, "calendar");
      navigate("/home");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="flex min-h-screen bg-[#f9f6f0]">
      <div className="flex-1 p-10 text-[#001d3d]">
        <h2 className="text-3xl font-bold mb-4">Schedule Spaced Repetition</h2>
        <p className="text-sm text-gray-600 mb-6">
          {subject} &gt; {chapter}
        </p>

        <div className="bg-white p-6 rounded-md shadow-md w-full max-w-lg space-y-6">
          {error && (
            <div className="bg-red-100 text-red-800 text-sm p-3 rounded border border-red-300">
              {error}
            </div>
          )}

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

          <div>
            <label className="block text-sm font-medium mb-1">
              Number of Repetitions
            </label>
            <input
              type="number"
              min={1}
              max={10}
              value={repetitions}
              onChange={(e) => setRepetitions(parseInt(e.target.value))}
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
            />
          </div>

          <button
            onClick={handleSubmit}
            className="w-full bg-[#a78bfa] text-white py-2 rounded-md font-semibold hover:opacity-90 transition cursor-pointer"
          >
            Generate Study Schedule
          </button>
        </div>
      </div>
    </div>
  );
}
