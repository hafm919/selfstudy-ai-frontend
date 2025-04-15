import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import ReactFlow, { Background, Controls } from "reactflow";
import "reactflow/dist/style.css";

export default function MindMapPage({ onSelect }) {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const chapter = params.get("chapter") || "Unknown Chapter";
  const subject = params.get("subject") || "Unknown Subject";
  let chapterId = params.get("chapterId") || "";
  let subjectId = params.get("subjectId") || "";

  const [elements, setElements] = useState({ nodes: [], edges: [] });
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchMindMap = async () => {
      try {
        const res = await fetch(
          `${
            import.meta.env.VITE_API_URL
          }/subjects/${subjectId}/chapter/${chapterId}/mindmap`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await res.json();

        setElements({ nodes: data.nodes, edges: data.edges });
      } catch (err) {
        console.error("Failed to load mind map:", err);
      }
    };

    fetchMindMap();
  }, []);

  return (
    <div className="flex-col min-h-screen bg-[#f9f6f0]">
      <div className="flex-1 p-10 text-[#001d3d]">
        <h2 className="text-3xl font-bold mb-1">Mind Map</h2>
        <p className="text-sm text-gray-500 mb-2">
          {subject} &gt; {chapter}
        </p>
        <button
          onClick={() => {
            onSelect(subject, subjectId, "notes");
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="text-[#a78bfa] underline font-medium hover:text-[#7e63db] transition cursor-pointer"
        >
          ← Back to notes
        </button>
      </div>
      <div style={{ height: "600px", width: "100%" }}>
        <ReactFlow nodes={elements.nodes} edges={elements.edges} fitView>
          <Background />
          <Controls />
        </ReactFlow>
      </div>
    </div>
  );
}
