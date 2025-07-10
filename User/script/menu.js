// menu.js
import { db, auth } from '../../Adminside/script/firebase-config.js';
import {
  collection,
  getDocs,
  addDoc,
  query,
  where,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.0.0/firebase-firestore.js";
import { signOut } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-auth.js";

const tableBody = document.getElementById("menuTableBody");
document.getElementById("logoutBtn").addEventListener("click", async () => {
  await signOut(auth);
  alert("Logged out successfully!");
  location.href = "userlogin.html";
});

auth.onAuthStateChanged(user => {
  if (!user) location.href = "userlogin.html";
  else loadMenu();
});

async function loadMenu() {
  const snap = await getDocs(collection(db, "products"));
  let cnt = 1;
  snap.forEach(doc => {
    const d = doc.data();
    const row = document.createElement("tr");
    row.innerHTML = `
      <td class="px-6 py-4">${cnt++}</td>
      <td class="px-6 py-4">${d.name}</td>
      <td class="px-6 py-4">₹${d.price}</td>
      <td class="px-6 py-4">
        <button class="bg-yellow-400 text-black px-3 py-1 rounded" onclick="addToCart('${d.name}', ${d.price})">Add to Cart</button>
      </td>`;
    tableBody.appendChild(row);
  });
}

window.addToCart = async (name, price) => {
  const user = auth.currentUser;
  if (!user) { alert("Login needed!"); return; }
  await addDoc(collection(db, "cart"), { userId: user.uid, name, price, createdAt: serverTimestamp() });
  alert(`${name} added to cart.`);
};
