// pages/Dashboard.jsx

import { useState, useEffect } from "react";
import { logoutUser } from '../utils/auth.js'; // 1. Importar la función de Logout de la utilidad de Auth
import "../styles/Dashboard.css"; 

// Importar todos los componentes (incluyendo el nuevo LobbyPage)
import { Navbar } from '../components/Navbar'; 
import { LobbyPage } from '../components/LobbyPage'; 
import { BuildCreator } from '../components/BuildCreator';
import { CommunityBuilds } from '../components/CommunityBuilds';
import { MyBuilds } from '../components/MyBuilds';
import { ItemExplorer } from '../components/ItemExplorer';

// Modificado: Ahora recibe el objeto currentUser en lugar de setIsLoggedIn
export default function Dashboard({ currentUser }) { 
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

    // MODIFICACIÓN CLAVE: Función asíncrona para cerrar sesión con Firebase
    const handleLogout = async () => {
        try {
            await logoutUser(); // Llama a la utilidad de Firebase
            // App.jsx detectará el cambio y redirigirá automáticamente a la ruta "/"
        } catch (error) {
            console.error("Error al cerrar sesión:", error);
            alert("Hubo un error al intentar cerrar sesión.");
        }
    };
    
    // 3. Renderizar el componente basado en la ruta (hash)
    const renderContent = () => {
        // Obtenemos el ID de usuario de Firebase, esencial para guardar/cargar builds
        const userId = currentUser ? currentUser.uid : null;
        
        // Manejamos el caso si por alguna razón no hay ID, aunque App.jsx lo protege.
        if (!userId) {
            return <p className="text-xl text-red-500 p-6">Error: Sesión de usuario no cargada.</p>;
        }
        
        switch (currentRoute) {
            case '/lobby': // RUTA PRINCIPAL
                return <LobbyPage navigate={navigate} />;
            case '/buildcreator':
                // Pasamos el ID del usuario al creador
                return <BuildCreator userId={userId} />; 
            case '/communitybuilds':
                // Nota: CommunityBuilds necesita ser modificado para cargar todas las builds públicas
                return <CommunityBuilds />;
            case '/mybuilds':
                // Pasamos el ID del usuario para cargar SOLO sus builds
                return <MyBuilds userId={userId} />; 
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