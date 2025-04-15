// components/LoadingOverlay.jsx
import { useEffect, useState } from "react";

const tips = [
  " Take a 5-minute break every 25 minutes – it's called the Pomodoro Technique!",
  " Teach someone else to reinforce your understanding.",
  " Review your notes within 24 hours of learning something new.",
  " Use flashcards for quick memory reinforcement!",
  " Space out your revision – don't cram!",
  " Repetition is the key to memory!",
  " Highlight only after understanding the concept.",
];

export default function LoadingOverlay() {
  const [tipIndex, setTipIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTipIndex((prevIndex) => (prevIndex + 1) % tips.length);
    }, 4000); // Change tip every 4 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 bg-white bg-opacity-95 flex flex-col items-center justify-center z-50">
      {/* Spinner */}
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-purple-500 border-solid mb-6"></div>

      {/* Cycling Tip */}
      <p className="text-xl text-gray-700 text-center max-w-lg px-4 transition-opacity duration-500 ease-in-out">
        {tips[tipIndex]}
      </p>
    </div>
  );
}
