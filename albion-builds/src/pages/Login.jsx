// pages/Login.jsx

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Importar useNavigate
import { loginWithEmail } from "../utils/auth.js"; // Importar función de Login
import "../styles/Login.css";
import LogoImage from '../assets/Logo.png';

// Ya no necesita recibir props
export default function Login() { 
  const [form, setForm] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => { // Función asíncrona
    e.preventDefault();
    try {
        // Intenta iniciar sesión
        await loginWithEmail(form.username, form.password);
        // Firebase se encarga de la redirección a /dashboard a través de App.jsx
        // navigate('/dashboard'); (Opcional si quieres forzar la redirección)
    } catch (error) {
        alert(`Error al iniciar sesión: ${error.message}`);
    }
  };

  // ... (el resto del JSX se mantiene igual)
// ... (JSX de Login)
  return (
<div className="albion-login-container azul">
            <div className="logo-container">
                <img src={LogoImage} alt="Albion Builder Logo" />
            </div>
        
      <div className="albion-login-box">
        <h2>Iniciar sesión</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="username"
            placeholder="NOMBRE DE USUARIO"
            value={form.username}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="CONTRASEÑA"
            value={form.password}
            onChange={handleChange}
            required
          />

          {/* ... Botones Sociales y Checkbox ... */}
          <div className="social-login-group">
            <button type="button" className="social-btn facebook"></button>
            <button type="button" className="social-btn google"></button>
            <button type="button" className="social-btn apple"></button>
          </div>
          <div className="social-login-group bottom-row">
            <button type="button" className="social-btn xbox"></button>
            <button type="button" className="social-btn ps"></button>
          </div>

          <div className="checkbox-row">
            <input type="checkbox" id="keep" />
            <label htmlFor="keep">Mantener sesión iniciada</label>
          </div>

          <button type="submit" className="submit-btn">
            <span className="arrow">→</span>
          </button>
        </form>

        <p className="bottom-text">
          ¿No puedes iniciar sesión? <br />
          <Link to="/register">CREAR CUENTA</Link>
        </p>
      </div>
    </div>
  );
}