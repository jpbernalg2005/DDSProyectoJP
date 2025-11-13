import { Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react"; // 👈 Importamos useEffect
import Login from "./pages/Login.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Register from "./pages/Register.jsx";

// Función para obtener los usuarios iniciales de localStorage o usar el default
const getInitialUsers = () => {
  const savedUsers = localStorage.getItem("users");
  return savedUsers
    ? JSON.parse(savedUsers)
    : [{ username: "admin", password: "1234" }]; // Usuario por defecto
};

// Función para obtener el estado de login inicial de localStorage
const getInitialLoginState = () => {
  return localStorage.getItem("isLoggedIn") === "true";
};


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(getInitialLoginState); // 👈 Inicializa desde LocalStorage
  const [users, setUsers] = useState(getInitialUsers); // 👈 Inicializa desde LocalStorage

  // 🚨 EFECTO para persistir el estado de isLoggedIn 🚨
  useEffect(() => {
    localStorage.setItem("isLoggedIn", isLoggedIn);
  }, [isLoggedIn]);

  // 🚨 EFECTO para persistir la lista de usuarios 🚨
  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(users));
  }, [users]);


  const registerUser = (newUserData) => {
    setUsers((prevUsers) => [...prevUsers, newUserData]);
  };

  return (
    <Routes>
      {/* 1. Ruta de Inicio (Login/Home) */}
      <Route
        path="/"
        element={
          isLoggedIn ? (
            <Navigate to="/dashboard" />
          ) : (
            // Pasamos la lista de usuarios para la validación
            <Login setIsLoggedIn={setIsLoggedIn} users={users} />
          )
        }
      />
      
      {/* 2. Ruta de Registro */}
      <Route
        path="/register"
        element={
          isLoggedIn ? (
            <Navigate to="/dashboard" />
          ) : (
            // Pasamos la función y la lista para evitar duplicados
            <Register registerUser={registerUser} users={users} />
          )
        }
      />
      
      {/* 3. Ruta de Dashboard (Protegida) */}
      <Route
        path="/dashboard"
        element={
          isLoggedIn ? (
            <Dashboard setIsLoggedIn={setIsLoggedIn} />
          ) : (
            <Navigate to="/" />
          )
        }
      />
    </Routes>
  );
}

export default App;