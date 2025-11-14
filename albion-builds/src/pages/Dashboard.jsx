// pages/Dashboard.jsx

import { useState, useEffect } from "react";
import "../styles/Dashboard.css"; 

// Importar todos los componentes (incluyendo el nuevo LobbyPage)
import { Navbar } from '../components/Navbar'; 
import { LobbyPage } from '../components/LobbyPage'; // NUEVO
import { BuildCreator } from '../components/BuildCreator';
import { CommunityBuilds } from '../components/CommunityBuilds';
import { MyBuilds } from '../components/MyBuilds';
import { ItemExplorer } from '../components/ItemExplorer';

export default function Dashboard({ setIsLoggedIn }) {
    // 1. Estado para almacenar la ruta actual
    const [currentRoute, setCurrentRoute] = useState(() => {
        // Inicializar con el hash actual, o '/lobby' si no hay hash
        const hash = window.location.hash.slice(1).toLowerCase() || '/lobby';
        return hash;
    });
    
    // Función para simular navegación (cambia el hash de la URL)
    const navigate = (path) => {
        window.location.hash = path;
    };

    // 2. useEffect para escuchar cambios de hash y establecer la ruta por defecto
    useEffect(() => {
        const handleHashChange = () => {
            const newHash = window.location.hash.slice(1).toLowerCase();
            // La ruta por defecto ahora es /lobby
            setCurrentRoute(newHash || '/lobby');
        };

        if (!window.location.hash || window.location.hash === '#/') {
            navigate('/lobby');
        }

        window.addEventListener('hashchange', handleHashChange);
        
        return () => {
            window.removeEventListener('hashchange', handleHashChange);
        };
    }, []); 

    const handleLogout = () => {
        setIsLoggedIn(false);
    };
    
    // 3. Renderizar el componente basado en la ruta (hash)
    const renderContent = () => {
        switch (currentRoute) {
            case '/lobby': // NUEVA RUTA PRINCIPAL
                return <LobbyPage navigate={navigate} />;
            case '/buildcreator':
                return <BuildCreator />;
            case '/communitybuilds':
                return <CommunityBuilds />;
            case '/mybuilds':
                return <MyBuilds />;
            case '/itemexplorer':
                return <ItemExplorer />;
            default:
                // Si la ruta no coincide, redirigir al lobby
                return <LobbyPage navigate={navigate} />;
        }
    }

    return (
        <div className="full-app-container">
            <Navbar 
                handleLogout={handleLogout} 
                currentRoute={currentRoute}
                navigate={navigate}
            /> 

            <div className="dashboard-container ttcn">
                <div className="dashboard-box tdtn">
                    {renderContent()}
                </div>
            </div>
        </div>
    );
}