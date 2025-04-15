import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Sidebar from "./Home/Sidebar-copy";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

function generateSchedule(start, end) {
  const startDate = new Date(start);
  const endDate = new Date(end);
  const days = Math.floor((endDate - startDate) / (1000 * 60 * 60 * 24));
  const sessions = 4;
  const gap = Math.floor(days / (sessions - 1));

  const schedule = [];
  for (let i = 0; i < sessions; i++) {
    const date = new Date(startDate);
    date.setDate(startDate.getDate() + i * gap);
    schedule.push(date.toISOString().split("T")[0]);
  }
  return schedule;
}

export default function RepetitionCalendar() {
  const navigate = useNavigate();
  const params = new URLSearchParams(useLocation().search);
  const subject = params.get("subject");
  const chapter = params.get("chapter");
  const start = params.get("start");
  const end = params.get("end");

  const [subjects] = useState([
    "Parallel Computing",
    "Deep learning",
    "Engineering Finances",
  ]);
  const [schedule, setSchedule] = useState([]);
  const [completed, setCompleted] = useState(() => {
    const key = `${subject}_${chapter}_completed`;
    return JSON.parse(localStorage.getItem(key)) || [];
  });

  useEffect(() => {
    if (start && end) {
      setSchedule(generateSchedule(start, end));
    }
  }, [start, end]);

  const handleComplete = (date) => {
    const key = `${subject}_${chapter}_completed`;
    const updated = [...completed, date];
    localStorage.setItem(key, JSON.stringify(updated));
    setCompleted(updated);
  };

  const isChecked = (date) => completed.includes(date);

  return (
    <div className="flex min-h-screen bg-[#f9f6f0]">
      <Sidebar subjects={subjects} current={subject} onSelect={() => {}} />

      <div className="flex-1 p-10 text-[#001d3d]">
        <h2 className="text-3xl font-bold mb-4">Study Calendar</h2>
        <p className="text-sm text-gray-600 mb-6">
          {subject} &gt; {chapter}
        </p>

        <Calendar
          value={new Date(start)}
          tileClassName={({ date }) => {
            const iso = date.toISOString().split("T")[0];
            if (schedule.includes(iso)) {
              return isChecked(iso) ? "bg-green-200" : "bg-purple-200";
            }
            return null;
          }}
          tileContent={({ date }) => {
            const iso = date.toISOString().split("T")[0];
            if (!schedule.includes(iso)) return null;
            return (
              <div className="flex flex-col items-center mt-1">
                <button
                  onClick={() =>
                    navigate(
                      `/notes?subject=${encodeURIComponent(
                        subject
                      )}&chapter=${encodeURIComponent(chapter)}`
                    )
                  }
                  className="text-xs underline text-[#5b4a89] hover:opacity-80"
                >
                  Open
                </button>
                {!isChecked(iso) && (
                  <button
                    onClick={() => handleComplete(iso)}
                    className="text-xs text-green-700 mt-1 hover:underline"
                  >
                    Mark Done
                  </button>
                )}
                {isChecked(iso) && (
                  <span className="text-xs text-green-600 mt-1 font-semibold">
                    ✅ Done
                  </span>
                )}
              </div>
            );
          }}
        />
      </div>
    </div>
  );
}
