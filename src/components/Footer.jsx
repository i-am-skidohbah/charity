import React from 'react';

function Footer() {
  return (
    <footer className="bg-blue-900 text-white py-12 px-4 w-full mt-0">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-12 justify-between items-start w-full">
        {/* Left: Logo & About */}
        <div className="flex-1 mb-10 md:mb-0 min-w-[220px]">
          <img src="/02.png" alt="Ossai Kingsley Foundation Logo" className="h-14 mb-5" />
          <p className="mb-5 text-blue-100 leading-relaxed text-base">
            Ossai Kingsley Foundation is dedicated to empowering vulnerable communities in Nigeria through sustainable programs in education, health, and economic development.
          </p>
          <div className="flex flex-col gap-2 mt-4 text-blue-100 text-sm">
            <a href="mailto:info@ossaikingsleyfoundation.org" className="hover:text-lime-400">info@ossaikingsleyfoundation.org</a>
            <span>+234 800 000 0000</span>
          </div>
        </div>
        {/* Center: Explore */}
        <div className="flex-1 mb-10 md:mb-0 min-w-[180px]">
          <h4 className="font-bold mb-4 text-white text-lg tracking-wide">Explore</h4>
          <ul className="space-y-3 text-white text-base">
            <li><a href="/" className="hover:text-lime-400 transition">Home</a></li>
            <li><a href="/about" className="hover:text-lime-400 transition">About Us</a></li>
            <li><a href="/causes" className="hover:text-lime-400 transition">Our Causes</a></li>
            <li><a href="/donate" className="hover:text-lime-400 transition">Donate</a></li>
            <li><a href="/contact" className="hover:text-lime-400 transition">Contact</a></li>
          </ul>
        </div>
        {/* Right: Get Involved */}
        <div className="flex-1 min-w-[200px]">
          <h4 className="font-bold mb-4 text-white text-lg tracking-wide">Get Involved</h4>
          <ul className="space-y-3 text-white text-base">
            <li><a href="/volunteer" className="hover:text-lime-400 transition">Volunteer</a></li>
            <li><a href="/partnerships" className="hover:text-lime-400 transition">Partnerships</a></li>
            <li><a href="/events" className="hover:text-lime-400 transition">Events</a></li>
            <li><a href="/stories" className="hover:text-lime-400 transition">Stories</a></li>
            <li><a href="/faq" className="hover:text-lime-400 transition">FAQ</a></li>
          </ul>
        </div>
      </div>
      {/* Socials */}
      <div className="flex justify-center gap-8 mt-12">
        <a href="https://facebook.com" aria-label="Facebook" className="hover:text-lime-400"><i className="fab fa-facebook-f text-2xl"></i></a>
        <a href="https://twitter.com" aria-label="X" className="hover:text-lime-400"><i className="fab fa-x-twitter text-2xl"></i></a>
        <a href="https://linkedin.com" aria-label="LinkedIn" className="hover:text-lime-400"><i className="fab fa-linkedin-in text-2xl"></i></a>
        <a href="https://instagram.com" aria-label="Instagram" className="hover:text-lime-400"><i className="fab fa-instagram text-2xl"></i></a>
        <a href="https://youtube.com" aria-label="YouTube" className="hover:text-lime-400"><i className="fab fa-youtube text-2xl"></i></a>
      </div>
      <div className="text-center text-blue-200 text-sm mt-10 tracking-wide">
        &copy; {new Date().getFullYear()} Ossai Kingsley Foundation. All Rights Reserved.
      </div>
    </footer>
  );
}

export default Footer;