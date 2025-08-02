import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';

function CompassionSection() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const docRef = doc(db, 'homepage', 'compassionSection');
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
    <section className="w-full bg-[#eaf2fb] flex flex-col md:flex-row items-center justify-between rounded-3xl py-8 px-2 sm:px-4 md:px-16 mb-8">
      {/* Left: Image */}
      <div className="w-full md:flex-1 flex justify-center md:justify-start mb-4 md:mb-0 relative min-h-[16rem] sm:min-h-[20rem] md:min-h-[28rem]">
        <img
          src={data.image}
          alt="Compassion"
          className="max-h-full max-w-full object-contain"
        />
      </div>
      {/* Right: Text */}
      <div className="w-full md:flex-1 flex flex-col items-center md:items-start md:pl-12 text-center md:text-left">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 leading-snug">
          <span className="" style={{ color: '#1253a2' }}>{data.title}</span>
          <span className="text-black">{data.subtitle}</span>
        </h2>
        <p className="text-gray-700 text-sm sm:text-base md:text-lg mb-2 max-w-xs sm:max-w-md">
          {data.description}
        </p>
      </div>
    </section>
  );
}

export default CompassionSection;