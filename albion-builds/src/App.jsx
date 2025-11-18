// app.jsx

import { Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react"; 
import { onAuthStateChanged } from "firebase/auth"; // Nuevo: Listener de Auth
import { auth } from "./firebase.js"; // Nuevo: Importa Auth
import Login from "./pages/Login.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Register from "./pages/Register.jsx";

// ... (elimina o comenta getInitialUsers y getInitialLoginState)

function App() {
  // Estado para almacenar el objeto de usuario de Firebase (incluye ID, etc.)
  const [currentUser, setCurrentUser] = useState(null); 
  // Estado para saber si la autenticación está lista (para evitar redirecciones prematuras)
  const [isLoading, setIsLoading] = useState(true);

  // EFECTO para escuchar cambios de autenticación de Firebase
  useEffect(() => {
    // onAuthStateChanged se activa en login, logout y al cargar la app
    const unsubscribe = onAuthStateChanged(auth, (user) => {
        setCurrentUser(user); // user será null si no hay sesión
        setIsLoading(false); // La carga inicial ha terminado
    });

    // Limpia el listener al desmontar
    return () => unsubscribe();
  }, []);


  // Si estamos cargando, no renderizamos nada (o un spinner)
  if (isLoading) {
    return <div>Cargando sesión...</div>; 
  }

  const isLoggedIn = !!currentUser; // Verdadero si currentUser no es null

  return (
    <Routes>
      {/* Ruta de Inicio (Login/Home) */}
      <Route
        path="/"
        element={
          isLoggedIn ? (
            <Navigate to="/dashboard" />
          ) : (
            <Login /> // Ya no necesita pasar props, usa la lógica de Firebase interna
          )
        }
      />
      
      {/* Ruta de Registro */}
      <Route
        path="/register"
        element={
          isLoggedIn ? (
            <Navigate to="/dashboard" />
          ) : (
            <Register /> // Ya no necesita pasar props, usa la lógica de Firebase interna
          )
        }
      />
      
      {/* Ruta de Dashboard (Protegida) */}
      <Route
        path="/dashboard"
        element={
          isLoggedIn ? (
            // Pasamos el usuario a Dashboard para que acceda a su ID
            <Dashboard currentUser={currentUser} /> 
          ) : (
            <Navigate to="/" />
          )
        }
      />
    </Routes>
  );
}

export default App;