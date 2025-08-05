import React, { useState, useEffect } from "react";
import { db, storage } from "../firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

function GetInvolvedAdmin() {
  const [form, setForm] = useState({
    heroTitle: "",
    heroText: "",
    gallery: [],
    section3Title: "",
    section3Text: "",
    section3Btn: "",
  });
  const [galleryFiles, setGalleryFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const docRef = doc(db, "pages", "getinvolved");
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) setForm({ ...form, ...docSnap.data() });
      setLoading(false);
    }
    fetchData();
    // eslint-disable-next-line
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle gallery image uploads
  const handleGalleryUpload = async (e) => {
    const files = Array.from(e.target.files);
    setGalleryFiles(files);
    const urls = [];
    for (const file of files) {
      const storageRef = ref(storage, `osb/getinvolved/gallery_${Date.now()}_${file.name}`);
      await uploadBytes(storageRef, file);
      const url = await getDownloadURL(storageRef);
      urls.push(url);
    }
    // Append new images to existing gallery
    setForm((prev) => ({ ...prev, gallery: [...(prev.gallery || []), ...urls] }));
  };

  // Save page data
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    await setDoc(doc(db, "pages", "getinvolved"), form);
    setSaving(false);
    alert("Get Involved page updated!");
  };

  if (loading) return <div className="p-8 text-center text-lg">Loading...</div>;

  return (
    <div className="bg-white rounded-2xl shadow p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-blue-800">Manage Get Involved Page</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        {/* Section 1 */}
        <div className="bg-gray-50 rounded-lg p-4 shadow">
          <h3 className="font-semibold mb-2 text-black">Section 1</h3>
          <input
            type="text"
            name="heroTitle"
            value={form.heroTitle}
            onChange={handleChange}
            placeholder="Main Title"
            className="border rounded px-3 py-2 w-full mb-2 bg-white text-black"
          />
          <textarea
            name="heroText"
            value={form.heroText}
            onChange={handleChange}
            placeholder="Intro Text"
            className="border rounded px-3 py-2 w-full bg-white text-black"
          />
        </div>
        {/* Section 2: Gallery */}
        <div className="bg-gray-50 rounded-lg p-4 shadow">
          <h3 className="font-semibold mb-2 text-black">Gallery Section</h3>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleGalleryUpload}
            className="mb-2 text-black border rounded px-3 py-2 w-full bg-white"
          />
          <div className="flex flex-wrap gap-2">
            {form.gallery?.map((img, idx) => (
              <img key={idx} src={img} alt="" className="h-20 rounded" />
            ))}
          </div>
        </div>
        {/* Section 3 */}
        <div className="bg-gray-50 rounded-lg p-4 shadow">
          <h3 className="font-semibold mb-2 text-black">Section 3</h3>
          <input
            type="text"
            name="section3Title"
            value={form.section3Title}
            onChange={handleChange}
            placeholder="Section 3 Title"
            className="border rounded px-3 py-2 w-full mb-2 bg-white text-black"
          />
          <textarea
            name="section3Text"
            value={form.section3Text}
            onChange={handleChange}
            placeholder="Section 3 Text"
            className="border rounded px-3 py-2 w-full mb-2 bg-white text-black"
          />
          <input
            type="text"
            name="section3Btn"
            value={form.section3Btn}
            onChange={handleChange}
            placeholder="Button Text"
            className="border rounded px-3 py-2 w-full bg-white text-black"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-800 text-white font-semibold rounded px-6 py-2 mt-4"
          disabled={saving}
        >
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </form>
    </div>
  );
}

export default GetInvolvedAdmin;