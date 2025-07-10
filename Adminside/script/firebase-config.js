import { initializeApp } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-storage.js";

const firebaseConfig = {
  apiKey: "AIzaSyAtOGY462R3__3AGAUVHw5f-UXHKsyZgdk",
  authDomain: "cateringreservationsyste-e7e2a.firebaseapp.com",
  projectId: "cateringreservationsyste-e7e2a",
  storageBucket: "cateringreservationsyste-e7e2a.appspot.com", // ✅ Corrected
  messagingSenderId: "677645221202",
  appId: "1:677645221202:web:b7f48d16a6937dd7080e8b",
  measurementId: "G-8X06F4GC6L"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
