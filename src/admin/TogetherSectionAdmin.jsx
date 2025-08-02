import React, { useEffect, useState } from 'react';
import { db, storage } from '../firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

function TogetherSectionAdmin() {
  const [form, setForm] = useState({
    title: '',
    missionTitle: '',
    missionText: '',
    visionTitle: '',
    visionText: '',
    images: [],
  });
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const docRef = doc(db, 'homepage', 'togetherSection');
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setForm(docSnap.data());
      }
      setLoading(false);
    }
    fetchData();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files);
    setUploading(true);
    const urls = [];
    for (const file of files) {
      const storageRef = ref(storage, `osb/togetherSection/${Date.now()}_${file.name}`);
      await uploadBytes(storageRef, file);
      const url = await getDownloadURL(storageRef);
      urls.push(url);
    }
    setForm((prev) => ({ ...prev, images: [...(prev.images || []), ...urls] }));
    setUploading(false);
  };

  const handleRemoveImage = (idx) => {
    setForm((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== idx),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await setDoc(doc(db, 'homepage', 'togetherSection'), form);
    alert('Together Section updated!');
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="bg-white rounded-2xl shadow p-6 flex flex-col">
      <h3 className="text-lg font-bold mb-4 text-blue-800">Edit Together Section</h3>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
          type="text"
          name="title"
          placeholder="Section Title"
          value={form.title}
          onChange={handleChange}
          className="border rounded px-2 py-1 text-black"
          required
        />
        <input
          type="text"
          name="missionTitle"
          placeholder="Mission Button Title"
          value={form.missionTitle}
          onChange={handleChange}
          className="border rounded px-2 py-1 text-black"
          required
        />
        <textarea
          name="missionText"
          placeholder="Mission Text"
          value={form.missionText}
          onChange={handleChange}
          className="border rounded px-2 py-1 text-black"
          required
        />
        <input
          type="text"
          name="visionTitle"
          placeholder="Vision Button Title"
          value={form.visionTitle}
          onChange={handleChange}
          className="border rounded px-2 py-1 text-black"
          required
        />
        <textarea
          name="visionText"
          placeholder="Vision Text"
          value={form.visionText}
          onChange={handleChange}
          className="border rounded px-2 py-1 text-black"
          required
        />
        <label className="font-semibold text-black">Images</label>
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleImageUpload}
          className="border rounded px-2 py-1 text-black"
        />
        <div className="flex gap-2 flex-wrap mt-2">
          {form.images?.map((img, idx) => (
            <div key={idx} className="relative">
              <img src={img} alt="" className="w-24 h-16 object-cover rounded" />
              <button
                type="button"
                onClick={() => handleRemoveImage(idx)}
                className="absolute top-0 right-0 bg-red-500 text-white rounded-full px-1 text-xs"
              >
                &times;
              </button>
            </div>
          ))}
        </div>
        <button
          type="submit"
          className="bg-blue-800 text-white px-4 py-2 rounded font-semibold mt-4"
          disabled={uploading}
        >
          {uploading ? 'Uploading...' : 'Save Section'}
        </button>
      </form>
    </div>
  );
}

export default TogetherSectionAdmin;