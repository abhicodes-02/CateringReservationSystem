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

// Logout
document.getElementById("logoutBtn").addEventListener("click", async () => {
  await signOut(auth);
  alert("Logged out!");
  location.href = "userlogin.html";
});

// Auth & Cart Load
onAuthStateChanged(auth, (user) => {
  if (!user) return (location.href = "userlogin.html");
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
      <td class="text-center">${index++}</td>
      <td class="text-center">${data.name}</td>
      <td class="text-center">₹${data.price}</td>
      <td class="text-center">
        <button onclick="removeItem('${docSnap.id}')" class="text-red-500 hover:underline">Remove</button>
      </td>
    `;
    body.appendChild(tr);
  });

  document.getElementById("placeOrderBtn").disabled = items.length === 0;
  document.getElementById("placeOrderBtn").onclick = () => placeOrder(uid, items);
}

// Remove individual item
window.removeItem = async (itemId) => {
  try {
    await deleteDoc(doc(db, "cart", itemId));
    alert("Item removed!");
    location.reload();
  } catch (err) {
    alert("Error removing item: " + err.message);
  }
};

// Place Order and clear cart
async function placeOrder(uid, items) {
  try {
    await addDoc(collection(db, "orders"), {
      userId: uid,
      items,
      placedAt: serverTimestamp()
    });

    // Clear cart
    const q = query(collection(db, "cart"), where("userId", "==", uid));
    const snap = await getDocs(q);
    snap.forEach(docSnap => deleteDoc(docSnap.ref));

    alert("✅ Order placed!");
    location.href = "myorders.html";
  } catch (error) {
    alert("❌ Failed to place order: " + error.message);
  }
}
