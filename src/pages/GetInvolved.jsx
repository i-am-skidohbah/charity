import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import JoinUsFooterSection from "../components/JoinUsFooterSection";
import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";

// Simple Modal component for the form
function VolunteerModal({ open, onClose }) {
  const [submitted, setSubmitted] = useState(false);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md mx-2 p-6 relative">
        <button
          className="absolute top-4 right-4 text-2xl text-gray-400 hover:text-gray-700"
          onClick={onClose}
          aria-label="Close"
        >
          &times;
        </button>
        {!submitted ? (
          <>
            <h3 className="text-2xl font-bold mb-4 text-[#1253a2] text-center">Volunteer With Us</h3>
            <form
              className="flex flex-col text-gray-700 gap-4"
              onSubmit={e => {
                e.preventDefault();
                setSubmitted(true);
              }}
            >
              <input
                type="text"
                placeholder="Full Name"
                required
                className="border border-gray-300 rounded-lg px-4 py-2"
              />
              <input
                type="email"
                placeholder="Email Address"
                required
                className="border border-gray-300 rounded-lg px-4 py-2"
              />
              <input
                type="tel"
                placeholder="Phone Number"
                className="border border-gray-300 rounded-lg px-4 py-2"
              />
              <textarea
                placeholder="Why do you want to volunteer?"
                rows={3}
                className="border border-gray-300 rounded-lg px-4 py-2"
              />
              <button
                type="submit"
                className="bg-lime-400 hover:bg-lime-500 text-black font-bold rounded-full px-6 py-3 text-lg shadow transition"
              >
                Submit
              </button>
            </form>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center py-8">
            <div className="text-3xl mb-2 text-lime-500">🎉</div>
            <div className="text-lg font-semibold text-[#1253a2] mb-2">Thank you for volunteering!</div>
            <div className="text-gray-700 text-center">We appreciate your interest and will contact you soon.</div>
            <button
              className="mt-6 bg-blue-700 hover:bg-blue-900 text-white font-bold rounded-full px-6 py-2 shadow"
              onClick={onClose}
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function GetInvolved() {
  const [modalOpen, setModalOpen] = useState(false);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const docRef = doc(db, "pages", "getinvolved");
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) setData(docSnap.data());
      setLoading(false);
    }
    fetchData();
  }, []);

  if (loading || !data) {
    return (
      <div className="min-h-screen flex items-center justify-center text-lg text-gray-700 bg-white">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Top Blue Bar */}
      <div className="w-full h-8 rounded-b-xl" style={{ backgroundColor: "#1253a2" }} />
      <Navbar />

      {/* Section 1: Writeup */}
      <section className="w-full py-16 px-4 bg-white flex flex-col items-center">
        <h1 className="text-3xl md:text-5xl font-bold text-[#1253a2] mb-4 text-center">
          {data.heroTitle || "Get Involved"}
        </h1>
        <p className="max-w-2xl text-lg md:text-xl text-gray-700 text-center">
          {data.heroText ||
            "Join us in making a difference! Whether you want to volunteer, partner, or support our mission, your involvement helps us create lasting impact in communities."}
        </p>
      </section>

      {/* Section 2: Picture Gallery */}
      <section className="w-full py-12 bg-gray-50 flex flex-col items-center">
        <h2 className="text-2xl md:text-3xl font-bold text-[#1253a2] mb-6 text-center">
          Our Volunteers in Action
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 w-full max-w-4xl px-2">
          {(data.gallery || []).map((src, idx) => (
            <div key={idx} className="w-full aspect-square overflow-hidden rounded-xl shadow">
              <img
                src={src}
                alt={`Volunteer ${idx + 1}`}
                className="w-full h-full object-cover object-center transition-transform duration-300 hover:scale-105"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </section>

      {/* Section 3: Writeup + Button */}
      <section className="w-full py-16 px-4 flex flex-col items-center bg-white">
        <h2 className="text-2xl md:text-3xl font-bold text-[#1253a2] mb-4 text-center">
          {data.section3Title || "Ready to Make a Difference?"}
        </h2>
        <p className="max-w-xl text-lg text-gray-700 text-center mb-6">
          {data.section3Text ||
            "Become a volunteer and help us reach more lives. Fill out the form to join our amazing team of changemakers!"}
        </p>
        <button
          className="bg-lime-400 hover:bg-lime-500 text-black font-bold rounded-full px-8 py-3 text-lg shadow transition"
          onClick={() => setModalOpen(true)}
        >
          {data.section3Btn || "Become a Volunteer"}
        </button>
      </section>

      <VolunteerModal open={modalOpen} onClose={() => setModalOpen(false)} />
      <JoinUsFooterSection />
    </div>
  );
}

export default GetInvolved;