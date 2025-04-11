import { useState } from "react";
import { useLocation } from "react-router-dom";
import Sidebar from "../pages/Sidebar";

export default function FlashcardsPage() {
  const params = new URLSearchParams(useLocation().search);
  const chapter = params.get("chapter") || "Chapter 1";
  const subject = params.get("subject") || "Parallel Computing";

  const [subjects] = useState(["Parallel Computing", "Deep learning", "Engineering Finances"]);

  // Mock flashcards: you’ll replace this with AI-generated ones later
  const [cards] = useState([
    {
      id: 1,
      question: "What are the 4 types of parallelism?",
      answer: "Bit-level, Instruction-level, Data-level, Task-level",
    },
    {
      id: 2,
      question: "Why use parallel computing?",
      answer: "To increase computational speed and efficiency.",
    },
  ]);

  const [flipped, setFlipped] = useState({});

  const toggleFlip = (id) => {
    setFlipped((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="flex min-h-screen bg-[#f9f6f0]">
      <Sidebar subjects={subjects} current={subject} onSelect={() => {}} />

      <div className="flex-1 p-10 text-[#001d3d]">
        <h2 className="text-3xl font-bold mb-4">Flashcards</h2>
        <p className="text-sm text-gray-500 mb-6">
          {subject} &gt; {chapter}
        </p>

        <div className="grid gap-6">
          {cards.map((card) => (
            <div
              key={card.id}
              className="bg-[#a78bfa] text-white p-8 rounded-lg shadow-md cursor-pointer relative"
              onClick={() => toggleFlip(card.id)}
            >
              <div className="absolute top-2 right-4 text-sm italic opacity-70">
                {flipped[card.id] ? "Answer" : "Question"}
              </div>
              <h3 className="text-xl font-semibold mb-2">Flashcard {card.id}</h3>
              <p className="text-lg">
                {flipped[card.id] ? card.answer : card.question}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
