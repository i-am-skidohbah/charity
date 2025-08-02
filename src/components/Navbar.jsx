import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import DonateModal from './DonateModal'; // Import the modal

const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/about' },
  { label: 'Our Causes', href: '/causes' },
  { label: 'Get Involved', href: '/get-involved' },
  { label: 'Contact', href: '/contact' },
];

function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [showDonate, setShowDonate] = useState(false); // Modal state

  return (
    <>
      <nav className="w-full  py-4 sm:py-6 sticky top-0 bg-white relative z-50">
        <div className="flex items-center justify-between pl-40 gap-2">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0 flex items-center gap-2">
            <img src="/02.png" alt="Ossai Kingsley Foundation Logo" className="h-10 sm:h-14" />
            <span className="text-xs sm:text-sm font-semibold text-black hidden sm:inline leading-tight whitespace-pre-line text-left">
              Ossai{"\n"}Kingsley{"\n"}Foundation
            </span>
          </Link>
          {/* Desktop Menu */}
          <ul className="hidden md:flex items-center gap-4 text-base flex-1 justify-center">
            {NAV_LINKS.map((link) => (
              <li key={link.label}>
                <Link
                  to={link.href}
                  className="flex items-center gap-1 font-semibold text-black !font-semibold !text-black hover:text-blue-800 hover:bg-blue-50 focus:bg-blue-100 transition-all px-1 py-1 rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          {/* Donate Button (Desktop) */}
          <div className="hidden md:block">
            <button
              onClick={() => setShowDonate(true)}
              className="bg-lime-400 hover:bg-lime-500 !text-black !font-bold rounded-full px-6 py-2 shadow transition-colors"
            >
              Donate
            </button>
          </div>
          {/* Search Icon & Bar (Desktop) */}
          <div className="hidden md:flex items-center ml-4 relative">
            {!showSearch ? (
              <button
                className="p-2 rounded-full hover:bg-gray-100 transition text-black"
                onClick={() => setShowSearch(true)}
                aria-label="Show search"
              >
                <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <circle cx="11" cy="11" r="7" />
                  <line x1="16.5" y1="16.5" x2="21" y2="21" />
                </svg>
              </button>
            ) : (
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  placeholder="Search..."
                  autoFocus
                  className="text-black border border-gray-300 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300 transition"
                />
                <button
                  className="p-2 rounded-full hover:bg-gray-100 transition"
                  onClick={() => setShowSearch(false)}
                  aria-label="Close search"
                >
                  <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <line x1="6" y1="6" x2="18" y2="18" />
                    <line x1="6" y1="18" x2="18" y2="6" />
                  </svg>
                </button>
              </div>
            )}
          </div>
          {/* Mobile Menu Icon */}
          <button
            className="flex items-center font-bold cursor-pointer ml-2 md:hidden p-2 rounded hover:bg-gray-100"
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open menu"
          >
            <svg width="28" height="20" viewBox="0 0 22 12" fill="none">
              <rect y="1" width="22" height="2" fill="#222"/>
              <rect y="5" width="22" height="2" fill="#222"/>
              <rect y="9" width="22" height="2" fill="#222"/>
            </svg>
          </button>
        </div>
        {/* Mobile menu overlay */}
        <div
          className={`fixed inset-0 bg-black bg-opacity-40 z-40 transition-opacity duration-300 ${
            mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
          }`}
          onClick={() => setMobileMenuOpen(false)}
        />
        {/* Mobile menu drawer */}
        <div
          className={`fixed top-0 right-0 h-full w-72 max-w-full bg-white shadow-lg z-50 transform transition-transform duration-300
            ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}
          `}
        >
          <div className="flex items-center justify-between px-4 py-4 border-b">
            <img src="/02.png" alt="Ossai Kingsley Foundation Logo" className="h-10" />
            <button
              className="text-2xl font-bold text-gray-700"
              onClick={() => setMobileMenuOpen(false)}
              aria-label="Close menu"
            >
              &times;
            </button>
          </div>
          <ul className="flex flex-col gap-2 text-lg font-semibold px-6 py-6">
            {NAV_LINKS.map((link) => (
              <li key={link.label}>
                <Link
                  to={link.href}
                  className="block py-2 px-2 rounded hover:bg-blue-50 text-gray-800 transition"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li className="mt-4">
              <a
                href="#donate"
                className="block bg-lime-400 hover:bg-lime-500 text-black font-bold rounded-full px-6 py-2 text-center shadow transition-colors"
                onClick={e => {
                  e.preventDefault();
                  setMobileMenuOpen(false);
                  setShowDonate(true);
                }}
              >
                Donate
              </a>
            </li>
            {/* Mobile Search Bar */}
            <li className="mt-2">
              <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search..."
                className="border border-gray-300 rounded-full px-4 py-2 text-sm w-full focus:outline-none focus:ring-2 focus:ring-blue-300 transition"
              />
            </li>
          </ul>
        </div>
      </nav>
      <DonateModal open={showDonate} onClose={() => setShowDonate(false)} />
    </>
  );
}

export default Navbar;
