import { auth, db } from '../../Adminside/script/firebase-config.js';
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-auth.js";
import { collection, query, where, getDocs } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-firestore.js";

const uidField = document.getElementById("uid");
const emailField = document.getElementById("email");
const nameField = document.getElementById("name");

onAuthStateChanged(auth, async user => {
  if (user) {
    uidField.textContent = user.uid;
    emailField.textContent = user.email;

    try {
      const q = query(collection(db, "users"), where("email", "==", user.email));
      const snapshot = await getDocs(q);
      if (!snapshot.empty) {
        const data = snapshot.docs[0].data();
        nameField.textContent = data.name || "N/A";
      } else {
        nameField.textContent = "Not found in database";
      }
    } catch (err) {
      console.error("Error fetching user name:", err);
      nameField.textContent = "Error loading name";
    }

  } else {
    window.location.href = "userlogin.html"; // redirect to login if not signed in
  }
});
