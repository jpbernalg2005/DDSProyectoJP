import { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; 
// Importar la nueva función
import { loginWithEmail, signInWithGoogle } from "../utils/auth.js"; 
import "../styles/Login.css";
import LogoImage from '../assets/Logo.png';

export default function Login() { 
  const [form, setForm] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => { // Función asíncrona para el formulario principal
    e.preventDefault();
    try {
        await loginWithEmail(form.username, form.password);
    } catch (error) {
        alert(`Error al iniciar sesión: ${error.message}`);
    }
  };

  // --- HANDLER PARA GOOGLE ---
  const handleGoogleLogin = async () => {
    try {
        await signInWithGoogle();
        // Nota: App.jsx detectará el cambio de sesión y te redirigirá automáticamente.
    } catch (error) {
        alert(error.message);
    }
  };

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

          <div className="social-login-group">
            {/* ASIGNAMOS EL HANDLER A GOOGLE */}
            <button 
                type="button" 
                className="social-btn google"
                onClick={handleGoogleLogin} 
            ></button>

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