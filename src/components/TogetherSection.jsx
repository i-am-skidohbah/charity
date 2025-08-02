import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';

function TogetherSection() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTogetherSection() {
      const docRef = doc(db, 'homepage', 'togetherSection');
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setData(docSnap.data());
      }
      setLoading(false);
    }
    fetchTogetherSection();
  }, []);

  if (loading) return <div className="h-40 flex items-center justify-center">Loading...</div>;
  if (!data) return <div className="h-40 flex items-center justify-center">No data available.</div>;

  return (
    <section className="w-full flex flex-col md:flex-row items-start gap-8 my-14 px-4 md:px-20">
      {/* Left: Text */}
      <div className="flex-1 flex flex-col items-center md:items-start ">
        <h2 className="text-4xl md:text-5xl font-extrabold text-center md:text-left mb-10 leading-tight">
          <span style={{ color: '#1253a2' }}>{data.title?.split(',')[0]}</span>
          <span className="text-black">{data.title?.substring(data.title.indexOf(','))}</span>
        </h2>
        {/* Mission (Mobile: image above, Desktop: no image) */}
        <div className="mb-4 w-full flex flex-col items-center  md:items-start gap-1">
          {/* Show first image above Mission on mobile only */}
          {data.images?.[0] && (
            <img
              src={data.images[0]}
              alt="Change 1"
              className="w-full h-56 object-cover rounded-2xl mb-4 block md:hidden"
            />
          )}
          <button className="bg-lime-400 text-black font-semibold rounded-full px-4 py-1 mb-1 text-sm flex items-center gap-2 shadow transition hover:bg-lime-500 focus:outline-none focus:ring-2 focus:ring-lime-300">
            {data.missionTitle}
          </button>
          <p className="text-gray-700 text-sm md:text-base text-center md:text-left text-justify max-w-xl">
            {data.missionText}
          </p>
        </div>
        {/* Vision (Mobile: image above, Desktop: no image) */}
        <div className="w-full flex flex-col items-center md:items-start gap-1">
          {/* Show second image above Vision on mobile only */}
          {data.images?.[1] && (
            <img
              src={data.images[1]}
              alt="Change 2"
              className="w-full h-56 object-cover rounded-2xl mb-4 block md:hidden"
            />
          )}
          <button
            className="text-white font-semibold rounded-full px-4 py-1 mb-1 text-sm flex items-center gap-2 shadow transition hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-300 capitalize"
            style={{ backgroundColor: '#1253a2' }}
          >
            {data.visionTitle}
          </button>
          <p className="text-gray-700 text-sm md:text-base text-center md:text-left text-justify max-w-xl">
            {data.visionText}
          </p>
        </div>
      </div>
      {/* Right: Images (Desktop only) */}
      <div className="flex-1 flex-col gap-8 w-full max-w-lg mx-auto md:flex md:mx-0  hidden md:flex">
        {data.images?.map((img, idx) => (
          <img
            key={idx}
            src={img}
            alt={`Change ${idx + 1}`}
            className="w-full h-56 object-cover rounded-2xl"
            style={{ minWidth: 0 }}
          />
        ))}
      </div>
    </section>
  );
}

export default TogetherSection;