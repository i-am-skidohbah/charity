import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import JoinUsFooterSection from "../components/JoinUsFooterSection";
import { db } from "../firebase";
import { doc, getDoc, collection, addDoc, Timestamp } from "firebase/firestore";

function Contact() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const docRef = doc(db, "pages", "contact");
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) setData(docSnap.data());
      setLoading(false);
    }
    fetchData();
  }, []);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    await addDoc(collection(db, "contactForms"), {
      ...form,
      created: Timestamp.now(),
    });
    setSubmitting(false);
    setDone(true);
    setForm({ firstName: "", lastName: "", email: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Top Blue Bar */}
      <div className="w-full h-8 rounded-b-xl" style={{ backgroundColor: "#1253a2" }} />
      <Navbar />

      <section className="w-full py-16 px-4 flex flex-col items-center bg-white">
        <h1 className="text-3xl md:text-5xl font-bold text-[#1253a2] mb-4 text-center">
          {loading ? "Loading..." : data?.heroTitle || "Contact Us"}
        </h1>
        <p className="max-w-xl text-lg text-gray-700 text-center mb-8">
          {loading
            ? ""
            : data?.heroText ||
              "We'd love to hear from you! Whether you have a question, want to partner, or just want to say hello, reach out and our team will get back to you soon."}
        </p>
        {!done ? (
          <form
            className=" mail w-full max-w-lg bg-gray-50 rounded-2xl text-gray-700 shadow p-6 flex flex-col gap-4"
            onSubmit={handleSubmit}
          >
            <div className="flex flex-col md:flex-row gap-4">
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                className="flex-1 rounded px-3 py-2 border border-gray-300"
                value={form.firstName}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                className="flex-1 rounded px-3 py-2 border border-gray-300"
                value={form.lastName}
                onChange={handleChange}
                required
              />
            </div>
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="rounded px-3 py-2 border border-gray-300"
              value={form.email}
              onChange={handleChange}
              required
            />
            <textarea
              name="message"
              placeholder="Your Message"
              rows={4}
              className="rounded px-3 py-2 border border-gray-300"
              value={form.message}
              onChange={handleChange}
              required
            />
            <button
              type="submit"
              className="bg-lime-400 hover:bg-lime-500 text-black font-bold rounded-full px-8 py-3 text-lg shadow transition"
              disabled={submitting}
            >
              {submitting ? "Sending..." : "Send Message"}
            </button>
          </form>
        ) : (
          <div className="flex flex-col items-center justify-center py-8">
            <div className="text-3xl mb-2 text-lime-500">🎉</div>
            <div className="text-lg font-semibold text-[#1253a2] mb-2">Thank you for contacting us!</div>
            <div className="text-gray-700 text-center">We appreciate your message and will get back to you soon.</div>
            <button
              className="mt-6 bg-blue-700 hover:bg-blue-900 text-white font-bold rounded-full px-6 py-2 shadow"
              onClick={() => setDone(false)}
            >
              Close
            </button>
          </div>
        )}
        <div className="mt-8 text-center text-gray-600">
          <div>
            Email:{" "}
            <a
              href={`mailto:${data?.email || "Ossaikingsleyfoundation@gmail.com"}`}
              className="underline text-blue-700"
            >
              {data?.email || "Ossaikingsleyfoundation@gmail.com"}
            </a>
          </div>
          <div>
            Phone:{" "}
            <a
              href={`tel:${data?.phone || "+2347069693926"}`}
              className="underline text-blue-700"
            >
              {data?.phone || "+234 800 000 0000"}
            </a>
          </div>
          <div>
            Address: {data?.address || "123 Charity Avenue, Lagos, Nigeria"}
          </div>
        </div>
        {/* bottom Row */}
        <div className="w-full mt-8">
          <img
            src={data?.bottomPhoto || "/causes/group-photo.jpg"}
            alt="Bottom Row"
            className="w-full h-74 md:h-80 object-cover object-center"
          />
        </div>
      </section>

      <JoinUsFooterSection />
    </div>
  );
}

export default Contact;