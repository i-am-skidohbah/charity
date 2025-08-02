import React, { useEffect, useState } from 'react';
import { db, storage } from '../firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

function JoinUsSectionAdmin() {
  const [form, setForm] = useState({
    image: '',
    imageAlt: '',
    logo: '',
    titleBlue: '',
    titleRest: '',
    titleLine2: '',
    paragraph: '',
    buttonText: '',
  });
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const docRef = doc(db, 'homepage', 'joinUsSection');
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
    const storageRef = ref(storage, `osb/joinUsSection/${field}_${Date.now()}_${file.name}`);
    await uploadBytes(storageRef, file);
    const url = await getDownloadURL(storageRef);
    setForm((prev) => ({ ...prev, [field]: url }));
    setUploading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await setDoc(doc(db, 'homepage', 'joinUsSection'), form);
    alert('Join Us Section updated!');
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="bg-white rounded-2xl shadow p-6 flex flex-col">
      <h3 className="text-lg font-bold mb-4 text-blue-800">Edit Join Us Section</h3>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <label className="font-semibold">Main Image</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => handleImageUpload(e, 'image')}
          className="border rounded px-2 py-1 text-black"
        />
        {form.image && (
          <img src={form.image} alt="Preview" className="w-32 h-24 object-cover rounded my-2" />
        )}
        <input
          type="text"
          name="imageAlt"
          placeholder="Image Alt Text"
          value={form.imageAlt}
          onChange={handleChange}
          className="border rounded px-2 py-1 text-black"
        />
        <label className="font-semibold">Logo</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => handleImageUpload(e, 'logo')}
          className="border rounded px-2 py-1 text-black"
        />
        {form.logo && (
          <img src={form.logo} alt="Logo Preview" className="w-24 h-24 object-cover rounded my-2" />
        )}
        <input
          type="text"
          name="titleBlue"
          placeholder="Title (blue part)"
          value={form.titleBlue}
          onChange={handleChange}
          className="border rounded px-2 py-1 text-black"
        />
        <input
          type="text"
          name="titleRest"
          placeholder="Title (rest of line)"
          value={form.titleRest}
          onChange={handleChange}
          className="border rounded px-2 py-1 text-black"
        />
        <input
          type="text"
          name="titleLine2"
          placeholder="Title (second line)"
          value={form.titleLine2}
          onChange={handleChange}
          className="border rounded px-2 py-1 text-black"
        />
        <textarea
          name="paragraph"
          placeholder="Paragraph"
          value={form.paragraph}
          onChange={handleChange}
          className="border rounded px-2 py-1 text-black"
        />
        <input
          type="text"
          name="buttonText"
          placeholder="Button Text"
          value={form.buttonText}
          onChange={handleChange}
          className="border rounded px-2 py-1 text-black"
        />
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

export default JoinUsSectionAdmin;