import { auth, db } from "./firebase-config.js";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/10.0.0/firebase-auth.js";

// Register
export function registerUser(email, password, role) {
  createUserWithEmailAndPassword(auth, email, password)
    .then(() => {
      alert("Registered successfully");
      window.location.href = "index.html";
    })
    .catch(err => alert(err.message));
}

// Login
export function loginUser(email, password) {
  signInWithEmailAndPassword(auth, email, password)
    .then(() => {
      alert("Login successful");
      window.location.href = "dashboard.html";
    })
    .catch(err => alert(err.message));
}
