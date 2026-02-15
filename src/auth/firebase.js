import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBGXLNw6u5pn8sESh5KFkmr0qfaJ2Jh4Ew",
  authDomain: "movie-app-da664.firebaseapp.com",
  projectId: "movie-app-da664",
  storageBucket: "movie-app-da664.firebasestorage.app",
  messagingSenderId: "863904377006",
  appId: "1:863904377006:web:df5fbd3229b16785f8a53f",
  measurementId: "G-E70EHLPNPB"
};
const app = initializeApp(firebaseConfig);

export default app;

export const auth= getAuth(app)
