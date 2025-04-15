import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const apiUrl = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !password || !repeatPassword) {
      setError("Please fill in all fields.");
      return;
    }

    if (password !== repeatPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const response = await fetch(`${apiUrl}/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName: name,
          email,
          password,
        }),
      });

      console.log(response);

      const data = await response.json();

      if (!response.ok) {
        const msg = data?.[0]?.msg || "Something went wrong";
        setError(msg);
        return;
      }

      setError("");
      setSuccess("Account created! Redirecting...");
      setTimeout(() => {
        navigate("/login");
      }, 1000);
    } catch (err) {
      setError("Network error. Please try again.");
    }
  };

  return (
    <div className="w-full min-h-screen flex flex-col lg:flex-row items-center">
      {/* Left half */}
      <div className="w-full lg:w-1/2 flex items-center justify-center bg-[#f9f6f0] px-6 py-8">
        <form
          onSubmit={handleSubmit}
          className="bg-white w-full max-w-md px-6 sm:px-8 py-10 sm:py-12 rounded-xl shadow-lg space-y-5"
        >
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#001d3d]">
              Create an account
            </h2>
            <p className="text-sm text-gray-600 mt-1 mb-6">
              Please fill in your details
            </p>
          </div>

          {error && (
            <div className="text-sm text-red-600 bg-red-100 p-2 rounded-md">
              {error}
            </div>
          )}
          {success && (
            <div className="text-sm text-green-600 bg-green-100 p-2 rounded-md">
              {success}
            </div>
          )}

          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#001d3d]"
          />

          <input
            type="email"
            placeholder="Email"
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

          <input
            type="password"
            placeholder="Repeat Password"
            value={repeatPassword}
            onChange={(e) => setRepeatPassword(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#001d3d]"
          />

          <button
            type="submit"
            className="w-full bg-[#001d3d] text-white py-2 rounded-md font-semibold hover:opacity-90 transition cursor-pointer"
          >
            Create Account
          </button>

          <p className="text-sm text-center text-gray-700">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-[#001d3d] font-medium underline hover:opacity-80"
            >
              Login
            </Link>
          </p>
        </form>
      </div>

      {/* Right blob side */}
      <div className="w-full lg:w-1/2 h-64 lg:h-full bg-[#f9f6f0] flex items-center justify-center">
        <div className="w-40 h-40 sm:w-48 sm:h-48 bg-[#a78bfa] rounded-full blur-3xl opacity-80"></div>
      </div>
    </div>
  );
}
