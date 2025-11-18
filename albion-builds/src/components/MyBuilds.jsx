import { useEffect, useState } from "react";
import { User } from 'lucide-react'; 
// ✅ CORRECCIÓN: Importamos getMyBuilds y deleteBuild (que sigue llamándose igual)
import { getMyBuilds, deleteBuild } from '../utils/storage.js'; 
// Importación corregida a minúsculas
import { BuildCard } from './buildcard.jsx'; 

// Recibe userId de Dashboard
export const MyBuilds = ({ userId }) => { 
    const [builds, setBuilds] = useState([]);
    const [loading, setLoading] = useState(true);

    // FUNCIÓN ASÍNCRONA para cargar las builds
    const loadBuilds = async () => {
        // No intenta cargar si el ID de usuario aún no está disponible
        if (!userId) {
            setLoading(false);
            return; 
        }
        
        setLoading(true);
        try {
            // ✅ CORRECCIÓN: Usamos getMyBuilds(userId)
            const savedBuilds = await getMyBuilds(userId); 
            setBuilds(savedBuilds);
        } catch (error) {
            console.error("Error al cargar builds de Firebase:", error);
            // Mostrar un error amigable al usuario en un entorno real
            setBuilds([]);
        } finally {
            setLoading(false);
        }
    };

    // Cargar builds cuando el userId esté disponible o cambie
    useEffect(() => {
        loadBuilds();
    }, [userId]); 

    // FUNCIÓN ASÍNCRONA MANEJADORA DE BORRADO
    const handleDeleteBuild = async (buildId) => {
        if (window.confirm("¿Estás seguro de que quieres borrar esta Build? Esta acción es irreversible.")) {
            try {
                // Llama a la función asíncrona de borrado de Firestore
                const success = await deleteBuild(buildId); 
                if (success) {
                    // ÉXITO: Recargar la lista para forzar la actualización de la UI
                    loadBuilds(); 
                } else {
                    alert("Error al borrar la build.");
                }
            } catch (error) {
                console.error("Fallo al intentar borrar la Build de Firebase:", error);
                alert("Error al borrar la build. Inténtalo de nuevo.");
            }
        }
    };

    if (loading) {
        // Usando Tailwind CSS para estilos rápidos
        return <div className="p-6 bg-gray-900 min-h-screen text-white"><p className="text-xl text-gray-400">Cargando tus Builds...</p></div>;
    }

    return (
        <div className="my-builds-dashboard p-6 bg-gray-900 min-h-screen text-white">
            <p className="text-sm text-gray-500 mb-2">User ID: {userId || "N/A"}</p> 

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