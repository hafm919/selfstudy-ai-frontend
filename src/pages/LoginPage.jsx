import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && password) {
      navigate("/home");
    }
  };

  return (
    <div className="w-full h-full flex">
      {/* Left half */}
      <div className="w-1/2 flex items-center justify-center bg-[#f9f6f0] px-8">
        <form
          onSubmit={handleSubmit}
          className="bg-white w-full max-w-md p-10 rounded-xl shadow-lg space-y-6"
        >
          <div>
            <h2 className="text-3xl font-bold text-[#001d3d]">Welcome back</h2>
            <p className="text-sm text-gray-600 mt-1 mb-6">Please enter your details</p>
          </div>

          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#001d3d]"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#001d3d]"
          />

          <button
            type="submit"
            className="w-full bg-[#001d3d] text-white py-2 rounded-md font-semibold hover:opacity-90 transition"
          >
            Login
          </button>

          <p className="text-sm text-center text-gray-700">
            Don’t have an account?{" "}
            <Link
              to="/register"
              className="text-[#001d3d] font-medium underline hover:opacity-80"
            >
              Register
            </Link>
          </p>
        </form>
      </div>

      {/* Right blob side */}
      <div className="w-1/2 h-full bg-[#f9f6f0] flex items-center justify-center">
        <div className="w-48 h-48 bg-[#a78bfa] rounded-full blur-3xl opacity-80"></div>
      </div>
    </div>
  );
}
