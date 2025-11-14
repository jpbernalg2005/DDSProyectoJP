// pages/Login.jsx
import { useState } from "react";
import { Link } from "react-router-dom";
import "../Login.css";
import LogoImage from '../assets/Logo.png';

export default function Login({ setIsLoggedIn, users }) {
  const [form, setForm] = useState({ username: "", password: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const userFound = users.find(
      (u) => u.username === form.username && u.password === form.password
    );

    if (userFound) {
      setIsLoggedIn(true);
    } else {
      alert("Usuario o contraseña incorrectos");
    }
  };

  return (
<div className="albion-login-container azul">

            <div className="logo-container">
                <img 
                    src={LogoImage} 
                    alt="Albion Builder Logo" 
                />
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

          {/* Fila del Checkbox con el nuevo estilo */}
          <div className="checkbox-row">
            <input type="checkbox" id="keep" />
            {/* El label necesita el htmlFor coincidiendo con el id del input */}
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