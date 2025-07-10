// script/cart.js
import { db, auth } from '../../Adminside/script/firebase-config.js';
import {
  collection,
  getDocs,
  query,
  where,
  addDoc,
  deleteDoc,
  doc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.0.0/firebase-firestore.js";
import { signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-auth.js";

// Logout function
document.getElementById("logoutBtn").addEventListener("click", async () => {
  try {
    await signOut(auth);
    alert("🔓 Logged out!");
    window.location.href = "userlogin.html";
  } catch (err) {
    alert("❌ Logout error: " + err.message);
  }
});

// Auth & Cart Load
onAuthStateChanged(auth, (user) => {
  if (!user) return (window.location.href = "userlogin.html");
  loadCart(user.uid);
});

async function loadCart(uid) {
  const q = query(collection(db, "cart"), where("userId", "==", uid));
  const snap = await getDocs(q);
  const body = document.getElementById("cartBody");
  body.innerHTML = "";
  let index = 1;
  const items = [];

  snap.forEach(docSnap => {
    const data = docSnap.data();
    items.push({ id: docSnap.id, name: data.name, price: data.price });

    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td class="text-center py-3">${index++}</td>
      <td class="text-center py-3">${data.name}</td>
      <td class="text-center py-3">₹${data.price}</td>
      <td class="text-center py-3">
        <button onclick="removeItem('${docSnap.id}')" class="text-red-400 hover:underline">Remove</button>
      </td>
    `;
    body.appendChild(tr);
  });

  const placeBtn = document.getElementById("placeOrderBtn");
  placeBtn.disabled = items.length === 0;
  placeBtn.classList.toggle("opacity-50", items.length === 0);

  // Set up place order button
  placeBtn.onclick = () => placeOrder(uid, items);
}

// Expose removeItem globally
window.removeItem = async (itemId) => {
  try {
    await deleteDoc(doc(db, "cart", itemId));
    alert("🗑️ Item removed from cart.");
    location.reload();
  } catch (err) {
    alert("❌ Error removing item: " + err.message);
  }
};

// Place order and clear entire cart
async function placeOrder(uid, items) {
  try {
    if (!items.length) return;

    // Add to orders collection
    await addDoc(collection(db, "orders"), {
      userId: uid,
      items,
      placedAt: serverTimestamp()
    });

    // Remove all items from cart
    const q = query(collection(db, "cart"), where("userId", "==", uid));
    const snap = await getDocs(q);

    const deletePromises = snap.docs.map(docSnap => deleteDoc(docSnap.ref));
    await Promise.all(deletePromises); // ✅ Ensures complete deletion

    alert("✅ Order placed successfully!");
    window.location.href = "myorders.html";
  } catch (error) {
    alert("❌ Failed to place order: " + error.message);
  }
}
