// ✅ user-auth.js — Separate Firebase Auth logic for Users

import { auth, db } from "../Adminside/script/firebase-config.js";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/10.0.0/firebase-auth.js";
import {
  doc,
  setDoc,
  getDoc
} from "https://www.gstatic.com/firebasejs/10.0.0/firebase-firestore.js";

/**
 * ✅ Register a user and add details to Firestore 'users' collection
 */
export async function registerUser(email, password) {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    await setDoc(doc(db, "users", user.uid), {
      email: user.email,
      createdAt: new Date().toISOString()
    });

    alert("✅ Registered successfully!");
    window.location.href = "userlogin.html";
  } catch (error) {
    alert("❌ Registration failed: " + error.message);
  }
}

/**
 * ✅ Log in a user and verify from 'users' collection only
 */
export async function loginUser(email, password) {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    const docRef = doc(db, "users", user.uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      alert("✅ Login successful!");
      window.location.href = "dashboard.html";
    } else {
      alert("❌ You are not registered as a user.");
    }
  } catch (error) {
    alert("❌ Login failed: " + error.message);
  }
}
