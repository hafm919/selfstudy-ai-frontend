import { Link } from "react-router-dom";

export default function SplashPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f9f6f0] text-[#001d3d] px-6">
      <div className="text-center">
        <h1 className="text-5xl font-extrabold mb-4">StudyMate AI</h1>
        <p className="text-lg mb-8">Your AI-powered study assistant</p>

        <div className="flex justify-center gap-6">
          <Link to="/login">
            <button className="text-[#001d3d] font-semibold px-6 py-2 rounded-md hover:bg-[#001d3d] hover:text-white transition">
              Login
            </button>
          </Link>
          <Link to="/preview">
            <button className="border-2 border-[#001d3d] text-[#001d3d] font-semibold px-6 py-2 rounded-md hover:bg-[#001d3d] hover:text-white transition">
              Enter as Guest
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
