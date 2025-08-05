import React, { useEffect, useState, useRef } from 'react';
import Navbar from '../components/Navbar';
import JoinUsFooterSection from '../components/JoinUsFooterSection';
import { db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';
import founderCardBg from '../assets/inspiration-bg.png';
import DonateModal from '../components/DonateModal'; // Import the modal
import { faFacebook } from '@fortawesome/free-brands-svg-icons';
import emailjs from '@emailjs/browser';





function AboutUs() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showDonate, setShowDonate] = useState(false); // Modal state

  const form = useRef();
 

    const sendEmail = (e) => {
      e.preventDefault();

      emailjs.sendForm('service_pos52ih', 'template_ulall1o', form.current, {
        publicKey: 'Lbk87TG8MuAsjx2rL',
      })
      .then(() => {
        alert('Email sent successfully!');
      }, (error) => {
        alert('Failed to send email: ' + error.text);
      });
      form.current.reset();
    };

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
            <div className="overflow-x-auto">
              <table className="min-w-full border-separate border-spacing-y-4">
                <tbody>
                  {/* Mission Row */}
                  <tr>
                    <td className="align-top w-20">
                      <div className="w-14 h-14 flex items-center justify-center rounded-full bg-white shadow text-blue-800 text-2xl mx-auto">
                        {/* Academic Cap for Mission */}
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-8 h-8">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0v6m0 0H6m6 0h6" />
                        </svg>
                      </div>
                    </td>
                    <td>
                      <h3 className="text-xl font-bold mb-1 text-black">Our Mission</h3>
                      <p className="text-gray-700 text-justify">
                        {data.mission || "To empower vulnerable communities through sustainable programs in education, health, and economic development."}
                      </p>
                    </td>
                  </tr>
                  {/* Vision Row */}
                  <tr>
                    <td className="align-top w-20">
                      <div className="w-14 h-14 flex items-center justify-center rounded-full bg-white shadow text-blue-800 text-2xl mx-auto">
                        {/* Eye for Vision */}
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-8 h-8">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0zm6 0c0 5-9 9-9 9s-9-4-9-9 9-9 9-9 9 4 9 9z" />
                        </svg>
                      </div>
                    </td>
                    <td>
                      <h3 className="text-xl font-bold mb-1 text-black">Our Vision</h3>
                      <p className="text-gray-700 text-justify">
                        {data.vision || "A world where every individual has the opportunity to achieve their full potential and live with dignity."}
                      </p>
                    </td>
                  </tr>
                  {/* Values Row */}
                  <tr>
                    <td className="align-top w-20">
                      <div className="w-14 h-14 flex items-center justify-center rounded-full bg-white shadow text-blue-800 text-2xl mx-auto">
                        {/* Heart for Values */}
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-8 h-8">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.636l1.318-1.318a4.5 4.5 0 116.364 6.364L12 21.364l-7.682-7.682a4.5 4.5 0 010-6.364z" />
                        </svg>
                      </div>
                    </td>
                    <td>
                      <h3 className="text-xl font-bold mb-1 text-black">Our Values</h3>
                      <p className="text-gray-700 text-justify">
                        {data.values || "Compassion, integrity, collaboration, accountability, and sustainability."}
                      </p>
                    </td>
                  </tr>
                </tbody>
              </table>
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
          <div className="w-full bg-lime-400 py-2"></div>
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
            <form ref={form} onSubmit={sendEmail} className=" form flex-1 flex flex-col gap-4 bg-white rounded-2xl p-4 sm:p-8 shadow w-full max-w-full">
              <div className="flex gap-4 flex-col sm:flex-row">
                <input
                  type="text"
                  placeholder="First Name"
                  name='first'
                  className="flex-1 rounded px-3 py-2 border border-gray-300"
                />
                <input
                  type="text"
                  placeholder="Last Name"
                  name='last'
                  className="flex-1 rounded px-3 py-2 border border-gray-300"
                />
              </div>
              <input
                type="tel"
                name='phone'
                className="rounded px-3 py-2 border border-gray-300"
                placeholder="Enter phone number"
                required
              />

              <input
                type="email"
                placeholder="Email"
                name='email'
                className="rounded px-3 py-2 border border-gray-300"
              />
              <textarea
                placeholder="Message"
                rows={4}
                name='message'
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
                <div className="flex justify-center gap-8 mt-12">
                  <a href="https://facebook.com" aria-label="Facebook" className="hover:text-lime-400"><i className="fab fa-facebook-f text-2xl"></i></a>
                  <a href="https://twitter.com" aria-label="X" className="hover:text-lime-400"><i className="fab fa-x-twitter text-2xl"></i></a>
                  <a href="https://linkedin.com" aria-label="LinkedIn" className="hover:text-lime-400"><i className="fab fa-linkedin-in text-2xl"></i></a>
                  <a href="https://instagram.com/ossaikingsleyfoundation" aria-label="Instagram" className="hover:text-lime-400"><i className="fab fa-instagram text-2xl"></i></a>
                  <a href="https://youtube.com" aria-label="YouTube" className="hover:text-lime-400"><i className="fab fa-youtube text-2xl"></i></a>
                </div>
              </div>
              <div className="flex flex-col gap-2 mt-4 text-blue-100 text-sm">
                <a href="mailto:info@ossaikingsleyfoundation.org" className=" text-xl hover:text-lime-400">info@ossaikingsleyfoundation.org</a>
                <p className="mt-2 text-xl">+234 7069693926</p>
              </div>

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