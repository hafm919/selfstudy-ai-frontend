export default function DashboardPage() {
    return (
      <div className="min-h-screen bg-blue p-6 text-dark">
        <h1 className="text-2xl font-bold mb-4">Learner Dashboard</h1>
        <div className="bg-white p-4 rounded shadow space-y-4">
          <div>
            <h2 className="font-semibold">📊 Your Stats</h2>
            <p>Sessions completed: 5</p>
            <p>Average Score: 89%</p>
          </div>
          <div>
            <h2 className="font-semibold">🏆 Achievements</h2>
            <ul className="list-disc ml-6">
              <li>Completed Week 1</li>
              <li>Unlocked "Flashcard Master"</li>
            </ul>
          </div>
          <div>
            <h2 className="font-semibold">✨ Recommendations</h2>
            <p>Try reviewing your Mind Map for Module 2 today.</p>
          </div>
        </div>
      </div>
    );
  }
  