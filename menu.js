import { getDocs, collection } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-firestore.js";
  import { db } from './Adminside/script/firebase-config.js'; // 🔁 Corrected path

  const tableBody = document.getElementById("menuTableBody");

  async function fetchMenu() {
    try {
      const querySnapshot = await getDocs(collection(db, "products"));
      let count = 1;

      querySnapshot.forEach(doc => {
        const data = doc.data();
        const row = document.createElement("tr");

        row.innerHTML = `
          <td class="px-6 py-4 border-b border-zinc-700">${count++}</td>
          <td class="px-6 py-4 border-b border-zinc-700">${data.name || 'Unnamed'}</td>
          <td class="px-6 py-4 border-b border-zinc-700">₹${data.price || 'N/A'}</td>
        `;

        tableBody.appendChild(row);
      });

      if (count === 1) {
        tableBody.innerHTML = `<tr><td colspan="3" class="text-center py-4 text-gray-400">No products found.</td></tr>`;
      }
    } catch (error) {
      console.error("Error loading menu:", error);
      tableBody.innerHTML = `<tr><td colspan="3" class="text-center py-4 text-red-400">Error loading menu data.</td></tr>`;
    }
  }

  fetchMenu();