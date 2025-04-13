import { useNavigate } from "react-router-dom";

export default function SplashPage() {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen bg-beige overflow-hidden text-[#001d3d]">
      <div className="absolute inset-0 z-0">
        {/* Dot pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(#d8cafe_1.2px,transparent_1.2px)] [background-size:16px_16px] opacity-70" />
        
        {/* Radial fade overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(249,246,240,0)_0%,_#f9f6f0_80%)]" />
        </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen text-center px-6">
        <h1 className="text-5xl font-extrabold text-[#a78bfa] mb-6">SelfStudy AI</h1>
        <p className="text-lg mb-10 text-[#5b4a89]">
          Your AI-powered learning companion — notes, flashcards, repetition, and more.
        </p>

        <div className="flex gap-6">
          <button
            onClick={() => navigate("/login")}
            className="px-6 py-3 bg-[#a78bfa] text-white font-semibold rounded-md hover:opacity-90 transition"
          >
            Login
          </button>
          <button
            onClick={() => navigate("/home")}
            className="px-6 py-3 border-2 border-[#a78bfa] text-[#a78bfa] font-semibold rounded-md hover:bg-[#f3f0ff] transition"
          >
            Enter as Guest
          </button>
        </div>
      </div>
    </div>
  );
}
