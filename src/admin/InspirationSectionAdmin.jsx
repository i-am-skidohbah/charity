import React, { useEffect, useState } from 'react';
import { db, storage } from '../firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

function InspirationSectionAdmin() {
  const [form, setForm] = useState({
    title: '',
    paragraph1: '',
    paragraph2: '',
    image: '',
    imageAlt: '',
    crownIcon: '',
    caption: '',
    name: '',
  });
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const docRef = doc(db, 'homepage', 'inspirationSection');
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setForm({ ...form, ...docSnap.data() });
      }
      setLoading(false);
    }
    fetchData();
    // eslint-disable-next-line
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageUpload = async (e, field) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    const storageRef = ref(storage, `osb/inspirationSection/${field}_${Date.now()}_${file.name}`);
    await uploadBytes(storageRef, file);
    const url = await getDownloadURL(storageRef);
    setForm((prev) => ({ ...prev, [field]: url }));
    setUploading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await setDoc(doc(db, 'homepage', 'inspirationSection'), form);
    alert('Inspiration Section updated!');
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="bg-white rounded-2xl shadow p-6 flex flex-col">
      <h3 className="text-lg font-bold mb-4 text-blue-800">Edit Inspiration Section</h3>
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
        <textarea
          name="paragraph1"
          placeholder="First Paragraph"
          value={form.paragraph1}
          onChange={handleChange}
          className="border rounded px-2 py-1 text-black"
          required
        />
        <textarea
          name="paragraph2"
          placeholder="Second Paragraph"
          value={form.paragraph2}
          onChange={handleChange}
          className="border rounded px-2 py-1 text-black"
          required
        />
        <input
          type="text"
          name="name"
          placeholder="Name (e.g. Ossai Sunday Kelvin)"
          value={form.name}
          onChange={handleChange}
          className="border rounded px-2 py-1 text-black"
        />
        <input
          type="text"
          name="caption"
          placeholder="Caption (e.g. in honor of...)"
          value={form.caption}
          onChange={handleChange}
          className="border rounded px-2 py-1 text-black"
        />
        <input
          type="text"
          name="imageAlt"
          placeholder="Image Alt Text"
          value={form.imageAlt}
          onChange={handleChange}
          className="border rounded px-2 py-1 text-black"
        />
        <label className="font-semibold text-black">Main Image</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => handleImageUpload(e, 'image')}
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

export default InspirationSectionAdmin;