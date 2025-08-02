import React, { useEffect, useState } from 'react';
import { db, storage } from '../firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

function CompassionSectionAdmin() {
  const [form, setForm] = useState({
    title: '',
    subtitle: '',
    description: '',
    image: '',
  });
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const docRef = doc(db, 'homepage', 'compassionSection');
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
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    const storageRef = ref(storage, `osb/compassionSection/${Date.now()}_${file.name}`);
    await uploadBytes(storageRef, file);
    const url = await getDownloadURL(storageRef);
    setForm((prev) => ({ ...prev, image: url }));
    setUploading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await setDoc(doc(db, 'homepage', 'compassionSection'), form);
    alert('Compassion Section updated!');
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="bg-white rounded-2xl shadow p-6 flex flex-col">
      <h3 className="text-lg font-bold mb-4 text-blue-800">Edit Compassion Section</h3>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
          type="text"
          name="title"
          placeholder="Title (blue part)"
          value={form.title}
          onChange={handleChange}
          className="border rounded px-2 py-1 text-black"
          required
        />
        <input
          type="text"
          name="subtitle"
          placeholder="Subtitle (black part)"
          value={form.subtitle}
          onChange={handleChange}
          className="border rounded px-2 py-1 text-black"
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          className="border rounded px-2 py-1 text-black"
          required
        />
        <label className="font-semibold text-black">Image</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="border rounded px-2 py-1 text-black"
        />
        {form.image && (
          <img src={form.image} alt="Preview" className="w-32 h-24 object-cover rounded my-2" />
        )}
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

export default CompassionSectionAdmin;