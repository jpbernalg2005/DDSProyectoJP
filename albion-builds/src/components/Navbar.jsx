// components/Navbar.jsx

import LogoImage from '/LogoP.png'; 
import { Search, User, Layers3, Flame, LogIn } from 'lucide-react';

export const Navbar = ({ handleLogout, currentRoute, navigate }) => {
    
    const getLinkClass = (path) => (
        `nav-link ${currentRoute === path ? 'nav-link-active' : ''}`
    );

    // Definimos las rutas de navegación que aparecerán como enlaces explícitos
    const explicitNavRoutes = [
        { path: '/buildcreator', label: 'Build Creator', icon: <Layers3 size={16}/> },
        { path: '/communitybuilds', label: 'Community Builds', icon: <Flame size={16}/> },
        { path: '/mybuilds', label: 'My Builds', icon: <User size={16}/> },
        { path: '/itemexplorer', label: 'Item Explorer', icon: <Search size={16}/> },
    ];

    return (
        <nav className="navbar">
            {/* LOGO: Ahora es la única forma de volver al lobby */}
            <div className="navbar-logo" onClick={() => navigate('/lobby')}>
                <img 
                    src={LogoImage} 
                    alt="Warrior Codex Logo" 
                    className="logo-icon logo-image" 
                />
                <span className="logo-text">WARRIOR'S CODEX</span>
            </div>

            {/* Enlaces principales: SOLO MUESTRA las rutas explícitas, excluyendo /lobby */}
            <div className="navbar-links">
                {explicitNavRoutes.map(route => (
                    <a 
                        key={route.path}
                        href={`#${route.path}`} 
                        className={getLinkClass(route.path)}
                    >
                        {route.icon} {route.label}
                    </a>
                ))}
            </div>

            {/* Acciones y Buscador (sin cambios) */}
            <div className="navbar-actions">
                <div className="search-bar">
                    <input type="text" placeholder="Buscar builds..." className="search-input"/>
                    <button className="search-button" aria-label="Buscar">
                        <Search size={18}/>
                    </button>
                </div>
                
                <button 
                    onClick={handleLogout} 
                    className="login-button logout-button"
                    title="Cerrar Sesión"
                >
                    <LogIn size={18}/> Logout
                </button>
            </div>
        </nav>
    );
};