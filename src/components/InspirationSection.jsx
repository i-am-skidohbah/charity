import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';

function InspirationSection() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const docRef = doc(db, 'homepage', 'inspirationSection');
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setData(docSnap.data());
      }
      setLoading(false);
    }
    fetchData();
  }, []);

  if (loading) return <div className="h-40 flex items-center justify-center">Loading...</div>;
  if (!data) return <div className="h-40 flex items-center justify-center">No data available.</div>;

  return (
    <section className="w-full relative min-h-[520px] py-10 px-4 flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <img
        src="/inspiration-bg.png"
        alt=""
        className="absolute inset-0 w-full h-full object-cover z-0"
        style={{ pointerEvents: 'none' }}
      />

      {/* Content */}
      <div className="momo relative z-20 flex flex-col-reverse md:flex-row items-center justify-center w-full max-w-5xl mx-auto gap-6 p-0">
        {/* Left: Text */}
        <div className="flex-1 max-w-xl text-white text-center md:text-justify">
          <h2 className="text-xl sm:text-2xl md:text-5xl font-bold mb-3 md:mb-6">{data.title}</h2>
          <p className="mb-2 text-xs sm:text-base text-justify md:text-lg">{data.paragraph1}</p>
          <p className="text-xs sm:text-base md:text-lg text-justify">{data.paragraph2}</p>
        </div>
        {/* Right: Image and caption */}
        <div className="flex-1 flex flex-col items-center mb-4 md:mb-0">
          <img
            src={data.image}
            alt={data.imageAlt || "Ossai Sunday Kelvin"}
            className="w-36 h-36 sm:w-44 sm:h-44 md:w-64 md:h-64 mb-3 sm:mb-4 object-cover rounded-full"
          />
          <div className="flex flex-col items-center">
            <span className="text-white text-xs sm:text-sm mb-1 text-center">{data.caption || "in honor of the life and legacy of"}</span>
            <span className="text-white text-lg sm:text-xl md:text-2xl font-bold text-center">{data.name || "Ossai Sunday Kelvin"}</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default InspirationSection;