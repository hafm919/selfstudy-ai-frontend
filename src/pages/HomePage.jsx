import { Link } from "react-router-dom";
import "./HomePage.css";

export default function HomePage() {
  return (
    <div className="home">
      <h1>Learning Roadmap</h1>
      <div className="cards">
        <div className="card">
          <h2>Theory</h2>
          <p>Study notes, mind maps</p>
          <button>Start Theory</button>
        </div>
        <div className="card">
          <h2>Practice</h2>
          <p>Flashcards & revision</p>
          <button>Start Practice</button>
        </div>
      </div>
      <Link to="/dashboard"><button className="to-dashboard">Go to Dashboard</button></Link>
    </div>
  );
}
