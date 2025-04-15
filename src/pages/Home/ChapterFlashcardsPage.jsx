import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Sidebar from "./Sidebar";

export default function FlashcardsPage({ onSelect }) {
  const location = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(location.search);
  const chapter = params.get("chapter") || "Unknown Chapter";
  const subject = params.get("subject") || "Unknown Subject";
  const chapterId = params.get("chapterId") || "";
  const subjectId = params.get("subjectId") || "";
  const token = localStorage.getItem("token");

  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);

  useEffect(() => {
    const fetchFlashcards = async () => {
      if (!chapterId || !subjectId) return;

      try {
        const res = await fetch(
          `${
            import.meta.env.VITE_API_URL
          }/subjects/${subjectId}/chapter/${chapterId}/flashcards`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await res.json();
        setCards(data);
        setFlipped(Array(data.length).fill(false));
      } catch (err) {
        console.error("Failed to fetch flashcards:", err);
      }
    };

    fetchFlashcards();
  }, [chapterId, subjectId]);

  const toggleCard = (index) => {
    const copy = [...flipped];
    copy[index] = !copy[index];
    setFlipped(copy);
  };

  return (
    <div className="flex min-h-screen bg-[#f9f6f0]">
      <div className="flex-1 p-10 text-[#001d3d]">
        <h2 className="text-3xl font-bold mb-1">Flashcards</h2>
        <p className="text-sm text-gray-500 mb-4">
          {subject} &gt; {chapter}
        </p>

        {/* 🔙 Back to Notes Button */}
        <div className="mb-6">
          <button
            onClick={() => onSelect(subject, subjectId, "notes")}
            className="text-[#a78bfa] underline font-medium hover:text-[#7e63db] transition"
          >
            ← Back to Notes
          </button>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-2">
          {cards.map((card, i) => (
            <div
              key={card.id || i}
              className="w-full h-48 bg-white rounded-xl shadow-md perspective cursor-pointer"
              onClick={() => toggleCard(i)}
            >
              <div
                className={`relative w-full h-full transition-transform duration-500 transform-style-preserve-3d ${
                  flipped[i] ? "rotate-y-180" : ""
                }`}
              >
                <div className="absolute inset-0 bg-[#a78bfa] text-white rounded-xl flex items-center justify-center px-4 text-lg font-medium backface-hidden">
                  <p>{card.question}</p>
                </div>
                <div className="absolute inset-0 bg-white text-[#001d3d] rounded-xl flex items-center justify-center px-4 text-md font-semibold rotate-y-180 backface-hidden">
                  <p>{card.answer}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
