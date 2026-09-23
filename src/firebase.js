import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY || "AIzaSyDemoKeyForYRCConnectPortalOnly",
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN || "yrc-connect.firebaseapp.com",
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID || "yrc-connect",
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET || "yrc-connect.firebasestorage.app",
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID || "123456789012",
  appId: process.env.REACT_APP_FIREBASE_APP_ID || "1:123456789012:web:abcdef1234567890abcdef"
};

// Initialize Firebase safely
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
export const auth = getAuth(app);
export const db = getFirestore(app);

// Configure Google Sign-In Provider
export const googleProvider = new GoogleAuthProvider();
export const COLLEGE_DOMAIN = process.env.REACT_APP_COLLEGE_DOMAIN || "ssn.edu.in";

// Hint Google to prioritize the college domain and prompt account selection
googleProvider.setCustomParameters({
  hd: COLLEGE_DOMAIN,
  prompt: "select_account"
});

/**
 * Validates if the email belongs to the college domain.
 */
export function isCollegeEmail(email) {
  if (!email) return false;
  return email.trim().toLowerCase().endsWith(`@${COLLEGE_DOMAIN.toLowerCase()}`);
}

/**
 * Extracts Digital ID from student email prefix.
 * e.g., 'ramanan2312001@ssn.edu.in' -> '2312001'
 * e.g., '2311234@ssn.edu.in' -> '2311234'
 */
export function extractDigitalIdFromEmail(email) {
  if (!email) return null;
  const trimmed = email.trim().toLowerCase();
  const username = trimmed.split("@")[0];
  
  // Extract trailing digits (typically 7-digit ID like 2312001, but matches any trailing number sequence)
  const match = username.match(/\d+$/);
  return match ? match[0] : null;
}

export default app;
