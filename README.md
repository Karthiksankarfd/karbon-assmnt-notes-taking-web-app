# 📝 Notes App – Google OAuth (GIS) Integration

This is a full-stack notes application built with a React frontend and Node.js + Express backend. Authentication is implemented using **Google Identity Services (GIS)**.

---

## 🔧 Project Structure

```
notes-app/
│
├── notes-web-app-client/       # React app using Vite
├── notes-web-app-server/        # Express server with MongoDB
└── README.md       # You're here!
```

---

## 🚀 Getting Started

### 🖥️ Prerequisites

- Node.js (v18+ recommended)
- MongoDB (local or cloud)
- Google Cloud Platform account

---

## ⚙️ Backend Setup

### 1. Navigate to backend folder

```bash
cd notes-web-app-server
npm install
```

### 2. Create `.env` file

```
MONGODB_PASSWORD =  your credentials
DATABASE_USER_NAME = your credentials
DATABASE_NAME =  your credentials
DB_CLUSTER_URL =  your credentials
JWT_SECRET =  your credentials
GOOGLE_CLIENT_ID =  your credentials
```

### 3. Start backend

```bash
npm run dev
```

---

## 🌐 Frontend Setup

### 1. Navigate to frontend folder

```bash
cd notes-web-app-client
npm install
```

### 2. Create `.env` file

```
VITE_BASE_API_END_POINT = your credentials
VITE_GOOGLE_CLIENT_ID = your credentials
VITE_GOOGLE_OAUTH_SCRIPT = your credentials
```

### 3. Start frontend

```bash
npm run dev
```

---

## 🔐 Google Identity Services (GIS) Setup

### Step 1: Create Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project

### Step 2: Configure OAuth Consent Screen

- Type: **External**
- Add test users (your Gmail)
- Save and continue

### Step 3: Create OAuth Credentials

- Go to **Credentials** → **Create Credentials** → **OAuth Client ID**
- Application type: **Web application**
- Authorized JavaScript origins:
  - `http://localhost:5173`
- Redirect URIs:
  - `http://localhost:5173`

### Step 4: Copy Client ID and update in `.env`

- Copy your OAuth Client ID
- Paste it into:
  - `backend/.env` as `GOOGLE_CLIENT_ID`
  - `frontend/.env` as `VITE_GOOGLE_CLIENT_ID`

### Step 5: Load GIS Script in Frontend

In your main HTML or React component:

```html
<script src="https://accounts.google.com/gsi/client" async defer></script>
```

OR dynamically in React:

```jsx
useEffect(() => {
  const script = document.createElement("script");
  script.src = "https://accounts.google.com/gsi/client";
  script.async = true;
  script.defer = true;
  document.body.appendChild(script);
}, []);
```

### Step 6: Render Google Sign-In Button

```jsx
window.google.accounts.id.initialize({
  client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
  callback: handleGoogleCallback,
});

window.google.accounts.id.renderButton(
  document.getElementById("google-btn"),
  { theme: "outline", size: "large" }
);
```

### Step 7: Backend Token Verification

- GIS returns a JWT token (Google credential)
- Send it to backend in `Authorization: Bearer <token>` header
- Backend verifies using `google-auth-library` and logs in/creates user

---

## 📽️ Demo Video Requirements

Record a **3–5 minute video** explaining:

- Key features & app workflow
- OAuth implementation with GIS
- Any challenges & decisions
- Backend & database overview

---

## 🧠 Tech Stack

- Frontend: React + Vite
- Backend: Node.js + Express
- Auth: Google Identity Services (GIS)
- Database: MongoDB + Mongoose

---

## 📩 Contact

If you face issues or have questions, feel free to contact me.