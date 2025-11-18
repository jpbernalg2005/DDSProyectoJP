// src/utils/storage.js

import { db } from "../firebase.js"; // Asegúrate de que esta ruta sea correcta
import { 
    collection, 
    addDoc, 
    getDocs, 
    query, 
    where, 
    deleteDoc, 
    doc,
    orderBy 
} from "firebase/firestore";

const BUILDS_COLLECTION = "builds";

// Referencia a la colección 'builds'
const buildsCollectionRef = collection(db, BUILDS_COLLECTION);

// --- 1. GUARDAR / ACTUALIZAR UNA BUILD ---
export const saveBuild = async (buildData) => {
    // Asume que buildData ya incluye userId, name, items, y isPublic
    try {
        // Firestore genera automáticamente el ID
        const docRef = await addDoc(buildsCollectionRef, {
            ...buildData,
            createdAt: new Date(), // Añadimos una marca de tiempo
        });
        return { id: docRef.id, ...buildData };
    } catch (error) {
        console.error("Error al guardar la build:", error);
        throw new Error("No se pudo guardar la build en la base de datos.");
    }
};

// --- 2. OBTENER LAS BUILDS DEL USUARIO ACTUAL (Para MyBuilds.jsx) ---
export const getMyBuilds = async (userId) => {
    if (!userId) return []; // Si no hay usuario, devolvemos un array vacío.
    
    try {
        // Query: filtra por userId y ordena por fecha de creación descendente
        const q = query(
            buildsCollectionRef, 
            where("userId", "==", userId),
            orderBy("createdAt", "desc") 
        );

        const querySnapshot = await getDocs(q);
        
        return querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
            // Asegúrate de que la fecha se formatea si es necesario
        }));
    } catch (error) {
        console.error("Error al obtener mis builds:", error);
        throw new Error("Fallo al obtener mis builds de la base de datos.");
    }
};

// --- 3. OBTENER BUILDS PÚBLICAS (Para CommunityBuilds.jsx) ---
export const getPublicBuilds = async () => {
    try {
        // Query: filtra donde isPublic es true y ordena por fecha de creación
        const q = query(
            buildsCollectionRef, 
            where("isPublic", "==", true),
            orderBy("createdAt", "desc") // Muestra las más recientes primero
        );

        const querySnapshot = await getDocs(q);
        
        return querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
        }));
    } catch (error) {
        console.error("Error al obtener builds comunitarias:", error);
        // Devolvemos array vacío o lanzamos error para que el componente lo maneje
        throw new Error("Fallo al obtener builds públicas.");
    }
};

// --- 4. BORRAR UNA BUILD (Para MyBuilds.jsx) ---
export const deleteBuild = async (buildId) => {
    try {
        const docRef = doc(db, BUILDS_COLLECTION, buildId);
        await deleteDoc(docRef);
        return true;
    } catch (error) {
        console.error("Error al borrar la build:", error);
        return false;
    }
};