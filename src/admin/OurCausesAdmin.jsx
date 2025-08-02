import React, { useEffect, useState } from 'react';
import { db, storage } from '../firebase';
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  setDoc,
  getDoc,
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const colorOptions = [
  { value: 'bg-blue-800', label: 'Blue' },
  { value: 'bg-lime-400', label: 'Lime' },
  { value: 'bg-red-500', label: 'Red' },
  { value: 'bg-yellow-400', label: 'Yellow' },
  { value: 'bg-green-500', label: 'Green' },
  { value: 'bg-gray-800', label: 'Gray' },
];

// Add your categories here or fetch dynamically if needed
const categoryOptions = [
  { value: '', label: 'Select Category' },
  { value: 'health', label: 'Health' },
  { value: 'education', label: 'Education' },
  { value: 'livelihoods', label: 'Livelihoods' },
];

function OurCausesAdmin() {
  const [causes, setCauses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ image: '', bg: '', title: '', desc: '', category: '' });
  const [editId, setEditId] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [popularIds, setPopularIds] = useState([]);
  const [popularForm, setPopularForm] = useState([]);
  const [heroImage, setHeroImage] = useState('');
  const [heroUploading, setHeroUploading] = useState(false);
  const [heroFile, setHeroFile] = useState(null);
  const [heroImagePreview, setHeroImagePreview] = useState('');
  const [groupPhoto, setGroupPhoto] = useState('');
  const [groupPhotoFile, setGroupPhotoFile] = useState(null);
  const [groupPhotoPreview, setGroupPhotoPreview] = useState('');
  const [groupPhotoUploading, setGroupPhotoUploading] = useState(false);

  // Fetch all causes
  const fetchCauses = async () => {
    setLoading(true);
    const querySnapshot = await getDocs(collection(db, 'causes'));
    const causesArr = [];
    querySnapshot.forEach((doc) => {
      causesArr.push({ id: doc.id, ...doc.data() });
    });
    setCauses(causesArr);
    setLoading(false);
  };

  // Fetch popular causes
  const fetchPopular = async () => {
    const docRef = doc(db, 'meta', 'popularCauses');
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      setPopularIds(docSnap.data().ids || []);
      setPopularForm(docSnap.data().ids || []);
    } else {
      setPopularIds([]);
      setPopularForm([]);
    }
  };

  // Fetch hero image
  useEffect(() => {
    const fetchHero = async () => {
      const docSnap = await getDoc(doc(db, 'meta', 'causesHero'));
      if (docSnap.exists()) setHeroImage(docSnap.data().image || '');
    };
    fetchHero();
  }, []);

  // Fetch group photo
  useEffect(() => {
    async function fetchGroupPhoto() {
      const snap = await getDoc(doc(db, 'meta', 'causesGroupPhoto'));
      if (snap.exists()) setGroupPhoto(snap.data().image || '');
    }
    fetchGroupPhoto();
  }, []);

  useEffect(() => {
    fetchCauses();
    fetchPopular();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    const storageRef = ref(storage, `osb/causes/${Date.now()}_${file.name}`);
    await uploadBytes(storageRef, file);
    const url = await getDownloadURL(storageRef);
    setForm((prev) => ({ ...prev, image: url }));
    setUploading(false);
  };

  // Upload hero image
  const handleHeroUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setHeroUploading(true);
    const storageRef = ref(storage, `osb/causesHero/${Date.now()}_${file.name}`);
    await uploadBytes(storageRef, file);
    const url = await getDownloadURL(storageRef);
    await setDoc(doc(db, 'meta', 'causesHero'), { image: url });
    setHeroImage(url);
    setHeroUploading(false);
    alert('Hero image updated!');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editId) {
      await updateDoc(doc(db, 'causes', editId), form);
    } else {
      await addDoc(collection(db, 'causes'), form);
    }
    setForm({ image: '', bg: '', title: '', desc: '', category: '' });
    setEditId(null);
    fetchCauses();
  };

  const handleEdit = (cause) => {
    setForm({
      image: cause.image,
      bg: cause.bg,
      title: cause.title,
      desc: cause.desc,
      category: cause.category || '',
    });
    setEditId(cause.id);
  };

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, 'causes', id));
    fetchCauses();
    fetchPopular();
  };

  // Handle popular causes selection
  const handlePopularChange = (idx, val) => {
    const updated = [...popularForm];
    updated[idx] = val;
    setPopularForm(updated);
  };

  const handlePopularSubmit = async (e) => {
    e.preventDefault();
    await setDoc(doc(db, 'meta', 'popularCauses'), { ids: popularForm });
    setPopularIds(popularForm);
    alert('Popular causes updated!');
  };

  const handleHeroFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setHeroFile(file);
    setHeroImagePreview(URL.createObjectURL(file));
  };

  const handleHeroSave = async () => {
    if (!heroFile) return;
    setHeroUploading(true);
    const storageRef = ref(storage, `osb/causesHero/${Date.now()}_${heroFile.name}`);
    await uploadBytes(storageRef, heroFile);
    const url = await getDownloadURL(storageRef);
    await setDoc(doc(db, 'meta', 'causesHero'), { image: url });
    setHeroImage(url);
    setHeroFile(null);
    setHeroImagePreview('');
    setHeroUploading(false);
    alert('Hero image updated!');
  };

  const handleGroupPhotoFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setGroupPhotoFile(file);
    setGroupPhotoPreview(URL.createObjectURL(file));
  };

  const handleGroupPhotoSave = async () => {
    if (!groupPhotoFile) return;
    setGroupPhotoUploading(true);
    const storageRef = ref(storage, `osb/causesGroupPhoto/${Date.now()}_${groupPhotoFile.name}`);
    await uploadBytes(storageRef, groupPhotoFile);
    const url = await getDownloadURL(storageRef);
    await setDoc(doc(db, 'meta', 'causesGroupPhoto'), { image: url });
    setGroupPhoto(url);
    setGroupPhotoFile(null);
    setGroupPhotoPreview('');
    setGroupPhotoUploading(false);
    alert('Group photo updated!');
  };

  return (
    <div className="bg-white rounded-2xl shadow p-6 flex flex-col">
      <h3 className="text-lg font-bold mb-4 text-blue-800">Manage Causes</h3>
      <form onSubmit={handleSubmit} className="flex flex-wrap gap-2 mb-4 bg-gray-50 p-4 rounded-lg shadow">
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="border rounded px-2 py-1 flex-1 text-black bg-white"
        />
        <select
          name="bg"
          value={form.bg}
          onChange={handleChange}
          required
          className="border rounded px-2 py-1 flex-1 text-black bg-white"
        >
          <option value="">Select Background Color</option>
          {colorOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
        <select
          name="category"
          value={form.category}
          onChange={handleChange}
          required
          className="border rounded px-2 py-1 flex-1 text-black bg-white"
        >
          {categoryOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
          required
          className="border rounded px-2 py-1 flex-1 text-black bg-white"
        />
        <input
          type="text"
          name="desc"
          placeholder="Description"
          value={form.desc}
          onChange={handleChange}
          required
          className="border rounded px-2 py-1 flex-1 text-black bg-white"
        />
        <button type="submit" className="bg-blue-800 text-white px-4 py-1 rounded font-semibold" disabled={uploading}>
          {uploading ? 'Uploading...' : (editId ? 'Update' : 'Add') + ' Cause'}
        </button>
        {editId && (
          <button type="button" onClick={() => { setEditId(null); setForm({ image: '', bg: '', title: '', desc: '', category: '' }); }} className="bg-gray-300 text-gray-800 px-4 py-1 rounded font-semibold">Cancel</button>
        )}
      </form>
      {/* Hero Image Upload */}
      <div className="mb-6 bg-gray-50 p-4 rounded-lg shadow">
        <h4 className="font-semibold mb-2 text-blue-800">Manage Hero Section Image</h4>
        {(heroImagePreview || heroImage) && (
          <img
            src={heroImagePreview || heroImage}
            alt="Hero"
            className="w-full max-w-xs mb-2 rounded shadow"
          />
        )}
        <input
          type="file"
          accept="image/*"
          onChange={handleHeroFileChange}
          className="border rounded px-2 py-1 text-black bg-white"
          disabled={heroUploading}
        />
        <button
          onClick={handleHeroSave}
          className="bg-blue-800 text-white px-4 py-1 rounded font-semibold ml-2"
          disabled={heroUploading || !heroFile}
        >
          {heroUploading ? 'Uploading...' : 'Save Hero Image'}
        </button>
      </div>
      {/* Group Photo Upload */}
      <div className="mb-6 bg-gray-50 p-4 rounded-lg shadow">
        <h4 className="font-semibold mb-2 text-blue-800">Manage Group Photo</h4>
        {(groupPhotoPreview || groupPhoto) && (
          <img
            src={groupPhotoPreview || groupPhoto}
            alt="Group"
            className="w-full max-w-xs mb-2 rounded shadow"
          />
        )}
        <input
          type="file"
          accept="image/*"
          onChange={handleGroupPhotoFileChange}
          className="border rounded px-2 py-1 text-black bg-white"
          disabled={groupPhotoUploading}
        />
        <button
          onClick={handleGroupPhotoSave}
          className="bg-blue-800 text-white px-4 py-1 rounded font-semibold ml-2"
          disabled={groupPhotoUploading || !groupPhotoFile}
        >
          {groupPhotoUploading ? 'Uploading...' : 'Save Group Photo'}
        </button>
      </div>
      {/* Popular Causes Selection */}
      <form onSubmit={handlePopularSubmit} className="mb-6 bg-gray-50 p-4 rounded-lg shadow">
        <h4 className="font-semibold mb-2 text-blue-800">Select Popular Causes (shown on homepage)</h4>
        {[0, 1, 2].map((idx) => (
          <select
            key={idx}
            value={popularForm[idx] || ''}
            onChange={e => handlePopularChange(idx, e.target.value)}
            className="border rounded px-2 py-1 mr-2 mb-2 text-black bg-white"
            required
          >
            <option value="">Select Cause {idx + 1}</option>
            {causes.map(cause => (
              <option key={cause.id} value={cause.id}>{cause.title}</option>
            ))}
          </select>
        ))}
        <button type="submit" className="bg-blue-800 text-white px-4 py-1 rounded font-semibold ml-2">
          Save Popular Causes
        </button>
      </form>
      {loading ? (
        <p>Loading causes...</p>
      ) : (
        <div className="overflow-x-auto bg-gray-50 rounded-lg shadow">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="bg-gray-200 text-gray-800">
                <th className="py-2 px-3">Image</th>
                <th className="py-2 px-3">Title</th>
                <th className="py-2 px-3">Description</th>
                <th className="py-2 px-3">BG Color</th>
                <th className="py-2 px-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {causes.map((cause) => (
                <tr key={cause.id} className="border-b hover:bg-gray-100">
                  <td className="py-2 px-3"><img src={cause.image} alt="cause" className="w-20 h-12 object-cover rounded" /></td>
                  <td className="py-2 px-3 text-gray-900">{cause.title}</td>
                  <td className="py-2 px-3 text-gray-700">{cause.desc}</td>
                  <td className="py-2 px-3"><span className={`${cause.bg} px-2 py-1 rounded text-white`}>{cause.bg}</span></td>
                  <td className="py-2 px-3">
                    <button onClick={() => handleEdit(cause)} className="text-blue-800 font-semibold mr-2">Edit</button>
                    <button onClick={() => handleDelete(cause.id)} className="text-red-500 font-semibold">Delete</button>
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

export default OurCausesAdmin;