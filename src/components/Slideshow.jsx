import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';
import DonateModal from './DonateModal'; // Import the modal

function Slideshow() {
  const [current, setCurrent] = useState(0);
  const [slidesData, setSlidesData] = useState([]);
  const [fade, setFade] = useState(true);
  const [showDonate, setShowDonate] = useState(false); // Modal state

  useEffect(() => {
    async function fetchSlides() {
      const querySnapshot = await getDocs(collection(db, 'slides'));
      const slidesArr = [];
      querySnapshot.forEach((doc) => {
        slidesArr.push(doc.data());
      });
      setSlidesData(slidesArr);
    }
    fetchSlides();
  }, []);

  // Auto-slide every 5 seconds with fade effect
  useEffect(() => {
    if (slidesData.length === 0) return;
    const timer = setTimeout(() => {
      setFade(false);
      setTimeout(() => {
        setCurrent((prev) => (prev + 1) % slidesData.length);
        setFade(true);
      }, 400); // fade out duration
    }, 5000);
    return () => clearTimeout(timer);
  }, [current, slidesData.length]);

  const slidesToShow = slidesData;

  const prevSlide = () => {
    setFade(false);
    setTimeout(() => {
      setCurrent((current - 1 + slidesToShow.length) % slidesToShow.length);
      setFade(true);
    }, 400);
  };

  const nextSlide = () => {
    setFade(false);
    setTimeout(() => {
      setCurrent((current + 1) % slidesToShow.length);
      setFade(true);
    }, 400);
  };

  if (slidesToShow.length === 0) {
    return <div className="h-[400px] flex items-center justify-center">No slides available.</div>;
  }

  return (
    <>
    <section className="relative w-full h-[400px] rounded-3xl overflow-hidden mb-10">
      {/* Background Image with fade transition */}
      <img
        src={slidesToShow[current]?.image}
        alt="Slide"
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${fade ? 'opacity-100' : 'opacity-0'}`}
      />
      {/* Overlay */}
      <div className="relative z-10 flex flex-col justify-center h-full max-w-xl w-full px-4
        items-center text-center
        md:items-start md:text-left">
        <h2 className="text-white text-2xl sm:text-4xl md:text-5xl font-extrabold leading-tight mb-4 sm:mb-6 drop-shadow-xl md:pl-40">
          {slidesToShow[current]?.title}
        </h2>
        <div className="w-full flex justify-center md:justify-start md:pl-40">
          <button
            className={`font-semibold rounded-full px-3 py-1 text-sm shadow transition min-w-[90px] ${slidesToShow[current]?.button?.color || ''}`}
            onClick={() => setShowDonate(true)}
            style={{ maxWidth: 160 }}
          >
            {slidesToShow[current]?.button?.text || ''}
          </button>
        </div>
      </div>
      
      {/* Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {slidesToShow.map((_, idx) => (
          <span
            key={idx}
            className={`w-3 h-3 rounded-full border-2 ${idx === current ? 'bg-white border-blue-800' : 'bg-gray-400 border-gray-400'}`}
            onClick={() => {
              setFade(false);
              setTimeout(() => {
                setCurrent(idx);
                setFade(true);
              }, 400);
            }}
            style={{ cursor: 'pointer' }}
          />
        ))}
      </div>
    </section>
    <DonateModal open={showDonate} onClose={() => setShowDonate(false)} />
    </>
  );
}

export default Slideshow;