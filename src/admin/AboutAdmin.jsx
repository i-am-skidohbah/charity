import React, { useState, useEffect } from 'react';
import { db, storage } from '../firebase';
import {
  doc,
  getDoc,
  setDoc,
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

function AboutAdmin() {
  const [form, setForm] = useState({
    heroImage: '',
    heroTitle: '',
    heroSubtitle: '',
    journeyTitle: '',
    journeyText1: '',
    journeyText2: '',
    logo: '',
    mission: '',
    vision: '',
    values: '',
    founderImage: '',
    founderName: '',
    founderRole: '',
    founderBio: '',
    missionGroupImage: '',
    missionTitle: '',
    missionSubtitle: '',
    contactTitle: '',
    contactSubtitle: '',
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Fetch about page data
  useEffect(() => {
    async function fetchAbout() {
      setLoading(true);
      const docRef = doc(db, 'pages', 'about');
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setForm({ ...form, ...docSnap.data() });
      }
      setLoading(false);
    }
    fetchAbout();
    // eslint-disable-next-line
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle image uploads
  const handleImageUpload = async (e, field) => {
    const file = e.target.files[0];
    if (!file) return;
    const storageRef = ref(storage, `osb/about/${field}_${Date.now()}_${file.name}`);
    await uploadBytes(storageRef, file);
    const url = await getDownloadURL(storageRef);
    setForm((prev) => ({ ...prev, [field]: url }));
  };

  // Save about page data
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    await setDoc(doc(db, 'pages', 'about'), form);
    setSaving(false);
    alert('About page updated!');
  };

  if (loading) {
    return <div className="p-8 text-center text-lg">Loading...</div>;
  }

  return (
    <div className="bg-white rounded-2xl shadow p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-blue-800">Manage About Page</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        {/* Hero Section */}
        <div className="bg-gray-50 rounded-lg p-4 shadow">
          <h3 className="font-semibold mb-2 text-black">Hero Section</h3>
          <input
            type="file"
            accept="image/*"
            onChange={e => handleImageUpload(e, 'heroImage')}
            className="mb-2 text-black border rounded px-3 py-2 w-full bg-white"
          />
          {form.heroImage && <img src={form.heroImage} alt="Hero" className="h-24 mb-2 rounded" />}
          <input
            type="text"
            name="heroTitle"
            value={form.heroTitle}
            onChange={handleChange}
            placeholder="Hero Title"
            className="border rounded px-3 py-2 w-full mb-2 bg-white text-black"
          />
          <input
            type="text"
            name="heroSubtitle"
            value={form.heroSubtitle}
            onChange={handleChange}
            placeholder="Hero Subtitle"
            className="border rounded px-3 py-2 w-full bg-white text-black"
          />
        </div>
        {/* Journey Section */}
        <div className="bg-gray-50 rounded-lg p-4 shadow">
          <h3 className="font-semibold mb-2 text-black">Journey Section</h3>
          <input
            type="text"
            name="journeyTitle"
            value={form.journeyTitle}
            onChange={handleChange}
            placeholder="Journey Title"
            className="border rounded px-3 py-2 w-full mb-2 bg-white text-black"
          />
          <textarea
            name="journeyText1"
            value={form.journeyText1}
            onChange={handleChange}
            placeholder="Journey Paragraph 1"
            className="border rounded px-3 py-2 w-full mb-2 bg-white text-black"
          />
          <textarea
            name="journeyText2"
            value={form.journeyText2}
            onChange={handleChange}
            placeholder="Journey Paragraph 2"
            className="border rounded px-3 py-2 w-full mb-2 bg-white text-black"
          />
          <input
            type="file"
            accept="image/*"
            onChange={e => handleImageUpload(e, 'logo')}
            className="mb-2 text-black border rounded px-3 py-2 w-full bg-white"
          />
          {form.logo && <img src={form.logo} alt="Logo" className="h-20 mb-2 rounded-full" />}
        </div>
        {/* Guiding Principles */}
        <div className="bg-gray-50 rounded-lg p-4 shadow">
          <h3 className="font-semibold mb-2 text-black">Guiding Principles</h3>
          <input
            type="text"
            name="mission"
            value={form.mission}
            onChange={handleChange}
            placeholder="Mission"
            className="border rounded px-3 py-2 w-full mb-2 bg-white text-black"
          />
          <input
            type="text"
            name="vision"
            value={form.vision}
            onChange={handleChange}
            placeholder="Vision"
            className="border rounded px-3 py-2 w-full mb-2 bg-white text-black"
          />
          <input
            type="text"
            name="values"
            value={form.values}
            onChange={handleChange}
            placeholder="Values"
            className="border rounded px-3 py-2 w-full bg-white text-black"
          />
        </div>
        {/* Founder Section */}
        <div className="bg-gray-50 rounded-lg p-4 shadow">
          <h3 className="font-semibold mb-2 text-black">Founder Section</h3>
          <input
            type="file"
            accept="image/*"
            onChange={e => handleImageUpload(e, 'founderImage')}
            className="mb-2 text-black border rounded px-3 py-2 w-full bg-white"
          />
          {form.founderImage && <img src={form.founderImage} alt="Founder" className="h-24 mb-2 rounded" />}
          <input
            type="text"
            name="founderName"
            value={form.founderName}
            onChange={handleChange}
            placeholder="Founder Name"
            className="border rounded px-3 py-2 w-full mb-2 bg-white text-black"
          />
          <input
            type="text"
            name="founderRole"
            value={form.founderRole}
            onChange={handleChange}
            placeholder="Founder Role"
            className="border rounded px-3 py-2 w-full mb-2 bg-white text-black"
          />
          <input
            type="text"
            name="founderBio"
            value={form.founderBio}
            onChange={handleChange}
            placeholder="Founder Bio"
            className="border rounded px-3 py-2 w-full bg-white text-black"
          />
        </div>
        {/* Mission Group Section */}
        <div className="bg-gray-50 rounded-lg p-4 shadow">
          <h3 className="font-semibold mb-2 text-black">Mission Group Section</h3>
          <input
            type="file"
            accept="image/*"
            onChange={e => handleImageUpload(e, 'missionGroupImage')}
            className="mb-2 text-black border rounded px-3 py-2 w-full bg-white"
          />
          {form.missionGroupImage && <img src={form.missionGroupImage} alt="Mission Group" className="h-24 mb-2 rounded" />}
          <input
            type="text"
            name="missionTitle"
            value={form.missionTitle}
            onChange={handleChange}
            placeholder="Mission Section Title"
            className="border rounded px-3 py-2 w-full mb-2 bg-white text-black"
          />
          <input
            type="text"
            name="missionSubtitle"
            value={form.missionSubtitle}
            onChange={handleChange}
            placeholder="Mission Section Subtitle"
            className="border rounded px-3 py-2 w-full bg-white text-black"
          />
        </div>
        {/* Contact Section */}
        <div className="bg-gray-50 rounded-lg p-4 shadow">
          <h3 className="font-semibold mb-2 text-black">Contact Section</h3>
          <input
            type="text"
            name="contactTitle"
            value={form.contactTitle}
            onChange={handleChange}
            placeholder="Contact Title"
            className="border rounded px-3 py-2 w-full mb-2 bg-white text-black"
          />
          <input
            type="text"
            name="contactSubtitle"
            value={form.contactSubtitle}
            onChange={handleChange}
            placeholder="Contact Subtitle"
            className="border rounded px-3 py-2 w-full bg-white text-black"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-800 text-white font-semibold rounded px-6 py-2 mt-4"
          disabled={saving}
        >
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </form>
    </div>
  );
}

export default AboutAdmin;