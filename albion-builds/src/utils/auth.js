// src/utils/auth.js

import { 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword,
    signOut
} from "firebase/auth";
import { auth } from "../firebase.js"; 

// Función de limpieza de username antes de usarlo como email
const toEmail = (username) => {
    // 1. Limpiar el nombre de usuario de caracteres no permitidos en un email
    // Mantenemos solo letras, números, y guiones bajos (que son seguros)
    let cleanedUsername = username.toLowerCase().replace(/[^a-z0-9_]/g, ''); 
    
    // 2. Si después de la limpieza el username está vacío, lanzamos un error (o usamos un fallback)
    if (cleanedUsername.length === 0) {
        throw new Error("El nombre de usuario no es válido después de la limpieza. Intenta usar solo letras y números.");
    }
    
    // Devolvemos el email simulado
    return `${cleanedUsername}@albion.builder`;
};

// --- REGISTRO ---
export const registerWithEmail = async (username, password) => {
    // Aquí es donde puede fallar si toEmail lanza un error, o si el cleanedUsername no es aceptado por Firebase.
    const email = toEmail(username); 
    
    try {
        const userCredential = await createUserWithEmailAndPassword(
            auth,
            email,
            password
        );
        return userCredential.user;
    } catch (error) {
        throw new Error(error.message);
    }
};

// --- INICIO DE SESIÓN ---
export const loginWithEmail = async (username, password) => {
    const email = toEmail(username); // También aplicamos la limpieza al login
    try {
        const userCredential = await signInWithEmailAndPassword(
            auth,
            email,
            password
        );
        return userCredential.user;
    } catch (error) {
        throw new Error(error.message);
    }
};

// ... (logoutUser se mantiene igual)
// ... (logoutUser se mantiene igual)
// --- CERRAR SESIÓN ---
export const logoutUser = () => {
    return signOut(auth);
};