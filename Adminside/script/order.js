// script/allorders.js
import { db } from './firebase-config.js';
import {
  collection,
  getDocs
} from "https://www.gstatic.com/firebasejs/10.0.0/firebase-firestore.js";

const container = document.getElementById("orders");

async function viewAllOrders() {
  container.innerHTML = "Loading...";
  try {
    const snapshot = await getDocs(collection(db, "orders"));
    container.innerHTML = "";

    if (snapshot.empty) {
      container.innerHTML = "<p class='text-center text-gray-400'>No orders found.</p>";
    } else {
      snapshot.forEach((docSnap) => {
        const data = docSnap.data();
        const orderId = docSnap.id;

        // Create item list
        const itemList = data.items
          .map((item) => `<li>${item.name} - ₹${item.price}</li>`)
          .join("");

        const total = data.items.reduce((sum, item) => sum + (item.price || 0), 0);

        const card = document.createElement("div");
        card.className = "bg-zinc-800 rounded-lg shadow p-5";

        card.innerHTML = `
          <div class="mb-2 text-yellow-300 font-semibold">Order ID: ${orderId}</div>
          <div class="mb-1 text-sm text-gray-300">User ID: ${data.userId || "Unknown"}</div>
          <div class="text-white mb-2">
            <strong>Items:</strong>
            <ul class="list-disc list-inside text-sm text-gray-200">${itemList}</ul>
          </div>
          <div class="text-green-400 font-bold">Total: ₹${total}</div>
          <div class="text-sm text-gray-400 mt-1">
            Placed At: ${data.placedAt?.toDate?.().toLocaleString() || "N/A"}
          </div>
        `;

        container.appendChild(card);
      });
    }
  } catch (err) {
    container.innerHTML = `<p class='text-red-500'>❌ Error loading orders: ${err.message}</p>`;
  }
}

viewAllOrders();
