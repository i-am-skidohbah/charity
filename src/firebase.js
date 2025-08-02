import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {

  apiKey: "AIzaSyB_7A7sLm6FvtL0fgg9CuMp9e649dO8JYE",

  authDomain: "ossaikingsleyfoundation-3f378.firebaseapp.com",

  projectId: "ossaikingsleyfoundation-3f378",

  storageBucket: "ossaikingsleyfoundation-3f378.firebasestorage.app",

  messagingSenderId: "790818347506",

  appId: "1:790818347506:web:0ae0cecd56d2831357b36b"

};

const firebaseConfig1 = {

  apiKey: "AIzaSyCD8dLPJAe5OmPoNgkrevJYwJhpSv5efDQ",

  authDomain: "luni-ca8eb.firebaseapp.com",

  projectId: "luni-ca8eb",

  storageBucket: "luni-ca8eb.appspot.com",

  messagingSenderId: "315853974826",

  appId: "1:315853974826:web:d63c24932cea7e41058253",

  measurementId: "G-Z0512NL3YB"

};

// Initialize Firebase
const app1 = initializeApp(firebaseConfig1, "app1");
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
// Initialize Firestore
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app1);
