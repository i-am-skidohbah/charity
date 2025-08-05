import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import Navbar from "../components/Navbar";
import JoinUsFooterSection from "../components/JoinUsFooterSection";

function CauseDetails() {
  const { id } = useParams();
  const [cause, setCause] = useState(null);
  const [loading, setLoading] = useState(true);
  const [slide, setSlide] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchCause() {
      setLoading(true);
      const docRef = doc(db, "causes", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setCause({ id: docSnap.id, ...docSnap.data() });
      }
      setLoading(false);
    }
    fetchCause();
  }, [id]);

  // Handle mobile detection
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth < 768);
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Auto-advance slideshow on mobile every 2 seconds
  useEffect(() => {
    if (!isMobile || !cause || !Array.isArray(cause.image) || cause.image.length < 2) return;
    const interval = setInterval(() => {
      setSlide((prev) => (prev + 1) % cause.image.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [isMobile, cause]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center text-lg">Loading...</div>;
  }

  if (!cause) {
    return <div className="min-h-screen flex items-center justify-center text-lg">Cause not found.</div>;
  }

  // Ensure cause.image is always an array for rendering
  const images = Array.isArray(cause.image) ? cause.image : [cause.image];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="max-w-3xl text-black mx-auto py-10 px-4">
        <button
          type="button"
          onClick={() => navigate("/causes")}
          className="flex items-center w-fit bg-green-800 text-blue-700 underline  mb-4 px-0 py-0 bg-transparent border-none cursor-pointer"
        >
          {/* Left arrow icon */}
          <svg
            className="mr-2"
            width="20"
            height="20"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path d="M15 19l-7-7 7-7" />
          </svg>
          <span>Back to all causes</span>
        </button>
        {/* Images */}
        {isMobile ? (
          <div className="mb-6">
            <div className="relative bg-black rounded-xl flex items-center justify-center h-56 overflow-hidden">
              <img
                src={images[slide]}
                alt={`Cause image ${slide + 1}`}
                className="absolute inset-0 w-full h-full object-cover opacity-60"
              />
              <span className="relative z-10 text-white text-lg md:text-2xl font-semibold text-center">
                {cause.title}
              </span>
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-2">
                {images.map((_, idx) => (
                  <span
                    key={idx}
                    className={`w-2 h-2 rounded-full ${slide === idx ? "bg-white" : "bg-gray-400"} inline-block`}
                    style={{ transition: "background" }}
                  />
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="koko grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {images.map((img, idx) => (
              <div
                key={idx}
                className={`bg-black rounded-xl flex items-center justify-center h-48 md:h-56 relative overflow-hidden mb-0 ${idx === 0 ? "col-span-1 md:col-span-2" : ""}`}
              >
                <img
                  src={img}
                  alt={`Cause image ${idx + 1}`}
                  className="absolute inset-0 w-full h-full object-cover opacity-60"
                />
                <span className="relative z-10 text-white text-lg md:text-2xl font-semibold text-center">
                  {cause.title}
                </span>
              </div>
            ))}
          </div>
        )}
        <p className="text-3xl mb-2">{cause.title}</p>
        <div className="mb-4 text-gray-400  font-semibold">{cause.category}</div>
        <p className="text-lg font-light text-justify mb-8">{cause.desc}</p>
      </div>
      <JoinUsFooterSection />
    </div>
  );
}

export default CauseDetails;