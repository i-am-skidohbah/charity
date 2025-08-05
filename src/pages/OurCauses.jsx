import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import JoinUsFooterSection from '../components/JoinUsFooterSection';
import DonateModal from '../components/DonateModal'; // Import the modal
import { db } from '../firebase';
import { collection, getDocs, doc, getDoc } from 'firebase/firestore';
import { Link, useNavigate } from "react-router-dom";

const TABS = [
  { label: 'All Causes', value: 'all' },
  { label: 'Health', value: 'health' },
  { label: 'Education', value: 'education' },
  { label: 'Livelihoods', value: 'livelihoods' },
];

function OurCauses() {
  const [activeTab, setActiveTab] = useState('all');
  const [causes, setCauses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [heroImage, setHeroImage] = useState('');
  const [groupPhoto, setGroupPhoto] = useState('');
  const [page, setPage] = useState(1);
  const pageSize = 3; // Show 3 causes per page
  const [showDonate, setShowDonate] = useState(false); // Modal state

  const navigate = useNavigate();

  useEffect(() => {
    async function fetchCauses() {
      setLoading(true);
      const querySnapshot = await getDocs(collection(db, 'causes'));
      const causesArr = [];
      querySnapshot.forEach((doc) => {
        causesArr.push({ id: doc.id, ...doc.data() });
      });
      setCauses(causesArr);
      setLoading(false);
    }
    fetchCauses();
  }, []);

  useEffect(() => {
    async function fetchHeroAndGroupImages() {
      const heroSnap = await getDoc(doc(db, 'meta', 'causesHero'));
      if (heroSnap.exists()) {
        setHeroImage(heroSnap.data().image || '');
      }
      const groupSnap = await getDoc(doc(db, 'meta', 'causesGroupPhoto'));
      if (groupSnap.exists()) {
        setGroupPhoto(groupSnap.data().image || '');
      }
    }
    fetchHeroAndGroupImages();
  }, []);

  // Filter by tab/category and search
  const filteredCauses = causes.filter((cause) => {
    const matchesTab =
      activeTab === 'all' ? true : (cause.category || '').toLowerCase() === activeTab;
    const matchesCategory =
      categoryFilter === 'all' ? true : (cause.category || '').toLowerCase() === categoryFilter;
    const matchesSearch =
      search.trim() === ''
        ? true
        : (cause.title || '').toLowerCase().includes(search.toLowerCase()) ||
          (cause.desc || '').toLowerCase().includes(search.toLowerCase());
    return matchesTab && matchesCategory && matchesSearch;
  });

  // Get unique categories for dropdown
  const categories = [
    'all',
    ...Array.from(new Set(causes.map((c) => (c.category || '').toLowerCase()).filter(Boolean))),
  ];

  const paginatedCauses = filteredCauses.slice((page - 1) * pageSize, page * pageSize);
  const totalPages = Math.ceil(filteredCauses.length / pageSize);

  return (
    <>
    <div className="min-h-screen bg-white pb-0">
       {/* Top Blue Bar */}
      <div className="w-full h-8 rounded-b-xl" style={{ backgroundColor: '#1253a2' }} />
      <Navbar />

      {/* Hero Section */}
      <section className="relative w-full h-[340px] md:h-[400px] flex items-center justify-center rounded-b-3xl overflow-hidden mb-0">
        <img
          src={heroImage || "/causes/hero.jpg"}
          alt="Our Causes Hero"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        {/* Improved dark overlay for better text visibility */}
        <div className="absolute inset-0 bg-black" style={{ opacity: 0.5 }} />
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-3xl md:text-5xl font-bold mb-2">Our Program and Causes</h1>
          <p className="text-lg md:text-2xl font-medium">
            Explore the impact we're making across various initiatives.
          </p>
        </div>
      </section>

      {/* Search Bar Section styled like the image */}
      <div className="w-full flex justify-center mb-8 px-4">
        <div className="bg-lime-400 py-10 rounded-b-3xl shadow-lg w-full max-w-3xl px-4 flex justify-center">
          <div className="flex flex-col md:flex-row justify-center items-center gap-4 w-full text-black">
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search for a cause..."
              className="w-full max-w-md rounded-full border border-gray-300 bg-white px-6 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-blue-300 shadow"
            />
            {/* Add your select here if needed */}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex justify-center gap-4 mb-8">
        {TABS.map((tab) => (
          <button
            key={tab.value}
            onClick={() => setActiveTab(tab.value)}
            className={`px-6 py-2 rounded-full font-semibold transition ${
              activeTab === tab.value
                ? 'bg-white text-blue-900 shadow'
                : 'bg-[#eaf5e3] text-gray-700 hover:bg-white'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Causes Cards */}
      <div className="max-w-3xl mx-auto flex flex-col gap-8">
        {loading ? (
          <div className="text-center py-12 text-lg text-gray-500">Loading causes...</div>
        ) : paginatedCauses.length === 0 ? (
          <div className="text-center py-12 text-lg text-gray-500">No causes found.</div>
        ) : (
          paginatedCauses.map((cause) => (
            <div
              key={cause.id}
              className="flex flex-col md:flex-row items-center bg-white rounded-2xl shadow-lg p-6 md:p-8 gap-6 cursor-pointer"
              onClick={() => navigate(`/causes/${cause.id}`)}
            >
              <img
                src={cause.image}
                alt={cause.title}
                className="w-full md:w-56 h-40 md:h-40 object-cover rounded-xl"
              />
              <div className="flex-1 text-center md:text-left">
                <h2 className="text-xl md:text-2xl text-black font-bold mb-2">{cause.title}</h2>
                <p className="dec mb-4 text-gray-700">
                  {cause.desc && cause.desc.split(" ").length > 15
                    ? cause.desc.split(" ").slice(0, 15).join(" ") + "..."
                    : cause.desc}
                </p>
                <Link
                  to={`/causes/${cause.id}`}
                  className="koko inline-block bg-[#1253a2] !text-white font-semibold rounded-full px-6 py-2 shadow hover:bg-blue-900 transition"
                  onClick={e => e.stopPropagation()}
                >
                  Learn more
                </Link>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center gap-2 mt-12 mb-8">
        <button
          className="px-4 py-1 rounded-full border border-blue-800 text-blue-800 font-semibold bg-white hover:bg-blue-50 transition"
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page === 1}
        >
          Previous
        </button>
        {[...Array(totalPages)].map((_, idx) => (
          <span
            key={idx}
            onClick={() => setPage(idx + 1)}
            className={`px-3 py-1 rounded-full cursor-pointer ${
              page === idx + 1
                ? "bg-lime-400 text-blue-900 font-bold border border-lime-400"
                : "border border-blue-800 text-blue-800 font-semibold bg-white hover:bg-blue-50 transition"
            }`}
          >
            {idx + 1}
          </span>
        ))}
        <button
          className="px-4 py-1 rounded-full border border-blue-800 text-blue-800 font-semibold bg-white hover:bg-blue-50 transition"
          onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          disabled={page === totalPages}
        >
          Next
        </button>
      </div>

      <hr className="my-8 border-blue-200" />

      {/* Support a Cause Section */}
      <div className="text-center mb-12">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#1253a2] mb-2">
          Support a Cause That Matters
        </h2>
        <p className="text-gray-700 mb-4 text-base sm:text-lg">
          Your donation directly funds our programs and helps us create real change.
        </p>
        <button
          onClick={() => setShowDonate(true)}
          className="inline-block bg-lime-400 hover:bg-lime-500 text-black font-bold rounded-full px-8 py-3 text-lg shadow transition-colors"
        >
          Donate Now
        </button>
      </div>

      {/* Group Photo Row */}
      <div className="w-full">
        <img
          src={groupPhoto || "/causes/group-photo.jpg"}
          alt="Group"
          className="w-full h-64 md:h-80 object-cover object-center"
        />
      </div>

      <JoinUsFooterSection />
    </div>
    <DonateModal open={showDonate} onClose={() => setShowDonate(false)} />
      </>
  );
}

export default OurCauses;