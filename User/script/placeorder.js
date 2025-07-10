// User/script/placeorder.js
import { db, auth } from "../../Adminside/script/firebase-config.js";
import {
  getDocs,
  collection,
  addDoc,
  deleteDoc,
  doc
} from "https://www.gstatic.com/firebasejs/10.0.0/firebase-firestore.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-auth.js";

const orderSummary = document.getElementById("orderSummary");
const confirmBtn = document.getElementById("confirmOrder");

let userUID;
let cartItems = [];

onAuthStateChanged(auth, async (user) => {
  if (!user) {
    alert("Login required!");
    window.location.href = "userlogin.html";
    return;
  }

  userUID = user.uid;
  const cartRef = collection(db, "users", userUID, "cart");
  const snapshot = await getDocs(cartRef);

  if (snapshot.empty) {
    orderSummary.innerHTML = "<li>Your cart is empty.</li>";
    confirmBtn.disabled = true;
    return;
  }

  snapshot.forEach(doc => {
    const data = doc.data();
    cartItems.push({ id: doc.id, ...data });
    orderSummary.innerHTML += `<li class="mb-2">${data.name} - ₹${data.price}</li>`;
  });
});

confirmBtn.addEventListener("click", async () => {
  if (!cartItems.length) return;

  const orderData = {
    items: cartItems,
    placedAt: new Date()
  };

  await addDoc(collection(db, "users", userUID, "orders"), orderData);

  // Clear cart
  for (const item of cartItems) {
    await deleteDoc(doc(db, "users", userUID, "cart", item.id));
  }

  alert("✅ Order placed!");
  window.location.href = "myorders.html";
});
