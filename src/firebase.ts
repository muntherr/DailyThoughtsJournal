import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Replace these placeholder values with your actual Firebase project configuration
// Get these values from the Firebase Console -> Project Settings -> General -> Your apps
const firebaseConfig = {
  apiKey: "AIzaSyAfz-NrQ52BFagU__V-You_O2CJFc08a2A",
  authDomain: "journal-app-3a5db.firebaseapp.com",
  projectId: "journal-app-3a5db",
  storageBucket: "journal-app-3a5db.firebasestorage.app",
  messagingSenderId: "652567644158",
  appId: "1:652567644158:web:f9110518e57eed8cd2e2af",
  measurementId: "G-PTXMHSQK8D",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

export default app;
