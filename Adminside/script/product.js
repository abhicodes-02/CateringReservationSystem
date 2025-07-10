import { db, auth } from "./firebase-config.js";
import {
  collection,
  addDoc,
  getDocs
} from "https://www.gstatic.com/firebasejs/10.0.0/firebase-firestore.js";

/**
 * Upload a new product to Firestore under 'products' collection.
 * @param {string} name - The product name
 * @param {number} price - The product price
 */
export async function uploadProduct(name, price) {
  try {
    await addDoc(collection(db, "products"), {
      name,
      price,
      uploadedBy: auth.currentUser?.email || "Unknown"
    });
    alert("✅ Product uploaded successfully.");
  } catch (err) {
    console.error("❌ Upload failed:", err.message);
    alert("Error uploading product: " + err.message);
  }
}

/**
 * View all products and display them inside a container.
 * @param {string} containerId - ID of the container element
 */
export async function viewProducts(containerId) {
  const container = document.getElementById(containerId);
  container.innerHTML = "Loading...";
  try {
    const snapshot = await getDocs(collection(db, "products"));
    container.innerHTML = "";
    if (snapshot.empty) {
      container.innerHTML = "<p>No products available.</p>";
    } else {
      snapshot.forEach(doc => {
        const data = doc.data();
        container.innerHTML += `
          <div style="border:1px solid #ccc; padding:8px; margin-bottom:10px;">
            <strong>${data.name}</strong> - ₹${data.price}
            <br><small>Uploaded by: ${data.uploadedBy || 'N/A'}</small>
          </div>`;
      });
    }
  } catch (err) {
    container.innerHTML = `<p>Error loading products: ${err.message}</p>`;
  }
}
