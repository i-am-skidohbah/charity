// src/admin/AdminDashboard.jsx
import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc
} from 'firebase/firestore';
import { FaImages, FaUsers, FaHeart, FaStar, FaLightbulb, FaHandsHelping, FaRegCopyright, FaSignOutAlt, FaUserCircle, FaSearch, FaChevronDown, FaChevronUp, FaFileAlt, FaTable } from 'react-icons/fa';
import SlideshowAdmin from './SlideshowAdmin';
import AdminLogin from './AdminLogin';
import TogetherSectionAdmin from './TogetherSectionAdmin';
import CompassionSectionAdmin from './CompassionSectionAdmin';
import InspirationSectionAdmin from './InspirationSectionAdmin';
import JoinUsSectionAdmin from './JoinUsSectionAdmin';
import OurCausesAdmin from './OurCausesAdmin';
import AboutAdmin from './AboutAdmin';
import GetInvolvedAdmin from './GetInvolvedAdmin';
import ContactAdmin from './ContactAdmin';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import FormsTableAdmin from './FormsTableAdmin'; // Import the FormsTableAdmin component



function AdminDashboard() {
  const [slides, setSlides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ image: '', title: '', buttonText: '', buttonColor: '' });
  const [editId, setEditId] = useState(null);
  const [activeSection, setActiveSection] = useState('Slideshow');
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [homepageOpen, setHomepageOpen] = useState(true);

  const fetchSlides = async () => {
    setLoading(true);
    const querySnapshot = await getDocs(collection(db, 'slides'));
    const slidesArr = [];
    querySnapshot.forEach((doc) => {
      slidesArr.push({ id: doc.id, ...doc.data() });
    });
    setSlides(slidesArr);
    setLoading(false);
  };

  useEffect(() => {
    fetchSlides();
  }, []);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setAuthLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editId) {
      await updateDoc(doc(db, 'slides', editId), {
        image: form.image,
        title: form.title,
        button: { text: form.buttonText, color: form.buttonColor },
      });
    } else {
      await addDoc(collection(db, 'slides'), {
        image: form.image,
        title: form.title,
        button: { text: form.buttonText, color: form.buttonColor },
      });
    }
    setForm({ image: '', title: '', buttonText: '', buttonColor: '' });
    setEditId(null);
    fetchSlides();
  };

  const handleEdit = (slide) => {
    setForm({
      image: slide.image,
      title: slide.title,
      buttonText: slide.button?.text || '',
      buttonColor: slide.button?.color || '',
    });
    setEditId(slide.id);
  };

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, 'slides', id));
    fetchSlides();
  };

  const handleLogout = () => {
    const auth = getAuth();
    signOut(auth);
    setUser(null);
  };

  if (authLoading) return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  if (!user) return <AdminLogin onLogin={() => setUser(getAuth().currentUser)} />;

  // Grouped sidebar sections
  const homepageSections = [
    { name: 'Slideshow', icon: <FaImages /> },
    { name: 'Together Section', icon: <FaUsers /> },
    { name: 'Compassion Section', icon: <FaHeart /> },
    { name: 'Inspiration Section', icon: <FaLightbulb /> },
    { name: 'Join Us Section', icon: <FaHandsHelping /> },
  ];
  const pageSections = [
    { name: 'About Us', icon: <FaFileAlt /> },
    { name: 'Our Causes', icon: <FaFileAlt /> }, // This will now manage all causes and popular causes
    { name: 'Get Involved', icon: <FaFileAlt /> },
    { name: 'Contact', icon: <FaFileAlt /> },
    { name: 'Forms', icon: <FaTable /> }, // <-- Add Forms group
  ];

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-[#1a2a36] flex flex-col text-white min-h-screen">
        <div className="flex items-center justify-between px-6 py-4 bg-lime-400 text-black font-bold text-xl">
          OSSAI KINGLEY FOUNDATION DASHBOARD <span className="text-2xl cursor-pointer">&times;</span>
        </div>
        <div className="flex flex-col items-center py-6">
          <FaUserCircle className="text-6xl text-lime-400 mb-2" />
          <div className="font-semibold text-lg">ADMIN</div>
          <span className="w-3 h-3 bg-green-400 rounded-full border-2 border-white mt-1"></span>
        </div>
        <nav className="flex-1 px-4">
          <ul className="space-y-2">
            {/* Manage Homepage Group */}
            <li>
              <div
                className="flex items-center gap-2 py-2 px-3 rounded-lg cursor-pointer font-semibold bg-[#223344]"
                onClick={() => setHomepageOpen((open) => !open)}
              >
                <span>Manage Homepage</span>
                {homepageOpen ? <FaChevronUp /> : <FaChevronDown />}
              </div>
              {homepageOpen && (
                <ul className="ml-2 mt-1 space-y-1">
                  {homepageSections.map((section) => (
                    <li
                      key={section.name}
                      className={`flex items-center gap-3 py-2 px-3 rounded-lg ${activeSection === section.name ? 'bg-blue-900' : 'hover:bg-[#223344] cursor-pointer'}`}
                      onClick={() => setActiveSection(section.name)}
                    >
                      {section.icon} {section.name}
                    </li>
                  ))}
                </ul>
              )}
            </li>
            {/* Manage Pages Group */}
            <li className="mt-4">
              <div className="flex items-center gap-2 py-2 px-3 rounded-lg font-semibold bg-[#223344]">
                <span>Manage Pages</span>
              </div>
              <ul className="ml-2 mt-1 space-y-1">
                {pageSections.map((section) => (
                  <li
                    key={section.name}
                    className={`flex items-center gap-3 py-2 px-3 rounded-lg ${activeSection === section.name ? 'bg-blue-900' : 'hover:bg-[#223344] cursor-pointer'}`}
                    onClick={() => setActiveSection(section.name)}
                  >
                    {section.icon} {section.name}
                  </li>
                ))}
              </ul>
            </li>
          </ul>
          <div className="mt-6 flex items-center bg-[#223344] rounded-lg px-3 py-2">
            <FaSearch className="mr-2 text-gray-400" />
            <input className="bg-transparent outline-none text-white w-full" placeholder="search" />
          </div>
        </nav>
        <div className="mt-auto px-4 py-6">
          <button className="flex items-center gap-2 text-white hover:text-lime-400" onClick={handleLogout}>
            <FaSignOutAlt /> Sign Out
          </button>
        </div>
      </aside>
      {/* Main Content */}
      <main className="flex-1 p-8">
        {/* Top Bar */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800">DASHBOARD USER PANEL</h1>
          <div className="text-right">
            <div className="text-3xl font-bold text-yellow-500">13:00</div>
            <div className="text-sm text-gray-500">FRIDAY, 17 SEPTEMBER</div>
          </div>
        </div>
        {/* Section Content */}
        {activeSection === 'Slideshow' ? (
          <SlideshowAdmin />
        ) : activeSection === 'Together Section' ? (
          <TogetherSectionAdmin />
        ) : activeSection === 'Compassion Section' ? (
          <CompassionSectionAdmin />
        ) : activeSection === 'Inspiration Section' ? (
          <InspirationSectionAdmin />
        ) : activeSection === 'Join Us Section' ? (
          <JoinUsSectionAdmin />
        ) : activeSection === 'Our Causes' ? (
          <OurCausesAdmin />
        ) : activeSection === 'About Us' ? (
          <AboutAdmin />
        ) : activeSection === 'Get Involved' ? (
          <GetInvolvedAdmin />
        ) : activeSection === 'Contact' ? (
          <ContactAdmin />
        ) : activeSection === 'Forms' ? (
          <FormsTableAdmin />
        ) : (
          <div className="bg-white rounded-2xl shadow p-8 text-center text-gray-500 text-xl">
            {activeSection} admin coming soon...
          </div>
        )}
      </main>
    </div>
  );
}

export default AdminDashboard;
