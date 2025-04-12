import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SplashPage from "./pages/SplashPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import HomePage from "./pages/HomePage";
import UploadPage from "./pages/UploadPage";
import NotesPage from "./pages/NotesPage";
import FlashcardsPage from "./pages/FlashcardsPage";
import RepetitionPage from "./pages/RepetitionPage";
import MindMapPage from "./pages/MindMapPage";
import SchedulePage from "./pages/SchedulePage";
import RepetitionCalendar from "./pages/RepetitionCalendar";
import StudyPlannerPage from "./pages/StudyPlannerPage";
import DashboardPage from "./pages/DashboardPage";
import GuestPreviewPage from "./pages/GuestPreviewPage";
import NotFoundPage from "./pages/NotFoundPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SplashPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/upload" element={<UploadPage />} />
        <Route path="/notes" element={<NotesPage />} />
        <Route path="/flashcards" element={<FlashcardsPage />} />
        <Route path="/review" element={<RepetitionPage />} />
        <Route path="/mindmap" element={<MindMapPage />} />
        <Route path="/schedule" element={<SchedulePage />} />
        <Route path="/calendar" element={<RepetitionCalendar />} />
        <Route path="/planner" element={<StudyPlannerPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/preview" element={<GuestPreviewPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}

export default App;
