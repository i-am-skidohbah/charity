import React, { useState, useEffect } from "react";
import { db, storage } from "../firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

function ContactAdmin() {
  const [form, setForm] = useState({
    heroTitle: "",
    heroText: "",
    email: "",
    phone: "",
    address: "",
    bottomPhoto: "",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const docRef = doc(db, "pages", "contact");
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) setForm({ ...form, ...docSnap.data() });
      setLoading(false);
    }
    fetchData();
    // eslint-disable-next-line
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handlePhotoUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    const storageRef = ref(storage, `osb/contact/bottomPhoto_${Date.now()}_${file.name}`);
    await uploadBytes(storageRef, file);
    const url = await getDownloadURL(storageRef);
    setForm((prev) => ({ ...prev, bottomPhoto: url }));
    setUploading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    await setDoc(doc(db, "pages", "contact"), form);
    setSaving(false);
    alert("Contact page updated!");
  };

  if (loading) return <div className="p-8 text-center text-lg">Loading...</div>;

  return (
    <div className="bg-white rounded-2xl shadow p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-blue-800">Manage Contact Page</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <input
          type="text"
          name="heroTitle"
          value={form.heroTitle}
          onChange={handleChange}
          placeholder="Page Title"
          className="border rounded px-3 py-2 w-full mb-2 bg-white text-black"
        />
        <textarea
          name="heroText"
          value={form.heroText}
          onChange={handleChange}
          placeholder="Intro Text"
          className="border rounded px-3 py-2 w-full mb-2 bg-white text-black"
        />
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Contact Email"
          className="border rounded px-3 py-2 w-full mb-2 bg-white text-black"
        />
        <input
          type="text"
          name="phone"
          value={form.phone}
          onChange={handleChange}
          placeholder="Phone Number"
          className="border rounded px-3 py-2 w-full mb-2 bg-white text-black"
        />
        <input
          type="text"
          name="address"
          value={form.address}
          onChange={handleChange}
          placeholder="Address"
          className="border rounded px-3 py-2 w-full mb-2 bg-white text-black"
        />
        <div>
          <label className="block mb-1 font-semibold text-black">Bottom Row Photo</label>
          <input
            type="file"
            accept="image/*"
            onChange={handlePhotoUpload}
            className="mb-2 border rounded px-3 py-2 bg-white text-black"
          />
          {uploading && <div className="text-sm text-blue-700 mb-2">Uploading...</div>}
          {form.bottomPhoto && (
            <img src={form.bottomPhoto} alt="Bottom Row" className="h-32 rounded shadow mb-2" />
          )}
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

export default ContactAdmin;