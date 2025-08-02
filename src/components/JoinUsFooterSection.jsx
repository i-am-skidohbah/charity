import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';
import DonateModal from './DonateModal'; // Import the modal

function JoinUsFooterSection() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showDonate, setShowDonate] = useState(false); // Modal state

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
    <>
    <section className="w-full min-h-[200px] flex flex-col justify-end relative bg-white p-0">
      {/* Main Content */}
      <div className="flex w-full items-stretch"
        style={{
          flexDirection: 'row',
          height: '100%',
        }}
      >
        {/* Left: Image */}
        <div className="flex-1 flex items-end justify-start relative bg-transparent min-w-0"
          style={{
            minWidth: 0,
            maxWidth: '50%',
          }}
        >
          <img
            src={data.image}
            alt={data.imageAlt || "Join Us"}
            className="w-full h-full max-h-[220px] sm:max-h-[320px] md:max-h-[500px] object-contain md:object-left z-20"
            style={{
              background: 'none',
              position: 'relative',
              marginBottom: '0px',
              maxWidth: '100%',
            }}
          />
        </div>
        {/* Right: Content */}
        <div className="flex-1 flex flex-col items-center justify-center py-10 sm:py-8 px-2 sm:px-4 md:px-0 text-center bg-white relative z-10 min-w-0"
          style={{
            minWidth: 0,
            maxWidth: '50%',
          }}
        >
          <img src={data.logo || "/logo.png"} alt="Foundation Logo" className="w-16 sm:w-24 md:w-32 mx-auto mb-2 sm:mb-4" />
          <h2 className="text-lg sm:text-2xl md:text-4xl font-bold mb-1 sm:mb-2">
            <span style={{ color: '#1253a2' }}>{data.titleBlue || "Join us"}</span>{' '}
            <span className="text-black">{data.titleRest || "in"}</span>
            <br />
            <span className="text-black">{data.titleLine2 || "making a difference"}</span>
          </h2>
          <p className="text-gray-700 mb-2 sm:mb-4 text-xs sm:text-base md:text-lg">
            {data.paragraph || "stand with us for compassion and change."}
          </p>
          <button 
          onClick={() => setShowDonate(true)}
          className="bg-lime-400 text-black font-semibold rounded-full px-6 sm:px-8 md:px-10 py-2 sm:py-3 text-xs sm:text-base md:text-lg shadow mb-2 sm:mb-4 w-full max-w-xs">
            {data.buttonText || "Donate Now"}
            
          </button>
        </div>
      </div>
      {/* Footer Bar */}
      <footer
        className="w-full text-white py-2 sm:py-3 md:py-6 px-2 sm:px-4 flex flex-col md:flex-row items-center justify-between gap-2 sm:gap-4 absolute left-0 bottom-0 z-10"
        style={{ backgroundColor: '#1253a2' }}
      >
        <div className="flex items-center gap-1 sm:gap-2">
          <img src="/02.png" alt="Ossai Kingsley Foundation Logo" className="h-5 sm:h-6 md:h-8" />
          <span className="text-[10px] sm:text-xs md:text-sm text-blue-100 hidden sm:inline">
            © {new Date().getFullYear()} Ossai Kingsley Foundation
          </span>
        </div>
        <div className="flex gap-1 sm:gap-2 md:gap-6 items-center">
          <a
            href="https://instagram.com/ossaikingsleyfoundation"
            className="text-white hover:text-lime-400 text-sm sm:text-base md:text-lg"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fab fa-instagram"></i>
          </a>
          <span className="text-[10px] sm:text-xs md:text-sm text-blue-100 hidden sm:inline">@ossaikingsleyfoundation</span>
          <span className="text-[10px] sm:text-xs md:text-sm text-blue-100 hidden sm:inline">ossaikingsleyfoundation@gmail.com</span>
        </div>
      </footer>
    </section>
      {/* Donate Modal */}
    <DonateModal open={showDonate} onClose={() => setShowDonate(false)} />
    </>
  );
}

export default JoinUsFooterSection;