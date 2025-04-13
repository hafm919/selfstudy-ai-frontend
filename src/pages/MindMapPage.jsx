import { useLocation } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import Sidebar from "./Sidebar";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export default function MindMapPage() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const chapter = params.get("chapter") || "Unknown Chapter";
  const subject = params.get("subject") || "Unknown Subject";

  const [subjects, setSubjects] = useState(() => {
    const stored = localStorage.getItem("subjects");
    return stored ? JSON.parse(stored) : [];
  });

  const [mindmapUrl, setMindmapUrl] = useState("");
  const [loading, setLoading] = useState(true);
  const mapRef = useRef(null);

  useEffect(() => {
    // Simulate async fetch with placeholder
    setLoading(true);
    setTimeout(() => {
      setMindmapUrl("../habit-tracker.png"); // replace with your actual placeholder image path
      setLoading(false);
    }, 1000);
  }, [subject, chapter]);

  const handleDownloadPDF = async () => {
    if (!mapRef.current) return;

    const canvas = await html2canvas(mapRef.current);
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF({
      orientation: "landscape",
      unit: "px",
      format: [canvas.width, canvas.height],
    });

    pdf.addImage(imgData, "PNG", 0, 0, canvas.width, canvas.height);
    pdf.save(`${chapter}_mindmap.pdf`);
  };

  return (
    <div className="flex min-h-screen bg-[#f9f6f0]">
      <Sidebar subjects={subjects} current={subject} onSelect={() => {}} />

      <div className="flex-1 p-10 text-[#001d3d]">
        <h2 className="text-3xl font-bold mb-1">Mind Map</h2>
        <p className="text-sm text-gray-500 mb-6">
          {subject} &gt; {chapter}
        </p>

        {loading ? (
          <p className="text-center text-gray-500">Generating mind map...</p>
        ) : mindmapUrl ? (
          <div className="flex flex-col items-center">
            <div ref={mapRef}>
              <img
                src={mindmapUrl}
                alt="Generated mindmap"
                className="w-full max-w-4xl mb-6 border rounded shadow"
              />
            </div>
            <div className="flex gap-4">
              <a
                href={mindmapUrl}
                download={`${chapter}_mindmap.png`}
                className="bg-[#a78bfa] text-white font-semibold px-6 py-3 rounded-md hover:opacity-90 transition"
              >
                ⬇️ Download PNG
              </a>
              <button
                onClick={handleDownloadPDF}
                className="bg-white text-[#a78bfa] border-2 border-[#a78bfa] font-semibold px-6 py-3 rounded-md hover:bg-[#f3f1fc] transition"
              >
                📄 Download PDF
              </button>
            </div>
          </div>
        ) : (
          <p className="text-center text-red-500">Mind map could not be generated.</p>
        )}
      </div>
    </div>
  );
}
