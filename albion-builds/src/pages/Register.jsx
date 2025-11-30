// src/pages/Register.jsx

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerWithEmail } from "../utils/auth.js"; // Importar función de Registro
import "../styles/Register.css"; 
import LogoImage from '../assets/Logo.png';

// Ya no necesita recibir props
export default function Register() { 
  const [form, setForm] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => { // Función asíncrona
    e.preventDefault();
    const { username, password } = form;

    if (username.length < 3 || password.length < 6) { // Firebase requiere min 6 chars
      alert("El usuario debe tener al menos 3 caracteres y la contraseña 6.");
      return;
    }

    try {
        // Intenta registrar
        await registerWithEmail(username, password);
        alert(`🎉 ¡Usuario ${username} registrado con éxito! Ahora puedes iniciar sesión.`);
        navigate("/");
    } catch (error) {
        // Firebase devuelve errores como 'auth/email-already-in-use'
        if (error.message.includes("email-already-in-use")) {
            alert(`⚠️ ¡El nombre de usuario "${username}" ya está en uso!`);
        } else {
            alert(`Error en el registro: ${error.message}`);
        }
    }
  };

  // ... (el resto del JSX se mantiene igual)
// ... (JSX de Register)
  return (
      <div className="albion-register-container"> 
    
             <div className="register-logo-container">
                 <img 
                     src={LogoImage} 
                     alt="Albion Builder Logo" 
                     style={{ maxWidth: '500px', height: 'auto' }} 
                 />
             </div>
      
      <div className="albion-register-box"> 
        <h2>Crear usuario</h2>
        <form onSubmit={handleSubmit}>
        
          <label className="input-label">NOMBRE DE USUARIO</label>
          <input
            type="text"
            name="username"
            className="albion-input" 
            value={form.username}
            onChange={handleChange}
            required
          />

          <label className="input-label">CONTRASEÑA</label>
          <input
            type="password"
            name="password"
            className="albion-input" 
            value={form.password}
            onChange={handleChange}
            required
          />

          <button type="submit" className="submit-btn">→</button>

        </form>

        <p className="bottom-text">
          ¿Ya tienes cuenta? <Link to="/">Inicia Sesión</Link>
        </p>
      </div>
    </div>
  );
}