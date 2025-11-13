// pages/Dashboard.jsx
export default function Dashboard({ setIsLoggedIn }) {

  const handleLogout = () => {
    // Si hubieras guardado el nombre de usuario, lo podrías remover aquí
    // localStorage.removeItem("currentUsername"); 
    setIsLoggedIn(false);
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-box">
        <h1>Dashboard</h1>
        <p>Bienvenido a tu aplicación React 🚀</p>
        <button onClick={handleLogout}>Cerrar sesión</button>
      </div>
    </div>
  );
}