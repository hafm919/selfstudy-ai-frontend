import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = e => {
    e.preventDefault();
    // Placeholder: login logic
  };

  return (
    <div className="min-h-screen bg-blue flex items-center justify-center">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-80 space-y-4">
        <h2 className="text-2xl font-semibold text-dark text-center">Login</h2>
        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 border border-gray-300 rounded"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 border border-gray-300 rounded"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <button type="submit" className="w-full bg-yellow text-dark py-2 rounded hover:opacity-90">
          Login
        </button>
        <p className="text-sm text-center">
          Don't have an account? <span className="text-blue-700 underline cursor-pointer">Register</span>
        </p>
      </form>
    </div>
  );
}
