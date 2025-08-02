import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';

function JoinUsSection() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const docRef = doc(db, 'homepage', 'joinUsSection');
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
    <section className="w-full bg-white relative flex flex-col md:flex-row items-stretch px-4 py-8 md:px-0 md:py-0">
      {/* Left: Image */}
      <div className="flex-1 flex items-end justify-start md:justify-start relative mb-6 md:mb-0">
        <img
          src={data.image}
          alt={data.imageAlt || "Join Us"}
          className="w-full max-w-xs sm:max-w-sm md:max-w-md h-auto object-contain md:object-left"
          style={{ maxHeight: 400 }}
        />
      </div>
      {/* Right: Content */}
      <div className="flex-1 flex flex-col items-center justify-center py-4 px-2 sm:px-6 md:px-16 text-center">
        <img src={data.logo || "/logo.png"} alt="Foundation Logo" className="w-24 sm:w-32 mx-auto mb-4" />
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2">
          <span className="text-blue-800">{data.titleBlue || "Join us"}</span>{' '}
          <span className="text-lime-400 px-2 rounded">{data.titleRest || "in"}</span>
          <br />
          <span className="text-lime-400 px-2 rounded">{data.titleLine2 || "making a difference"}</span>
        </h2>
        <p className="text-gray-700 mb-4 text-base sm:text-lg">
          {data.paragraph || "stand with us for compassion and change."}
        </p>
        <button className="bg-lime-400 text-black font-semibold rounded-full px-8 sm:px-10 py-3 text-base sm:text-lg shadow mb-4 w-full max-w-xs">
          {data.buttonText || "Donate Now"}
        </button>
      </div>
    </section>
  );
}

export default JoinUsSection;