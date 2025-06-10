// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyCjH5BJKxGf6zrJeZRQsHgAY7yb-2dFbQE",
    authDomain: "medme-voice-agent.firebaseapp.com",
    projectId: "medme-voice-agent",
    storageBucket: "medme-voice-agent.firebasestorage.app",
    messagingSenderId: "753891418715",
    appId: "1:753891418715:web:fdf023dd290f9fb65e557e",
    measurementId: "G-Q7WK3V19LB"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };