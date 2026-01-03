
[![GitHub stars](https://img.shields.io/github/stars/k-vaishnav/LinkUp-Chat-Application?style=social)](https://github.com/k-vaishnav/LinkUp-Chat-Application/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/k-vaishnav/LinkUp-Chat-Application?style=social)](https://github.com/k-vaishnav/LinkUp-Chat-Application/network)
[![GitHub issues](https://img.shields.io/github/issues/k-vaishnav/LinkUp-Chat-Application)](https://github.com/k-vaishnav/LinkUp-Chat-Application/issues)
[![License](https://img.shields.io/github/license/k-vaishnav/LinkUp-Chat-Application)](https://github.com/k-vaishnav/LinkUp-Chat-Application/blob/main/LICENSE)

# LinkUp – Real-Time Chat Application 🚀

LinkUp is a **full‑stack real‑time chat application** built using **Node.js, Express, MongoDB, and Socket.IO**. It supports user authentication, persistent messaging, typing indicators, online user tracking, and a clean Bootstrap-based UI.

This project is designed as a **resume-ready, production-style application**, showcasing real-world backend architecture, real-time systems, authentication, and scalable design patterns expected from entry-level full-time engineers.


🌐 Live Demo: https://linkup-8s9r.onrender.com 
⚠️ Note: Initial load may take a few seconds due to free-tier hosting.

## 🧪 Demo Notes
- Open the app in **two tabs or browsers** to test real-time chat
- Typing indicators & notifications trigger only for recipients
- First load may take ~20–30 seconds (Render free tier)


## ✨ Features

### 🔐 Authentication

* User **signup & login** with hashed passwords using **bcrypt**
* **JWT‑based authentication** for secure sessions
* Server‑side validation for passwords and unique users

### 💬 Real‑Time Chat (Socket.IO)

* Real‑time message broadcasting
* Online users list with live count
* **Typing indicators** (single & multiple users)
* Join / leave system notifications
* Logout & disconnect handling

### Smart Notification Handling

Implemented recipient-only system notifications for incoming messages using Socket.IO events, preventing redundant alerts for message senders and improving real-time UX.

### 🗂 Persistent Storage

* Messages stored in **MongoDB**
* Last 50 messages loaded for newly joined users
* Separate **User** and **Message** schemas

### 🎨 Frontend

* Responsive UI using **Bootstrap 5**
* Clean chat layout with avatars (RoboHash)
* Notification sound for incoming messages
* Simple HTML/CSS/JS (no frontend framework)

---

## 🧠 Architecture Overview

```
Frontend (HTML/CSS/JS)
        ↓
Socket.IO Client
        ↓
Socket.IO Server (Node.js)
        ↓
Express REST APIs (Auth)
        ↓
MongoDB (Users & Messages)
```

* **REST APIs** handle authentication
* **WebSockets** handle real‑time chat events
* **MongoDB** ensures data persistence

---

## 🛠 Tech Stack

**Backend**

* Node.js
* Express.js
* MongoDB + Mongoose
* Socket.IO
* JWT (Authentication)
* bcrypt (Password hashing)

**Frontend**

* HTML5
* CSS3
* Bootstrap 5
* Vanilla JavaScript

**Tools**

* dotenv
* CORS
* HTTP server

---

## 📂 Project Structure

```
linkup-chat/
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middlewares/
│   ├── config.js
│   └── server.js
│
├── frontend/
│   ├── index.html
│   ├── login.html
│   ├── signup.html
│   ├── chat.html
│   ├── css/
│   └── js/
│
├── .env
├── package.json
└── README.md
```

---

## 🚀 Getting Started

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/k-vaishnav/linkup-chat.git
cd linkup-chat
```

### 2️⃣ Install Dependencies

```bash
npm install
```

### 3️⃣ Environment Variables

Create a `.env` file:

```env
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

### 4️⃣ Run the Server

```bash
npm start
```

Visit:

```
http://localhost:3000
```

---

## 🔐 Security Highlights

* Passwords hashed with **bcrypt (12 rounds)**
* JWT used for stateless authentication
* Input validation on backend
* Environment variables for secrets

---

## 📈 Scalability Considerations

* Socket.IO event‑based architecture
* Can be extended with Redis for multi‑server scaling
* Message pagination ready
* Modular MVC backend structure

---

## 🧪 Future Improvements (Planned)

* ✅ Private / 1‑to‑1 chats
* ✅ Group chat rooms
* 🔄 Message delivery & read receipts
* 🔄 File & image sharing
* 🔄 Rate limiting & spam protection
* 🔄 Redis adapter for Socket.IO scaling
* 🔄 Frontend migration to React
* 🔄 Docker & CI/CD setup

---

## 🎯 Why This Project Is GSoC / Internship Ready

This project demonstrates:

* Real‑time system design (Socket.IO)
* Secure authentication & authorization
* Backend‑first thinking with clean APIs
* Database modeling & persistence
* Scalable architecture mindset
* Production‑oriented error handling

It closely resembles **real open‑source chat systems**, making it a strong foundation for **GSoC proposals, backend internships, and full‑stack roles**.

---

## 👤 Author

**Vaishnav Komal**
Backend / Full‑Stack Developer

---

## ⭐ Support

If you like this project, consider giving it a ⭐ on GitHub!
