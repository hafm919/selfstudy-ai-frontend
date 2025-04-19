import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { parseISO } from "date-fns";
import moment from "moment";

const localizer = momentLocalizer(moment);

export default function RepetitionCalendar({ onSelect }) {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState("month"); // Optional: control view mode
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchCalendarData = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/calendar/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();

        const mapped = data.flatMap((item) =>
          item.dates.map((date, index) => ({
            title: `${item.chapterTitle} - Session ${index + 1}`,
            chapter: item.chapterTitle,
            start: parseISO(date),
            end: parseISO(date),
            allDay: true,
            chapterId: item.chapterId,
            subject: item.subjectName,
            subjectId: item.subjectId,
          }))
        );

        setEvents(mapped);
      } catch (error) {
        console.error("Error fetching repetition calendar data:", error);
      }
    };

    fetchCalendarData();
  }, [token]);

  const handleSelectEvent = (event) => {
    onSelect(event.subject, event.subjectId, "notes");
    navigate(
      `/home?subject=${encodeURIComponent(event.subject)}&subjectId=${
        event.subjectId
      }&chapter=${encodeURIComponent(event.chapter)}&chapterId=${
        event.chapterId
      }`
    );
  };

  return (
    <div className="flex min-h-screen bg-[#f9f6f0]">
      <div className="flex-1 p-10 text-[#001d3d]">
        <h2 className="text-3xl font-bold mb-4">Study Calendar</h2>
        <hr className="mb-4"></hr>
        <Calendar
          localizer={localizer}
          events={events}
          date={currentDate}
          onNavigate={(date) => setCurrentDate(date)}
          view={view}
          onView={(newView) => setView(newView)}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 600, maxWidth: 800 }}
          onSelectEvent={handleSelectEvent}
        />
      </div>
    </div>
  );
}
