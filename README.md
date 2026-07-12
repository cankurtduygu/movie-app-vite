<div align="center">

# 🎬 CINEPLAX

### A client-side React SPA for movie discovery, auth & personal favorites

[![Live Demo](https://img.shields.io/badge/🚀_Live_Demo-movie--app--cineplax.netlify.app-00C7B7?style=for-the-badge)](https://movie-app-cineplax.netlify.app/)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Firebase](https://img.shields.io/badge/Firebase-12-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)](https://firebase.google.com/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Vite](https://img.shields.io/badge/Vite-7-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vite.dev/)
[![TMDB](https://img.shields.io/badge/TMDB_API-Integrated-01D277?style=for-the-badge)](https://www.themoviedb.org/)

</div>

---

## ✨ Overview

**CINEPLAX** is a single-page React application for browsing movies, searching by title, filtering by genre, and saving personal favorites. Movie data comes from the [TMDB API](https://www.themoviedb.org/); user authentication and favorites persistence are handled by [Firebase](https://firebase.google.com/) (Auth + Firestore).

There is **no custom backend server** in this project — it is a **frontend SPA** that integrates with managed cloud services and a third-party movie API.

---

## 🖥️ Live Demo

> 🔗 **[https://movie-app-cineplax.netlify.app/](https://movie-app-cineplax.netlify.app/)**

---

## 🏛️ Architecture

```
┌─────────────────────────────────────────────────────────┐
│                   React SPA (this repo)                  │
│  Vite · React Router · Context API · Tailwind CSS       │
└────────────┬──────────────────────┬─────────────────────┘
             │                      │
             ▼                      ▼
   ┌─────────────────┐   ┌─────────────────────┐
   │   TMDB API      │   │  Firebase (BaaS)    │
   │  (movie data)   │   │  Auth + Firestore   │
   └─────────────────┘   └─────────────────────┘
```

| Layer | Technology | Role |
|---|---|---|
| **Frontend** | React 19, Vite 7 | UI, routing, state, API calls |
| **Movie data** | TMDB REST API | Discover, search, movie details |
| **User auth** | Firebase Authentication | Email/password, Google OAuth, password reset |
| **User data** | Cloud Firestore | Per-user favorites collection |
| **Hosting** | Netlify | Static build deployment |

---

## 🚀 Features

| Feature | Description |
|---|---|
| 🎥 **Movie Discovery** | Browse popular movies on a responsive card grid |
| 🔍 **Search** | Find movies by title via TMDB search endpoint |
| 🏷️ **Genre Filter** | Filter by Action, Comedy, Drama, Horror, Romance, Sci-Fi |
| 📄 **Movie Detail** | Poster, rating, release year, overview, and metadata |
| ❤️ **Favorites** | Toggle movies with a heart icon; stored in Firestore per user |
| 📋 **Favorites Page** | View saved movies with the same card UI as the home page |
| 🔐 **Authentication** | Sign up, login, Google OAuth, forgot password |
| 👤 **Profile** | Display name, email, and favorites count |
| 🔒 **Protected Routes** | Movie detail, profile, and favorites require login |
| 📱 **Responsive** | Mobile-first layout with adaptive grids |

---

## 🛠️ Tech Stack

### Frontend
- **[React 19](https://react.dev/)** — Component-based UI
- **[Vite 7](https://vite.dev/)** — Dev server and production bundler
- **[React Router v7](https://reactrouter.com/)** — Client-side routing with route guards
- **[Tailwind CSS v4](https://tailwindcss.com/)** — Utility-first styling
- **[React Context API](https://react.dev/learn/passing-data-deeply-with-context)** — Global auth & movie state
- **[React Toastify](https://fkhadra.github.io/react-toastify/)** — User feedback toasts
- **[Axios](https://axios-http.com/)** — HTTP client for TMDB requests

### Cloud Services (BaaS)
- **[Firebase Auth](https://firebase.google.com/docs/auth)** — User registration, login, Google sign-in
- **[Cloud Firestore](https://firebase.google.com/docs/firestore)** — `users/{uid}/favorites/{movieId}` documents

### External API
- **[TMDB API](https://www.themoviedb.org/documentation/api)** — Movie discover, search, and detail endpoints

---

## 📁 Project Structure

```
movie-app-vite/
├── firestore.rules           # Firestore security rules for favorites
├── firebase.json             # Firebase CLI config
├── src/
│   ├── auth/
│   │   └── firebase.js       # Firebase app initialization
│   ├── components/
│   │   ├── MovieCard.jsx     # Movie card with favorite heart toggle
│   │   ├── Navbar.jsx        # Auth-aware navigation bar
│   │   └── SearchBar.jsx     # Search + genre category filter
│   ├── context/
│   │   ├── AuthContext.jsx   # Auth state & auth actions
│   │   └── MovieContext.jsx  # Movies, search, genre filter, favorites
│   ├── helpers/
│   │   └── ToastNotify.js    # Toast notification helpers
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Login.jsx
│   │   ├── SignUp.jsx
│   │   ├── MovieDetail.jsx
│   │   ├── Profile.jsx
│   │   └── Favorites.jsx
│   ├── router/
│   │   ├── AppRouter.jsx     # Route definitions
│   │   └── PrivateRouter.jsx # Redirects unauthenticated users to /login
│   ├── App.jsx
│   └── main.jsx
└── package.json
```

---

## 🔀 Route Map

| Path | Page | Access |
|---|---|---|
| `/` | Home | Public |
| `/login` | Login | Public |
| `/signup` | Sign Up | Public |
| `/movie/:id` | Movie Detail | 🔒 Protected |
| `/profile` | Profile | 🔒 Protected |
| `/favorites` | Favorites | 🔒 Protected |

> Guests who click a movie card are redirected to `/login` with a return path.

---

## ⚙️ Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) ≥ 18
- [TMDB API key](https://www.themoviedb.org/settings/api)
- [Firebase project](https://console.firebase.google.com/) with **Authentication** and **Firestore** enabled

### Installation

```bash
git clone https://github.com/cankurtduygu/movie-app-vite.git
cd movie-app-vite
npm install
```

### Environment Variables

Create a `.env` file in the project root:

```env
VITE_TMDB_API_KEY=your_tmdb_api_key
VITE_TMDB_BASE_URL=https://api.themoviedb.org/3

VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id
```

| Variable | Source |
|---|---|
| `VITE_TMDB_API_KEY` | [TMDB API Settings](https://www.themoviedb.org/settings/api) |
| `VITE_FIREBASE_*` | Firebase Console → Project Settings → Your apps → Web app config |

### Firebase Setup

1. **Firestore rules** — publish `firestore.rules` via Firebase Console → Firestore → Rules
2. **Google Sign-In** — Authentication → Sign-in method → enable Google
3. **Authorized domains** — Authentication → Settings → add your Netlify domain for production

### Development

```bash
npm run dev      # http://localhost:5173
npm run build    # production build
npm run preview  # preview production build locally
```

---

## 🏗️ Data Flow

**Auth** — `onAuthStateChanged` listens for session changes and updates `AuthContext`.

**Movies** — `MovieContext` fetches from TMDB:
- `GET /discover/movie` — popular & genre-filtered lists
- `GET /search/movie` — title search
- `GET /movie/{id}` — detail page

**Favorites** — on login, favorites load from `users/{uid}/favorites`. Add/remove syncs to Firestore and local state.

```json
// Firestore document: users/{uid}/favorites/{movieId}
{
  "id": 550,
  "title": "Fight Club",
  "poster_path": "/...",
  "overview": "..."
}
```

---

## 🌐 Deployment (Netlify)

Deployed as a static SPA on Netlify. Add a `public/_redirects` file for client-side routing:

```
/*    /index.html   200
```

**Checklist for production:**

- [ ] All `VITE_*` env vars set in Netlify → Site configuration → Environment variables
- [ ] Redeploy after env changes (Vite reads env at build time)
- [ ] Netlify domain added to Firebase Authorized domains
- [ ] Firestore rules published
- [ ] `VITE_FIREBASE_AUTH_DOMAIN` stays as `your-project.firebaseapp.com` (not the Netlify URL)

---

## 🤝 Contributing

1. Fork the repository
2. `git checkout -b feat/your-feature`
3. `git commit -m "feat: your change"`
4. `git push origin feat/your-feature`
5. Open a Pull Request

---

<div align="center">

Built with React · Firebase · TMDB

⭐ Star this repo if you find it useful!

</div>
