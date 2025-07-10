// myorders.js
import { db, auth } from '../../Adminside/script/firebase-config.js';
import {
  collection,
  getDocs,
  query,
  where
} from "https://www.gstatic.com/firebasejs/10.0.0/firebase-firestore.js";
import { signOut } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-auth.js";

auth.onAuthStateChanged(user => {
  if (!user) location.href = "userlogin.html";
  else loadOrders(user.uid);
});

document.getElementById("logoutBtn").addEventListener("click", async () => {
  await signOut(auth);
  alert("Logged out!");
  location.href = "userlogin.html";
});

async function loadOrders(uid) {
  const q = query(collection(db, "orders"), where("userId", "==", uid));
  const snap = await getDocs(q);
  const body = document.getElementById("ordersBody");
  body.innerHTML = "";
  let i = 1;
  if (snap.empty) {
    body.innerHTML = `<tr><td colspan="3" class="py-4 text-center text-gray-400">No orders found.</td></tr>`;
  } else {
    snap.forEach(docSnap => {
      const d = docSnap.data();
      const names = d.items.map(it => it.name).join(", ");
      const total = d.items.reduce((a, c) => a + c.price, 0);
      const tr = document.createElement("tr");
      tr.innerHTML = `<td>${i++}</td><td>${names}</td><td>₹${total}</td>`;
      body.appendChild(tr);
    });
  }
}
