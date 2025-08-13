import React, { useState } from "react";
import { db } from "../firebase";
import { collection, addDoc, Timestamp } from "firebase/firestore";

function DonateModal({ open, onClose }) {
  const [step, setStep] = useState(1);
  const [donation, setDonation] = useState({
    amount: "",
    currency: "NGN",
    frequency: "Monthly",
  });
  const [details, setDetails] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    agree: false,
  });
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  if (!open) return null;

  const handleDonationChange = (e) => {
    setDonation({ ...donation, [e.target.name]: e.target.value });
  };

  const handleDetailsChange = (e) => {
    const { name, value, type, checked } = e.target;
    setDetails({ ...details, [name]: type === "checkbox" ? checked : value });
  };

  const handleDonationAmount = (amt) => {
    setDonation({ ...donation, amount: amt.replace(/[^\d]/g, "") });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!details.agree) return;
    setSubmitting(true);
    await addDoc(collection(db, "donateForms"), {
      ...donation,
      ...details,
      created: Timestamp.now(),
    });
    setSubmitting(false);
    setDone(true);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded-2xl shadow-xl flex flex-col md:flex-row w-full max-w-3xl mx-2 overflow-hidden relative">
        {/* Cancel (X) Button */}
        <button
          className="absolute top-4 right-4 text-2xl text-gray-400 hover:text-gray-700 z-20"
          onClick={() => {
            setStep(1);
            setDone(false);
            setDonation({ amount: "", currency: "NGN", frequency: "Monthly" });
            setDetails({ firstName: "", lastName: "", email: "", phone: "", agree: false });
            onClose();
          }}
          aria-label="Close"
        >
          &times;
        </button>
        {/* Left: Image & Message */}
        <div className="flex-1 flex flex-col items-center justify-center p-6 bg-gray-50">
          {/* <img
            src="/donate-hero.jpg"
            alt="Donate"
            className="w-full h-48 object-cover rounded-xl mb-4"
          /> */}
          <div className="flex flex-col items-center">
            <img src="/logo.png" alt="Foundation Logo" className="h-10 mb-2" />
            <p className="text-gray-700 text-center mb-2">
              Your gift today will empower, inspire, and connect the next generation of changemakers. Let’s never stop moving toward the world we want. <b>Make your gift today!</b>
            </p>
          </div>
          <div className="flex gap-2 mt-2 text-xs text-gray-500 underline">
            <a href="mailto:info@ossaikingsleyfoundation.org">Questions?</a>
            <span>·</span>
            <a href="#">Contact us</a>
            <span>·</span>
            <a href="#">Privacy Statement</a>
          </div>
        </div>
        {/* Right: Sliding Forms */}
        <div className="flex-1 bg-white p-6 flex flex-col justify-center min-w-[280px] relative overflow-hidden">
          <div
            className="relative w-full h-full"
            style={{
              minHeight: "420px",
              ...(window.innerWidth < 768 ? { minHeight: "520px" } : {}),
            }}
          >
            {/* Step 1: Donor Details (now first) */}
            <div
              className={`absolute inset-0 w-full h-full transition-transform duration-500 ${step === 1 ? 'z-10' : 'z-0'}`}
              style={{
                transform: step === 1 ? "translateX(0%)" : "translateX(-100%)",
                opacity: step === 1 ? 1 : 0,
                pointerEvents: step === 1 ? 'auto' : 'none',
                background: "white",
              }}
            >
              <h3 className="font-bold text-lg mb-4 text-gray-700 text-center">Enter your details</h3>
              <form className="flex flex-col gap-3 text-gray-700" onSubmit={e => { e.preventDefault(); setStep(2); }}>
                <input
                  type="text"
                  name="firstName"
                  placeholder="First name"
                  value={details.firstName}
                  onChange={handleDetailsChange}
                  className="border border-gray-300 rounded-lg px-4 py-2"
                  required
                />
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last name"
                  value={details.lastName}
                  onChange={handleDetailsChange}
                  className="border border-gray-300 rounded-lg px-4 py-2"
                  required
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email address"
                  value={details.email}
                  onChange={handleDetailsChange}
                  className="border border-gray-300 rounded-lg px-4 py-2"
                  required
                />
                <div className="flex items-center border border-gray-300 rounded-lg px-2 py-2">
                  <span className="mr-2">🇳🇬</span>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone (optional)"
                    value={details.phone}
                    onChange={handleDetailsChange}
                    className="flex-1 outline-none border-none bg-transparent"
                  />
                  <span className="ml-2 text-gray-400" title="Optional">?</span>
                </div>
                <label className="flex items-center gap-2 text-sm mt-2">
                  <input
                    type="checkbox"
                    name="agree"
                    checked={details.agree}
                    onChange={handleDetailsChange}
                    className="accent-blue-600"
                    required
                  />
                  I agree to the <a href="#" className="underline">Terms of Service</a>.
                </label>
                <button
                  type="submit"
                  className="bg-blue-700 hover:bg-blue-800 text-white font-bold rounded-lg px-4 py-3 w-full text-lg shadow transition mt-2"
                >
                  Continue
                </button>
              </form>
            </div>
            {/* Step 2: Donation Amount (now second) */}
            <div
              className={`absolute inset-0 w-full h-full transition-transform duration-500 ${step === 2 ? 'z-10' : 'z-0'}`}
              style={{
                transform: step === 2 ? "translateX(0%)" : "translateX(100%)",
                opacity: step === 2 ? 1 : 0,
                pointerEvents: step === 2 ? 'auto' : 'none',
                background: "white",
              }}
            >
              <button
                className="absolute top-4 left-4 text-xl text-blue-700 hover:text-blue-900 z-20 flex items-center gap-1"
                onClick={() => setStep(1)}
                aria-label="Back"
                type="button"
              >
                <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M15 19l-7-7 7-7" />
                </svg>
                <span className="hidden sm:inline">Back</span>
              </button>
              {!done ? (
                <div className="pt-7 m-5">
                  <h3 className="font-bold text-lg mb-4 text-gray-800 text-center">Secure donation</h3>
                  <form className="flex flex-col gap-3 text-gray-700" onSubmit={handleSubmit}>
                    
                    <div className=" rounded bg-gray-50 p-6 items-center gap-2 mb-2">
                      <h3 className="text-2xl font-bold">1307280465</h3>
                      <h3 className="text-x font-bold">Ossai kingsley foundation</h3>
                      <h3 className="text-2xl">Providus Bank</h3>
                    </div>
                    <input
                      type="text"
                      name="amount"
                      placeholder="₦ 70,000"
                      value={donation.amount}
                      onChange={handleDonationChange}
                      className="border border-gray-300 text-gray-700 rounded-lg px-4 py-2 mb-2 w-full font-semibold text-lg"
                      required
                    />
                    <select
                      name="currency"
                      value={donation.currency}
                      onChange={handleDonationChange}
                      className="border border-gray-300 text-gray-700 rounded-lg px-3 py-2 mb-4 w-full"
                    >
                      <option>NGN</option>
                    </select>
                    <button
                      type="submit"
                      className="bg-blue-700 hover:bg-blue-800 text-white font-bold rounded-lg px-4 py-3 w-full text-lg shadow transition mt-2"
                      disabled={submitting || !donation.amount}
                    >
                      {submitting ? "Submitting..." : "Donate"}
                    </button>
                  </form>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-full">
                  <div className="text-3xl mb-2 text-lime-500">🎉</div>
                  <div className="text-lg font-semibold text-[#1253a2] mb-2">Thank you for your donation!</div>
                  <div className="text-gray-700 text-center">We appreciate your support.</div>
                  <button
                    className="mt-6 bg-blue-700 hover:bg-blue-900 text-white font-bold rounded-full px-6 py-2 shadow"
                    onClick={() => {
                      setStep(1);
                      setDone(false);
                      setDonation({ amount: "", currency: "NGN", frequency: "Monthly" });
                      setDetails({ firstName: "", lastName: "", email: "", phone: "", agree: false });
                      onClose();
                    }}
                  >
                    Close
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* Responsive stacking for mobile */}
      <style>{`
        @media (max-width: 768px) {
          .md\\:flex-row {
            flex-direction: column !important;
          }
          .md\\:flex-row > div {
            width: 100% !important;
            min-width: 0 !important;
          }
          .min-w-\\[280px\\] {
            min-width: 0 !important;
          }
          .absolute.top-4.right-4 {
            top: 12px !important;
            right: 12px !important;
          }
          .absolute.top-4.left-4 {
            top: 12px !important;
            left: 12px !important;
          }
          .flex-1.bg-white.p-6 > .relative {
            min-height: 520px !important;
          }
        }
      `}</style>
    </div>
  );
}

export default DonateModal;