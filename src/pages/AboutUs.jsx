import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import JoinUsFooterSection from '../components/JoinUsFooterSection';
import { db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';
import founderCardBg from '../assets/inspiration-bg.png';
import DonateModal from '../components/DonateModal'; // Import the modal

function AboutUs() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showDonate, setShowDonate] = useState(false); // Modal state

  useEffect(() => {
    async function fetchAbout() {
      const docRef = doc(db, 'pages', 'about');
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setData(docSnap.data());
      }
      setLoading(false);
    }
    fetchAbout();
  }, []);

  if (loading) return <div className="h-40 flex items-center justify-center">Loading...</div>;
  if (!data) return <div className="h-40 flex items-center justify-center">No data available.</div>;

  return (
    <>
    <div className="bg-white min-h-screen flex flex-col">
      {/* Top Blue Bar */}
      <div className="w-full h-8 rounded-b-xl" style={{ backgroundColor: '#1253a2' }} />
      <Navbar />

      {/* Hero Section */}
      <section className="relative w-full h-[340px] md:h-[400px] flex items-center justify-center overflow-hidden">
        <img
          src={data.heroImage || "/about/hero.jpg"}
          alt="About Hero"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        {/* Centered circle div */}
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <div
            className="bg-[#1253a2] bg-opacity-90 rounded-full flex flex-col items-center justify-center px-8 py-8 md:px-16 md:py-16 shadow-lg max-w-lg w-full"
            style={{
              minWidth: 380,
              minHeight: 380,
              maxWidth: 380,
              maxHeight: 380,
            }}
          >
            <h1 className="text-2xl md:text-3xl font-bold text-white mb-2 text-center">
              {data.heroTitle || "About Our Organization"}
            </h1>
            <p className="text-white text-center mb-4">
              {data.heroSubtitle || "Our mission, vision, and the people behind the cause."}
            </p>
            <a
              href="#journey"
              className="border border-white !text-white rounded-full px-6 py-2 font-semibold hover:bg-white hover:text-blue-700 transition"
            >
              Read more
            </a>
          </div>
        </div>
      </section>

      {/* Journey Section */}
      <section
        id="journey"
        className="max-w-7xl mx-auto px-4 py-14 flex flex-col md:flex-row items-center gap-10 "
      >
        <div className="flex-1 md:pr-10 textalign-center md:text-left pl-0 md:pl-40 z-10">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4 leading-tight text-black textalign-center md:text-left">
            {data.journeyTitle || "Our Journey"}<br />
            <span className="block">{data.journeySubtitle || "So Far"}</span>
          </h2>
          <p className="text-lg text-gray-800 text-justify mb-6 ">
            {data.journeyText1 ||
              "Founded in 2024, Ossai Kingsley Foundation began with a simple yet powerful idea: to bring hope and sustainable change to the underserved communities. What started as a small grassroots initiative has grown into a significant force for good, touching thousands of lives across Nigeria."}
          </p>
          <p className="text-lg text-gray-800 text-justify">
            {data.journeyText2 ||
              "We are driven by the belief that every individual deserves the opportunity to thrive, irrespective of their circumstances. Our history is a testament to the power of collective action and unwavering dedication."}
          </p>
        </div>
        <div className="flex-1 flex justify-center">
          <img
            src={data.logo || "/logo.png"}
            alt="Ossai Kingsley Foundation Logo"
            className="w-80 h-80 object-contain rounded-full bg-white shadow"
          />
        </div>
      </section>
      <hr className="my-8 border-lime-400" />

      {/* Guiding Principles */}
      <section className="momo w-full px-0 py-12 md:px-40 z-10 flex justify-center">
        <div className="bg-gray-100 rounded-2xl p-8 flex flex-col gap-8 text-left md:text-left w-full max-w-2xl">
          {/* Mission */}
          <div className="flex  gap-6">
            <div className="w-14 h-14 flex items-center justify-center rounded-full    text-blue-800 text-2xl">
              {/* Example: Academic Cap for Mission */}
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-8 h-8">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0v6m0 0H6m6 0h6" />
              </svg>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-1 text-black">Our Mission</h3>
              <p className="text-gray-700">
                {data.mission || "To empower vulnerable communities through sustainable programs in education, health, and economic development."}
              </p>
            </div>
          </div>
          {/* Vision */}
          <div className="flex  gap-6">
            <div className="w-14 h-14 flex items-center justify-center  rounded-full  text-blue-800 text-2xl">
              {/* Example: Eye for Vision */}
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-8 h-8">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0zm6 0c0 5-9 9-9 9s-9-4-9-9 9-9 9-9 9 4 9 9z" />
              </svg>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-1 text-black">Our Vision</h3>
              <p className="text-gray-700">
                {data.vision || "A world where every individual has the opportunity to achieve their full potential and live with dignity."}
              </p>
            </div>
          </div>
          {/* Values */}
          <div className="flex  gap-6">
            <div className="w-14 h-14 flex items-center justify-center  rounded-full text-blue-800 text-2xl">
              {/* Example: Heart for Values */}
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-8 h-8">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.636l1.318-1.318a4.5 4.5 0 116.364 6.364L12 21.364l-7.682-7.682a4.5 4.5 0 010-6.364z" />
              </svg>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-1 text-black">Our Values</h3>
              <p className="text-gray-700">
                {data.values || "Compassion, integrity, collaboration, accountability, and sustainability."}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Meet the Founder */}
      <section className="w-full px-0 py-12 md:px-0 px-0 md:px-40 z-10">
        <h2 className="text-4xl md:text-5xl font-extrabold text-center mb-10 text-black">
          Meet the Founder
        </h2>
        <div className="flex justify-center">
          <div className="bg-white rounded-3xl shadow-lg overflow-hidden max-w-2xl w-full ">
            <div className="relative">
              {/* Founder Card Background */}
              <div className="absolute inset-0 w-full h-full rounded-3xl overflow-hidden">
                <img
                  src={founderCardBg}
                  alt=""
                  className="w-full h-full object-cover object-top"
                  style={{ opacity: 1 }}
                />
              </div>
              {/* Founder Image */}
              <img
                src={data.founderImage || "/about/founder-card.jpg"}
                alt={data.founderName || "Dr. Kingsley Ossai"}
                className="absolute right-0 bottom-0 h-[340px] md:h-[380px] object-cover object-top z-10"
                style={{ borderRadius: "0 0 32px 0" }}
              />
              {/* Founder Card Content */}
              <div className="relative z-20 flex text-left flex-col justify-center h-[340px] md:h-[380px] pl-10 pr-[45%] py-10">
                <h3 className="text-3xl md:text-4xl  font-extrabold mb-2 text-lime-400 drop-shadow" style={{ color: "#B6E900" }}>
                  {data.founderName || "Dr. Kingsley Ossai"}
                </h3>
                <div className="text-white font-semibold text-lg mb-1 drop-shadow">
                  {data.founderRole || "Founder & CEO"}
                </div>
                <div className="text-white text-base font-normal drop-shadow">
                  {data.founderBio || "Passionate about community development and strategic partnerships."}
                </div>
              </div>
              {/* Overlay for top pattern (optional, for dots) */}
              <div className="absolute left-0 top-0 w-full h-20 rounded-t-3xl bg-gradient-to-b from-gray-100/80 to-transparent pointer-events-none" />
            </div>
          </div>
        </div>
      </section>

      {/* Join Mission Section */}
      <section className="w-full  ">
        <div  className="w-full bg-lime-400 py-2"></div>
        <div className="relative w-full h-[180px] md:h-[220px] flex items-center justify-center overflow-hidden ">
          {/* Zoomed and grayscale image */}
          <img
            src={data.missionGroupImage || "/about/mission-group.jpg"}
            alt="Mission Group"
            className="absolute left-0 bottom-0 inset-0 w-full h-full object-cover object-center scale-125 filter grayscale"
            style={{ zIndex: 1 }}
          />
          {/* Grayscale overlay */}
          <div className="absolute inset-0 bg-opacity-30 z-10" />
          <div className="relative z-20 flex flex-col items-center justify-center w-full">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-2 text-center drop-shadow">
              {data.missionTitle || "Join Our Mission, Make a Difference"}
            </h2>
            <p className="text-white text-center mb-4 drop-shadow">
              {data.missionSubtitle || "Discover how you can contribute to creating a brighter future for those in need."}
            </p>
            <button
              onClick={() => setShowDonate(true)}
              
              className="bg-lime-400 hover:bg-lime-500 text-black font-bold rounded-full px-8 py-3 text-lg shadow transition-colors"
            >
              Donate Now
            </button>
          </div>
        </div>
      </section>

      {/* Get in Touch Section */}
      <section className="w-full bg-[#1253a2] py-12 text-black">
        <div className="w-full max-w-4xl mx-auto flex flex-col md:flex-row gap-8 items-center px-2 sm:px-4">
          <form className="flex-1 flex flex-col gap-4 bg-white rounded-2xl p-4 sm:p-8 shadow w-full max-w-full">
            <div className="flex gap-4 flex-col sm:flex-row">
              <input
                type="text"
                placeholder="First"
                className="flex-1 rounded px-3 py-2 border border-gray-300"
              />
              <input
                type="text"
                placeholder="Last"
                className="flex-1 rounded px-3 py-2 border border-gray-300"
              />
            </div>
            <input
              type="email"
              placeholder="Email"
              className="rounded px-3 py-2 border border-gray-300"
            />
            <textarea
              placeholder="Message"
              rows={4}
              className="rounded px-3 py-2 border border-gray-300"
            />
            <button
              type="submit"
              className="bg-blue-800 text-white font-semibold rounded px-6 py-2 hover:bg-blue-900 transition"
            >
              Send Message
            </button>
          </form>
          <div className="flex-1 flex flex-col items-center justify-center text-white w-full max-w-full">
            <h3 className="text-2xl font-bold mb-4">{data.contactTitle || "Get in touch"}</h3>
            <div className="fofo flex gap-4 mt-4">
              {/* Facebook */}
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8  rounded-full flex items-center justify-center  hover:bg-blue-100 transition"
                aria-label="Facebook"
              >
                <svg fill="currentColor" viewBox="0 0 24 24" className="w-5 h-5">
                  <path d="M22.675 0h-21.35C.595 0 0 .592 0 1.326v21.348C0 23.408.595 24 1.325 24h11.495v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.797.143v3.24l-1.918.001c-1.504 0-1.797.715-1.797 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116C23.406 24 24 23.408 24 22.674V1.326C24 .592 23.406 0 22.675 0"/>
                </svg>
              </a>
              {/* WhatsApp */}
              <a
                href="https://wa.me/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8  rounded-full flex items-center justify-center text-green-500 hover:bg-green-100 transition"
                aria-label="WhatsApp"
              >
                <svg fill="currentColor" viewBox="0 0 24 24" className="w-5 h-5">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.472-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.149-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.372-.01-.571-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.363.709.306 1.262.489 1.694.626.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.288.173-1.413-.074-.124-.272-.198-.57-.347zm-5.421 7.617h-.001a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.999-3.648-.235-.374A9.86 9.86 0 012.1 12.045c0-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.987c-.003 5.45-4.437 9.883-9.888 9.883zm8.413-18.297A11.815 11.815 0 0011.988 0C5.373 0 0 5.373 0 11.988c0 2.117.553 4.187 1.601 6.006L.057 23.925a1.001 1.001 0 001.225 1.225l5.931-1.545A11.934 11.934 0 0011.988 24c6.615 0 11.988-5.373 11.988-12.012 0-3.193-1.245-6.197-3.512-8.286z"/>
                </svg>
              </a>
              {/* Twitter */}
              <a
                href="https://twitter.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8  rounded-full flex items-center justify-center text-blue-400 hover:bg-blue-100 transition"
                aria-label="Twitter"
              >
                <svg fill="currentColor" viewBox="0 0 24 24" className="w-5 h-5">
                  <path d="M24 4.557a9.93 9.93 0 01-2.828.775 4.932 4.932 0 002.165-2.724c-.951.564-2.005.974-3.127 1.195a4.916 4.916 0 00-8.38 4.482C7.691 8.095 4.066 6.13 1.64 3.161c-.542.929-.888 2.005-.888 3.163 0 2.18 1.111 4.102 2.809 5.229a4.904 4.904 0 01-2.229-.616c-.054 2.281 1.581 4.415 3.949 4.89a4.936 4.936 0 01-2.224.084c.627 1.956 2.444 3.377 4.6 3.417A9.867 9.867 0 010 21.543a13.94 13.94 0 007.548 2.209c9.058 0 14.009-7.496 14.009-13.986 0-.21 0-.423-.016-.634A9.936 9.936 0 0024 4.557z"/>
                </svg>
              </a>
              {/* Instagram */}
              <a
                href="https://instagram.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8  rounded-full flex items-center  justify-center text-pink-500 hover:bg-pink-100 transition"
                aria-label="Instagram"
              >
                <svg fill="currentColor" viewBox="0 0 24 24" className="w-5 h-5">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.334 3.608 1.308.974.974 1.246 2.241 1.308 3.608.058 1.266.069 1.646.069 4.85s-.011 3.584-.069 4.85c-.062 1.366-.334 2.633-1.308 3.608-.974.974-2.241 1.246-3.608 1.308-1.266.058-1.646.069-4.85.069s-3.584-.011-4.85-.069c-1.366-.062-2.633-.334-3.608-1.308-.974-.974-1.246-2.241-1.308-3.608C2.175 15.647 2.163 15.267 2.163 12s.012-3.584.07-4.85c.062-1.366.334-2.633 1.308-3.608.974-.974 2.241-1.246 3.608-1.308C8.416 2.175 8.796 2.163 12 2.163zm0-2.163C8.741 0 8.332.013 7.052.072 5.775.131 4.602.425 3.635 1.392 2.668 2.359 2.374 3.532 2.315 4.809 2.256 6.089 2.243 6.498 2.243 12c0 5.502.013 5.911.072 7.191.059 1.277.353 2.45 1.32 3.417.967.967 2.14 1.261 3.417 1.32 1.28.059 1.689.072 7.191.072s5.911-.013 7.191-.072c1.277-.059 2.45-.353 3.417-1.32.967-.967 1.261-2.14 1.32-3.417.059-1.28.072-1.689.072-7.191s-.013-5.911-.072-7.191c-.059-1.277-.353-2.45-1.32-3.417C21.05.425 19.877.131 18.6.072 17.32.013 16.911 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zm0 10.162a3.999 3.999 0 110-7.998 3.999 3.999 0 010 7.998zm6.406-11.845a1.44 1.44 0 11-2.881 0 1.44 1.44 0 012.881 0z"/>
                </svg>
              </a>
            </div>
            <p className="mt-4">{data.contactSubtitle}</p>
          </div>
        </div>
      </section>
      

      <JoinUsFooterSection />
    </div>
    <DonateModal open={showDonate} onClose={() => setShowDonate(false)} />
      </>
  );
}

export default AboutUs;