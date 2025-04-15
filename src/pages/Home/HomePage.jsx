import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import SubjectsPage from "./SubjectsPage";
import ChapterNotesPage from "./Chapter/ChapterNotesPage";
import FlashcardsPage from "./Chapter/ChapterFlashcardsPage";
import ChapterMindMapPage from "./Chapter/ChapterMindMapPage";
import RepetitionCalendar from "./Calendar/RepetitionCalendar";
import SchedulePage from "./Calendar/SchedulePage";

export default function HomePage() {
  const navigate = useNavigate();
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) {
      navigate("/login");
    }
  }, [navigate]);
  const location = useLocation();
  const [showSidebar, setShowSidebar] = useState(true);

  const urlSubject = new URLSearchParams(location.search).get("subject");
  const urlSubjectId = new URLSearchParams(location.search).get("subjectId");

  const [subject, setSubject] = useState(urlSubject || "");
  const [subjectId, setSubjectId] = useState(urlSubjectId || "");
  const [mode, setMode] = useState("subject"); // subject: SubjectsPage notes:ChapterNotesPage

  // Update localStorage whenever chapters change

  const handleSelect = (name, id, newMode) => {
    setSubject(name);
    setSubjectId(id);
    setMode(newMode);
  };

  function toggleSidebar() {
    setShowSidebar(!showSidebar);
    console.log(showSidebar);
  }
  let content = <SubjectsPage></SubjectsPage>;
  switch (mode) {
    case "subject":
      content = (
        <SubjectsPage
          subject={subject}
          subjectId={subjectId}
          onSelect={handleSelect}
        ></SubjectsPage>
      );
      break;
    case "notes":
      content = <ChapterNotesPage onSelect={handleSelect}></ChapterNotesPage>;
      break;
    case "flashcards":
      content = <FlashcardsPage onSelect={handleSelect}></FlashcardsPage>;
      break;
    case "mindmap":
      content = (
        <ChapterMindMapPage onSelect={handleSelect}></ChapterMindMapPage>
      );
      break;
    case "calendar":
      content = <RepetitionCalendar></RepetitionCalendar>;
      break;

    case "schedule":
      content = <SchedulePage onSelect={handleSelect}></SchedulePage>;
      break;
  }

  return (
    <div className=" relative flex min-h-screen bg-[#f9f6f0] ">
      {!showSidebar && (
        <button
          onClick={toggleSidebar}
          className="fixed top-4 left-4 z-20 bg-[#a78bfa] text-white px-3 py-2 rounded shadow-md"
        >
          ☰
        </button>
      )}
      <Sidebar
        current={subject}
        onSelect={handleSelect}
        showSidebar={showSidebar}
        toggleSidebar={toggleSidebar}
      />

      {/* File input */}

      <div
        className={`flex-1 flex flex-col p-5 min-h-screen transition-all duration-300 mt-9 ${
          showSidebar ? "md:ml-[25vw]" : "md:ml-0"
        }`}
      >
        {content}
      </div>
    </div>
  );
}
