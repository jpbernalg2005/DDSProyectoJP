// src/pages/Register.jsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../Register.css"; 


export default function Register({ registerUser, users }) {
  const [form, setForm] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { username, password } = form;

    if (username.length < 3 || password.length < 4) {
      alert("El usuario debe tener al menos 3 caracteres y la contraseña 4.");
      return;
    }

    const userExists = users.some((user) => user.username === username);

    if (userExists) {
      alert(`⚠️ ¡El nombre de usuario "${username}" ya está en uso!`);
      return;
    }

    registerUser(form);
    alert(`🎉 ¡Usuario ${username} registrado con éxito! Ahora puedes iniciar sesión.`);
    navigate("/");
  };

  return (
    <div className="albion-register-container"> 
      
      {/* Contenedor del logo grande y centrado: Ahora insertamos la imagen */}
      <div className="register-logo-container">
        <img 
            src="https://cdn-icons-png.flaticon.com/512/179/179399.png" 
            alt="Albion Builder Logo" 
            style={{ maxWidth: '500px', height: 'auto' }} 
        />
      </div>
      
      {/* Caja del formulario de registro, anclada a la derecha por CSS */}
      <div className="albion-register-box"> 
        <h2>Crear usuario</h2>
        <form onSubmit={handleSubmit}>
        
          {/* Campo de Nombre de Usuario */}
          <label className="input-label">NOMBRE DE USUARIO</label>
          <input
            type="text"
            name="username"
            className="albion-input" 
            value={form.username}
            onChange={handleChange}
            required
          />

          {/* Campo de Contraseña */}
          <label className="input-label">CONTRASEÑA</label>
          <input
            type="password"
            name="password"
            className="albion-input" 
            value={form.password}
            onChange={handleChange}
            required
          />

          {/* Botones Sociales - Fila Superior */}
          <div className="social-login-group">
            <button type="button" className="social-btn facebook"></button>
            <button type="button" className="social-btn google"></button>
            <button type="button" className="social-btn apple"></button>
          </div>
          
          {/* Botones Sociales - Fila Inferior */}
          <div className="social-login-group bottom-row">
            <button type="button" className="social-btn xbox"></button>
            <button type="button" className="social-btn ps"></button>
          </div>
          
          {/* Botón de Submit (flecha) */}
          <button type="submit" className="submit-btn">→</button>

        </form>

        {/* Enlace al Login */}
        <p className="bottom-text">
          ¿Ya tienes cuenta? <Link to="/">Inicia Sesión</Link>
        </p>
      </div>
    </div>
  );
}