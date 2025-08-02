import React, { useEffect, useState } from 'react';
import { db, storage } from '../firebase';
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

function SlideshowAdmin() {
  const [slides, setSlides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ image: '', title: '', buttonText: '', buttonColor: '' });
  const [editId, setEditId] = useState(null);
  const [uploading, setUploading] = useState(false);

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

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageUpload = async (file) => {
    if (!file) return null;
    setUploading(true);
    const storageRef = ref(storage, `osb/slideshow/${Date.now()}_${file.name}`);
    await uploadBytes(storageRef, file);
    const url = await getDownloadURL(storageRef);
    setUploading(false);
    return url;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let imageUrl = form.image;
    if (form.imageFile) {
      imageUrl = await handleImageUpload(form.imageFile);
    }
    if (editId) {
      await updateDoc(doc(db, 'slides', editId), {
        image: imageUrl,
        title: form.title,
        button: { text: form.buttonText, color: form.buttonColor },
      });
    } else {
      await addDoc(collection(db, 'slides'), {
        image: imageUrl,
        title: form.title,
        button: { text: form.buttonText, color: form.buttonColor },
      });
    }
    setForm({ image: '', imageFile: null, title: '', buttonText: '', buttonColor: '' });
    setEditId(null);
    fetchSlides();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setForm((prev) => ({ ...prev, imageFile: file, image: '' }));
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

  return (
    <div className="bg-white rounded-2xl shadow p-6 flex flex-col">
      <h3 className="text-lg font-bold mb-4 text-blue-800">Manage Homepage Slides</h3>
      <form onSubmit={handleSubmit} className="flex flex-wrap gap-2 mb-4">
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="border rounded px-2 py-1 flex-1 text-black"
        />
        <input
          type="text"
          name="image"
          placeholder="Image URL (or upload)"
          value={form.image}
          onChange={handleChange}
          className="border rounded px-2 py-1 flex-1 text-black"
        />
        <input
          type="text"
          name="title"
          placeholder="Title (plain text)"
          value={form.title}
          onChange={handleChange}
          required
          className="border rounded px-2 py-1 flex-1 text-black"
        />
        <input
          type="text"
          name="buttonText"
          placeholder="Button Text"
          value={form.buttonText}
          onChange={handleChange}
          required
          className="border rounded px-2 py-1 flex-1 text-black"
        />
        <select
          name="buttonColor"
          value={form.buttonColor}
          onChange={handleChange}
          required
          className="border rounded px-2 py-1 flex-1 text-black"
        >
          <option value="">Select Button Color</option>
          <option value="bg-lime-400 text-black">Lime (bg-lime-400 text-black)</option>
          <option value="bg-blue-800 text-white">Blue (bg-blue-800 text-white)</option>
          <option value="bg-red-500 text-white">Red (bg-red-500 text-white)</option>
          <option value="bg-yellow-400 text-black">Yellow (bg-yellow-400 text-black)</option>
          <option value="bg-green-500 text-white">Green (bg-green-500 text-white)</option>
          <option value="bg-gray-800 text-white">Gray (bg-gray-800 text-white)</option>
        </select>
        <button type="submit" className="bg-blue-800 text-white px-4 py-1 rounded font-semibold" disabled={uploading}>
          {uploading ? 'Uploading...' : (editId ? 'Update' : 'Add') + ' Slide'}
        </button>
        {editId && (
          <button type="button" onClick={() => { setEditId(null); setForm({ image: '', title: '', buttonText: '', buttonColor: '' }); }} className="bg-gray-300 text-gray-800 px-4 py-1 rounded font-semibold">Cancel</button>
        )}
      </form>
      {loading ? (
        <p>Loading slides...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-black">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-2 px-3">Image</th>
                <th className="py-2 px-3">Title</th>
                <th className="py-2 px-3">Button</th>
                <th className="py-2 px-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {slides.map((slide) => (
                <tr key={slide.id} className="border-b">
                  <td className="py-2 px-3"><img src={slide.image} alt="slide" className="w-20 h-12 object-cover rounded" /></td>
                  <td className="py-2 px-3">{slide.title}</td>
                  <td className="py-2 px-3">{slide.button?.text} <br /> <span className="text-xs">{slide.button?.color}</span></td>
                  <td className="py-2 px-3">
                    <button onClick={() => handleEdit(slide)} className="text-blue-800 font-semibold mr-2">Edit</button>
                    <button onClick={() => handleDelete(slide.id)} className="text-red-500 font-semibold">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default SlideshowAdmin;
