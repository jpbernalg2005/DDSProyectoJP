import { useEffect, useState } from "react";
import { User } from 'lucide-react'; 
// Importamos las funciones getBuilds y deleteBuild, AÑADIMOS la extensión .js
import { getBuilds, deleteBuild } from '../utils/storage.js'; 
// Importamos BuildCard, AÑADIMOS la extensión .jsx
import { BuildCard } from './BuildCard.jsx'; 

export const MyBuilds = () => {
    const [builds, setBuilds] = useState([]);
    const [loading, setLoading] = useState(true);

    const loadBuilds = () => {
        setLoading(true);
        const savedBuilds = getBuilds();
        setBuilds(savedBuilds);
        setLoading(false);
    };

    // Cargar builds solo una vez al inicio
    useEffect(() => {
        loadBuilds();
    }, []);

    // FUNCIÓN MANEJADORA DE BORRADO
    const handleDeleteBuild = (buildId) => {
        // Usar un modal personalizado o el window.confirm por ahora
        if (window.confirm("¿Estás seguro de que quieres borrar esta Build? Esta acción es irreversible.")) {
            const success = deleteBuild(buildId);
            if (success) {
                // ÉXITO: Recargar la lista para forzar la actualización de la UI
                loadBuilds(); 
            } else {
                // En un entorno de producción, esto sería un mensaje de error en la UI.
                console.error("Fallo al intentar borrar la Build.");
            }
        }
    };

    if (loading) {
        // Usando Tailwind CSS para estilos rápidos
        return <div className="p-6 bg-gray-900 min-h-screen text-white"><p className="text-xl text-gray-400">Cargando tus Builds...</p></div>;
    }

    return (
        <div className="my-builds-dashboard p-6 bg-gray-900 min-h-screen text-white">
            <h1 className="text-3xl font-bold text-yellow-400 mb-6">Mis Builds Guardadas ({builds.length})</h1>
            
            {builds.length === 0 ? (
                <div className="text-center p-10 bg-gray-800 rounded-lg">
                    <p className="text-lg text-gray-400">Aún no has guardado ninguna Build.</p>
                </div>
            ) : (
                <div className="builds-list grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {builds.map((build) => (
                        <BuildCard 
                            key={build.id} 
                            build={build} 
                            // Pasamos la función de borrado
                            onDelete={handleDeleteBuild} 
                        />
                    ))}
                </div>
            )}
        </div>
    );
};