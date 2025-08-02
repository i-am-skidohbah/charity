
import React, { useEffect, useState } from 'react';
import { db } from '../firebase'; // Adjust the import based on your project structure
import { collection, getDocs } from 'firebase/firestore';


function FormsTableAdmin() {
  const [donateForms, setDonateForms] = useState([]);
  const [contactForms, setContactForms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchForms() {
      setLoading(true);
      const donateSnap = await getDocs(collection(db, "donateForms"));
      const contactSnap = await getDocs(collection(db, "contactForms"));
      setDonateForms(donateSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      setContactForms(contactSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      setLoading(false);
    }
    fetchForms();
  }, []);

  return (
    <div className="bg-white rounded-2xl shadow p-6 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-blue-800">Submitted Forms</h2>
      {loading ? (
        <div className="text-center text-lg">Loading...</div>
      ) : (
        <>
          <h3 className="text-lg font-semibold mb-2 mt-4 text-gray-700">Donation Forms</h3>
          <div className="overflow-x-auto mb-8">
            <table className="min-w-full border text-gray-500 text-sm">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border px-2 py-1">Date</th>
                  <th className="border px-2 py-1">Amount</th>
                  <th className="border px-2 py-1">Frequency</th>
                  <th className="border px-2 py-1">First Name</th>
                  <th className="border px-2 py-1">Last Name</th>
                  <th className="border px-2 py-1">Email</th>
                  <th className="border px-2 py-1">Phone</th>
                </tr>
              </thead>
              <tbody>
                {donateForms.length === 0 && (
                  <tr>
                    <td colSpan={7} className="text-center py-2 text-gray-400">No donations yet.</td>
                  </tr>
                )}
                {donateForms.map(f => (
                  <tr key={f.id}>
                    <td className="border px-2 py-1">{f.created?.toDate?.().toLocaleString?.() || ""}</td>
                    <td className="border px-2 py-1">{f.amount} {f.currency}</td>
                    <td className="border px-2 py-1">{f.frequency}</td>
                    <td className="border px-2 py-1">{f.firstName}</td>
                    <td className="border px-2 py-1">{f.lastName}</td>
                    <td className="border px-2 py-1">{f.email}</td>
                    <td className="border px-2 py-1">{f.phone}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <h3 className="text-lg font-semibold mb-2 mt-4 text-gray-700">Contact Forms</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full border text-gray-500 text-sm">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border px-2 py-1">Date</th>
                  <th className="border px-2 py-1">First Name</th>
                  <th className="border px-2 py-1">Last Name</th>
                  <th className="border px-2 py-1">Email</th>
                  <th className="border px-2 py-1">Message</th>
                </tr>
              </thead>
              <tbody>
                {contactForms.length === 0 && (
                  <tr>
                    <td colSpan={5} className="text-center py-2 text-gray-400">No contact messages yet.</td>
                  </tr>
                )}
                {contactForms.map(f => (
                  <tr key={f.id}>
                    <td className="border px-2 py-1">{f.created?.toDate?.().toLocaleString?.() || ""}</td>
                    <td className="border px-2 py-1">{f.firstName}</td>
                    <td className="border px-2 py-1">{f.lastName}</td>
                    <td className="border px-2 py-1">{f.email}</td>
                    <td className="border px-2 py-1">{f.message}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}

export default FormsTableAdmin;