"use client";

import { useState, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import { FaShareAlt,FaExpandAlt } from "react-icons/fa"; // share icon

const pdfFiles = {
  model1: { title: "Entrance Model Set 1", path: "/pdfs/model1.pdf" },
  model2: { title: "Entrance Model Set 2", path: "/pdfs/model2.pdf" },
  model3: { title: "Entrance Model Set 3", path: "/pdfs/model3.pdf" },
  model4: { title: "Entrance Model Set 4", path: "/pdfs/model4.pdf" },
};
const fsBtnRound = " rounded-full w-10 h-10  text-gray-600 flex items-center justify-center gap-2 group cursor-pointer transition-all duration-200 ease-in-out hover:text-blue-600 hover:shadow hover:bg-gray-200"
export default function PdfViewerPage() {
  const { file } = useParams();
  const router = useRouter();
  const selected = pdfFiles[file];

  const [scale, setScale] = useState(1);

  if (!selected) {
    return <p className="pt-24 text-center text-red-600">PDF not found.</p>;
  }

  const handleShare = async () => {
    try {
      const url = window.location.href;
      if (navigator.share) {
        await navigator.share({ title: selected.title, url });
      } else {
        await navigator.clipboard.writeText(url);
        setShareText("Copied!");
        setTimeout(() => setShareText("Share"), 2000);
      }
    } catch (err) {
      console.log("Share failed:", err);
    }
  };
  const iframeRef = useRef(null);

  const openFullscreen = () => {
    const iframeEl = iframeRef.current;
    if (iframeEl.requestFullscreen) {
      iframeEl.requestFullscreen();
    } else if (iframeEl.webkitRequestFullscreen) {
      iframeEl.webkitRequestFullscreen(); // Safari
    } else if (iframeEl.msRequestFullscreen) {
      iframeEl.msRequestFullscreen(); // IE/Edge
    }
  };

  return (
    <div className="max-w-6xl mx-auto pt-24">
      {/* Header */}
      <div className="flex items-center justify-between mb-4 flex-wrap gap-4">
        <div className="flex  items-center">
          <button
            onClick={() => router.push("/entrance-questions")}
            className="text-gray-700 hover:text-blue-600 mr-4 font-semibold hover:bg-gray-200 p-1 hover:shadow rounded-xl  flex items-center"
          >
            <span className="mr-1">←</span> Back
          </button>
          <h1 className="text-3xl font-bold text-blue-900 ">{selected.title}</h1>
        </div>

        <div className="flex gap-3">
          {/* fulscreen */}
          <button 
          onClick={openFullscreen}
          className={fsBtnRound}
          >
             <FaExpandAlt />
          </button>
          {/* Share button */}
          <button
            onClick={handleShare}
            className={fsBtnRound}
          >
            <FaShareAlt />

          </button>

          {/* Download button */}
          <button
            onClick={() => {
              const link = document.createElement("a");
              link.href = selected.path;
              link.download = `${file}.pdf`;
              link.click();
            }}
            className="border rounded-lg shadow px-4 py-2 bg-blue-900 hover:bg-blue-600 text-white"
          >
            Download
          </button>

          
        </div>
      </div>

      {/* PDF Viewer */}
      <div className="border justify-self-center rounded shadow overflow-auto h-[80vh] w-full " >
        <iframe
          ref={iframeRef}
          src="/pdfs/model1.pdf"
          className="w-full h-screen"
         
          title={selected.title}
          width={`${scale * 100}%`}
          height="100%"
          style={{ border: "none", transformOrigin: "top left" }}
        />
      </div>
    </div>
  );
}
