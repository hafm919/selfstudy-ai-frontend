import "./DashboardPage.css";

export default function DashboardPage() {
  return (
    <div className="dashboard">
      <h1>Learner Dashboard</h1>
      <div className="grid">
        <div className="box">
          <h3>📊 Stats</h3>
          <p>5 sessions, 89% avg</p>
        </div>
        <div className="box">
          <h3>🏆 Achievements</h3>
          <ul>
            <li>Flashcard Master</li>
            <li>Week 1 Completed</li>
          </ul>
        </div>
        <div className="box">
          <h3>✨ Recommendations</h3>
          <p>Review Module 2 Mind Map</p>
        </div>
      </div>
    </div>
  );
}
