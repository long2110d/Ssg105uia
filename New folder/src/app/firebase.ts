import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyD66bANVSDnnn-lbvTdogdRTNpP6Jhrj5k",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "giaidieumothoi.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "giaidieumothoi",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "giaidieumothoi.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "437940044923",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:437940044923:web:e5323a739414fe2d0e4ede",
};

// Only initialize if config is present (avoids crash during build without .env)
const app = firebaseConfig.apiKey ? initializeApp(firebaseConfig) : null;
export const db = app ? getFirestore(app) : null;
