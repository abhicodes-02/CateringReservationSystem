
# 🍽️ Catering Reservation & Ordering System

A full-stack web application for managing catering product reservations and orders. Built using **HTML**, **CSS**, **JavaScript**, **Firebase Authentication**, **Firestore Database**, and hosted via **GitHub Pages**.

## 🚀 Live Demo

🌐 [Visit Website](https://abhicodes-02.github.io/CateringReservationSystem/homepage.html)

---

## 📁 Project Structure

```
CateringReservationSystem/
│
├── Adminside/
│   ├── allProducts.html         # Admin - View All Products
│   ├── dashboard.html           # Admin Dashboard
│   ├── index.html               # Admin Login
│   ├── register.html            # Admin Register
│   ├── upload.html              # Upload New Product
│   ├── vieworders.html          # View All Orders
│   └── script/                  # Admin JS logic
│       ├── auth.js
│       ├── firebase-config.js
│       ├── order.js
│       ├── product.js
│
├── User/
│   ├── cart.html                # View Cart
│   ├── menu.html                # View Menu & Add to Cart
│   ├── myorders.html            # View Placed Orders
│   ├── placeorder.html          # Checkout Page
│   ├── profile.html             # View Profile
│   ├── userdashboard.html       # User Dashboard
│   ├── userlogin.html           # User Login
│   ├── userregister.html        # User Registration
│   └── script/                  # User JS logic
│       ├── cart.js
│       ├── menu.js
│       ├── myorders.js
│       ├── placeorder.js
│       ├── profile.js
│       └── userauth.js
│
├── homepage.html                # Public Landing Page
├── index.html                   # Optional root entry
├── firebase.json                # Firebase Configuration
├── .firebaserc
├── .gitignore
└── storage.rules
```

---

## 🔐 Tech Stack

- **Frontend**: HTML, CSS, Tailwind CSS, JavaScript
- **Backend**: Firebase Authentication, Firestore Database
- **Hosting**: GitHub Pages
- **Database Security**: Firebase rules with user-based access

---

## ✨ Features

### 👤 User Module
- Register and Login (via Firebase Auth)
- View Menu Items
- Add to Cart / Remove from Cart
- Place Orders
- Track Orders
- View & Edit Profile
- Logout Functionality

### 🔧 Admin Module
- Admin Authentication
- Upload New Products
- View All Products
- View All Orders (with status)
- Search by Order ID
- Manage Products

---

## 🧠 Architecture & Design

- **Modular Codebase**: Admin and User modules separated for clarity and security.
- **Responsive Design**: Tailwind CSS ensures mobile-friendly UI.
- **Firebase Auth**: Secures login and session management.
- **Firestore**: Real-time data storage for products, orders, and cart items.
- **FireStore Collections**:
  - `products`
  - `cart`
  - `orders`
  - `users`

---

## 🧪 Test Cases

| Module         | Test Case Description                          | Expected Outcome                  |
|----------------|------------------------------------------------|-----------------------------------|
| Register/Login | Valid credentials                              | User/Admin is logged in           |
| Cart           | Add/Remove items from cart                     | Cart updates immediately          |
| Orders         | Place an order                                 | Order appears in Firestore        |
| Profile        | Show current user's UID, Name, and Email       | Correct user data shown           |
| Admin          | View all orders/products                       | Cards load from Firestore         |
| Search         | Search order by Order ID                       | Matching order appears or error   |

---

## ⚙️ Optimization

- **Code Level**: Modular JS, reusable components
- **Architecture Level**: Secure role-based access separation (Admin vs User)
- **Performance**: Real-time updates using Firebase queries, minimized DB reads

---

## 📄 Submission Requirements

- ✅ **GitHub Repository**: [CateringReservationSystem](https://github.com/abhicodes-02/CateringReservationSystem)
- ✅ **Live Link**: [https://abhicodes-02.github.io/CateringReservationSystem/homepage.html](https://abhicodes-02.github.io/CateringReservationSystem/homepage.html)
- ✅ **LLD & HLD Docs**: Include separately in the repo
- ✅ **Test Cases**: Mentioned above
- ✅ **Firebase Config & Hosting Setup**: Done

---

## 📬 Contact

**Author**: Abhimannyu Choudhury  
**GitHub**: [@abhicodes-02](https://github.com/abhicodes-02)
