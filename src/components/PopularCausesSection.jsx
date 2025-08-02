import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, getDocs, doc, getDoc } from 'firebase/firestore';

function PopularCausesSection() {
  const [causes, setCauses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPopularCauses() {
      // Get popular cause IDs
      const popularDoc = await getDoc(doc(db, 'meta', 'popularCauses'));
      let popularIds = [];
      if (popularDoc.exists()) {
        popularIds = popularDoc.data().ids || [];
      }
      // Get all causes
      const querySnapshot = await getDocs(collection(db, 'causes'));
      const allCauses = [];
      querySnapshot.forEach((doc) => {
        allCauses.push({ id: doc.id, ...doc.data() });
      });
      // Filter only popular causes
      const filtered = popularIds
        .map(id => allCauses.find(cause => cause.id === id))
        .filter(Boolean);
      setCauses(filtered);
      setLoading(false);
    }
    fetchPopularCauses();
  }, []);

  if (loading) return <div className="h-40 flex items-center justify-center">Loading...</div>;
  if (!causes.length) return <div className="h-40 flex items-center justify-center">No popular causes available.</div>;

  return (
    <section className="w-full flex flex-col items-center my-8 sm:my-10 md:my-12 px-2 sm:px-10">
      <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-6 sm:mb-8 md:mb-10 text-center" style={{ color: '#1253a2' }}>
        Our Popular Causes
      </h2>
      <div className="flex flex-row flex-wrap gap-4 sm:gap-6 md:gap-8 w-full justify-center items-start">
        {causes.map((cause, idx) => (
          <div
            key={cause.id || idx}
            className={`flex-1 bg-gray-100 rounded-3xl shadow-md flex flex-col items-center px-2 sm:px-4 py-4 sm:py-6 max-w-[140px] sm:max-w-xs w-full mx-auto min-h-[220px] sm:min-h-[320px] md:min-h-[380px] ${idx === 1 ? 'md:min-h-[480px]' : ''}`}
          >
            <div className={`w-full h-24 sm:h-40 rounded-2xl mb-2 sm:mb-4 overflow-hidden flex items-center justify-center ${cause.bg}`}>
              <img
                src={cause.image}
                alt={cause.title}
                className="w-full h-full object-cover rounded-2xl"
              />
            </div>
            <h3 className="text-base sm:text-xl font-bold text-gray-900 mb-1 sm:mb-2 text-center">{cause.title}</h3>
            <p className="text-gray-700 text-xs sm:text-sm text-center ">{cause.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default PopularCausesSection;