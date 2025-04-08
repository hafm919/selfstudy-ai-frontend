import { Link } from "react-router-dom";
import "./SplashPage.css";

export default function SplashPage() {
  return (
    <div className="splash">
      <h1>StudyMate AI</h1>
      <p>Your AI-powered study assistant</p>
      <div className="splash-buttons">
        <Link to="/login"><button className="primary">Login</button></Link>
        <Link to="/home"><button className="secondary">Enter</button></Link>
      </div>
    </div>
  );
}
