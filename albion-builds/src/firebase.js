// src/firebase.js

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";       // <-- Necesario para Authentication
import { getFirestore } from "firebase/firestore"; // <-- Necesario para Firestore

// Tu configuración de Firebase
const firebaseConfig = {
    apiKey: "AIzaSyA5l1EXRjUB0K03XYr7tdyWvDkzykTngp0",
    authDomain: "albionbuilds-6b4c9.firebaseapp.com",
    projectId: "albionbuilds-6b4c9",
    storageBucket: "albionbuilds-6b4c9.firebasestorage.app",
    messagingSenderId: "910500115152",
    appId: "1:910500115152:web:14a80bb12fd247bb8164d5",
    measurementId: "G-XVMHLQQ9VG"
};

// 1. Inicializa la aplicación principal
const app = initializeApp(firebaseConfig);

// 2. Inicializa y EXPORTA los servicios necesarios
export const auth = getAuth(app);
export const db = getFirestore(app);

// Nota: Eliminamos getAnalytics ya que no lo usamos para el login/builds.