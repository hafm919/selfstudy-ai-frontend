import { Link } from "react-router-dom";

export default function SplashPage() {
  return (
    <div className="min-h-screen bg-beige flex flex-col items-center justify-center text-dark text-center px-4">
      <h1 className="text-4xl font-bold mb-2">StudyMate AI</h1>
      <p className="mb-6 text-lg">Your AI-powered study assistant</p>
      <div className="space-x-4">
        <Link to="/login">
          <button className="bg-dark text-white px-6 py-2 rounded">Login</button>
        </Link>
        <Link to="/home">
          <button className="border border-dark px-6 py-2 rounded hover:bg-dark hover:text-white">Enter</button>
        </Link>
      </div>
    </div>
  );
}
