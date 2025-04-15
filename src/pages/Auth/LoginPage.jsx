import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email && password) {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/auth/login`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email,
              password,
            }),
          }
        );

        const data = await response.json();

        if (response.ok) {
          localStorage.setItem("token", data.token);
          localStorage.setItem("user", JSON.stringify(data.user));
          navigate("/home");
        } else {
          setError(data.message || "An error occurred");
        }
      } catch (error) {
        console.log(error);
        setError("Network error. Please try again later.");
      }
    }
  };

  return (
    <div className="w-full h-screen flex flex-col md:flex-row items-center justify-center">
      <div className="w-full md:w-1/2 flex items-center justify-center bg-[#f9f6f0] px-8 py-10 md:py-0">
        <form
          onSubmit={handleSubmit}
          className="bg-white w-full max-w-md p-10 rounded-xl shadow-lg space-y-6"
        >
          <div>
            <h2 className="text-3xl font-bold text-[#001d3d]">Welcome back</h2>
            <p className="text-sm text-gray-600 mt-1 mb-6">
              Please enter your details
            </p>
          </div>

          {error && (
            <div className="text-sm text-red-600 bg-red-100 p-2 rounded-md">
              {error}
            </div>
          )}

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
            className="w-full bg-[#001d3d] text-white py-2 rounded-md font-semibold hover:opacity-90 transition cursor-pointer"
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

      <div className="w-full md:w-1/2 h-64 md:h-full bg-[#f9f6f0] flex items-center justify-center">
        <div className="w-40 h-40 md:w-48 md:h-48 bg-[#a78bfa] rounded-full blur-3xl opacity-80 animate-floaty"></div>
      </div>
    </div>
  );
}
